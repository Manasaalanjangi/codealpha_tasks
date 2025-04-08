
const router = require('express').Router();
const Message = require('../models/Message');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Send a message
router.post('/', auth, async (req, res) => {
  try {
    const { recipientId, content } = req.body;

    // Check if recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ msg: 'Recipient not found' });
    }

    // Create new message
    const newMessage = new Message({
      sender: req.user.id,
      recipient: recipientId,
      content
    });

    const message = await newMessage.save();
    
    // Populate sender information
    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'name username avatar')
      .populate('recipient', 'name username avatar');

    res.json(populatedMessage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get conversation with a specific user
router.get('/conversation/:userId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: req.params.userId },
        { sender: req.params.userId, recipient: req.user.id }
      ]
    })
    .sort({ createdAt: 1 })
    .populate('sender', 'name username avatar')
    .populate('recipient', 'name username avatar');

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all conversations for current user
router.get('/conversations', auth, async (req, res) => {
  try {
    // Get all messages where the user is either sender or recipient
    const messages = await Message.find({
      $or: [
        { sender: req.user.id },
        { recipient: req.user.id }
      ]
    }).sort({ createdAt: -1 });

    // Extract unique conversation partners
    const conversationPartners = new Set();
    const conversations = [];

    for (const message of messages) {
      const partnerId = message.sender.toString() === req.user.id ? 
        message.recipient.toString() : message.sender.toString();
      
      if (!conversationPartners.has(partnerId)) {
        conversationPartners.add(partnerId);
        
        // Get the other user's data
        const partner = await User.findById(partnerId).select('name username avatar');
        
        // Get the last message
        const lastMessage = await Message.findOne({
          $or: [
            { sender: req.user.id, recipient: partnerId },
            { sender: partnerId, recipient: req.user.id }
          ]
        }).sort({ createdAt: -1 });
        
        // Count unread messages
        const unreadCount = await Message.countDocuments({
          sender: partnerId,
          recipient: req.user.id,
          read: false
        });
        
        conversations.push({
          partner,
          lastMessage,
          unreadCount
        });
      }
    }

    res.json(conversations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Mark messages as read
router.put('/read/:userId', auth, async (req, res) => {
  try {
    await Message.updateMany(
      { sender: req.params.userId, recipient: req.user.id, read: false },
      { $set: { read: true } }
    );
    
    res.json({ msg: 'Messages marked as read' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
