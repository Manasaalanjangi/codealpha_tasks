
const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Create a post
router.post('/', auth, async (req, res) => {
  try {
    const newPost = new Post({
      userId: req.user.id,
      content: req.body.content,
      image: req.body.image
    });
    
    const post = await newPost.save();
    
    // Populate user data
    const populatedPost = await Post.findById(post._id).populate('userId', 'name username avatar verified');
    
    res.json(populatedPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all posts for feed (timeline)
router.get('/timeline', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    
    // Get user's posts and following users' posts
    const userPosts = await Post.find({ userId: currentUser._id });
    
    const friendPosts = await Promise.all(
      currentUser.following.map(friendId => {
        return Post.find({ userId: friendId });
      })
    );
    
    // Combine and sort posts by date
    const allPosts = userPosts.concat(...friendPosts);
    allPosts.sort((a, b) => b.createdAt - a.createdAt);
    
    // Populate user data
    const populatedPosts = await Post.populate(allPosts, {
      path: 'userId',
      select: 'name username avatar verified'
    });
    
    res.json(populatedPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name username avatar verified');
      
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get post by id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('userId', 'name username avatar verified');
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    
    // Check user owns this post
    if (post.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    await post.deleteOne();
    
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
