
const router = require('express').Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Like a post
router.put('/post/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    
    // Check if the post has already been liked by this user
    if (post.likes.some(like => like.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    
    post.likes.unshift(req.user.id);
    
    await post.save();
    
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

// Unlike a post
router.put('/post/:id/unlike', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    
    // Check if the post has been liked by this user
    if (!post.likes.some(like => like.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }
    
    // Remove the like
    post.likes = post.likes.filter(like => like.toString() !== req.user.id);
    
    await post.save();
    
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

// Get all posts liked by the user
router.get('/user', auth, async (req, res) => {
  try {
    // Find posts where the user's ID is in the likes array
    const likedPosts = await Post.find({ likes: req.user.id })
      .sort({ createdAt: -1 })
      .populate('userId', 'name username avatar verified');
      
    res.json(likedPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
