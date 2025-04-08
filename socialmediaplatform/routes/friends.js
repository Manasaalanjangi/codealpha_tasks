
const router = require('express').Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Follow a user
router.put('/follow/:id', auth, async (req, res) => {
  try {
    // Check if user tries to follow themselves
    if (req.params.id === req.user.id) {
      return res.status(400).json({ msg: 'You cannot follow yourself' });
    }
    
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);
    
    if (!userToFollow) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Check if user is already following
    if (currentUser.following.includes(req.params.id)) {
      return res.status(400).json({ msg: 'You are already following this user' });
    }
    
    // Add to current user's following
    currentUser.following.push(req.params.id);
    await currentUser.save();
    
    // Add to target user's followers
    userToFollow.followers.push(req.user.id);
    await userToFollow.save();
    
    res.json({ msg: 'User followed successfully' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server error');
  }
});

// Unfollow a user
router.put('/unfollow/:id', auth, async (req, res) => {
  try {
    // Check if user tries to unfollow themselves
    if (req.params.id === req.user.id) {
      return res.status(400).json({ msg: 'You cannot unfollow yourself' });
    }
    
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);
    
    if (!userToUnfollow) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Check if user is actually following
    if (!currentUser.following.includes(req.params.id)) {
      return res.status(400).json({ msg: 'You are not following this user' });
    }
    
    // Remove from current user's following
    currentUser.following = currentUser.following.filter(id => id.toString() !== req.params.id);
    await currentUser.save();
    
    // Remove from target user's followers
    userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== req.user.id);
    await userToUnfollow.save();
    
    res.json({ msg: 'User unfollowed successfully' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server error');
  }
});

// Get friends (following)
router.get('/following', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Get all users that the current user is following
    const following = await User.find({ _id: { $in: user.following } })
      .select('name username avatar bio verified');
      
    res.json(following);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get followers
router.get('/followers', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Get all users that follow the current user
    const followers = await User.find({ _id: { $in: user.followers } })
      .select('name username avatar bio verified');
      
    res.json(followers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get friend suggestions
router.get('/suggestions', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Find users that the current user is not already following
    // and not the current user themselves
    const suggestions = await User.find({
      _id: { $ne: req.user.id, $nin: user.following },
    })
    .select('name username avatar bio verified')
    .limit(5);
    
    res.json(suggestions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
