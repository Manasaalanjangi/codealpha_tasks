
const router = require('express').Router();
const SavedPost = require('../models/SavedPost');
const Post = require('../models/Post');
const Collection = require('../models/Collection');
const auth = require('../middleware/auth');

// Save a post
router.post('/post/:id', auth, async (req, res) => {
  try {
    // Check if post exists
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    
    // Check if already saved
    const existingSave = await SavedPost.findOne({
      userId: req.user.id,
      postId: req.params.id
    });
    
    if (existingSave) {
      return res.status(400).json({ msg: 'Post already saved' });
    }
    
    // Create new saved post
    const newSavedPost = new SavedPost({
      userId: req.user.id,
      postId: req.params.id
    });
    
    const savedPost = await newSavedPost.save();
    res.json(savedPost);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

// Unsave a post
router.delete('/post/:id', auth, async (req, res) => {
  try {
    // Find and delete saved post entry
    const savedPost = await SavedPost.findOneAndDelete({
      userId: req.user.id,
      postId: req.params.id
    });
    
    if (!savedPost) {
      return res.status(404).json({ msg: 'Saved post not found' });
    }
    
    res.json({ msg: 'Post unsaved' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all saved posts for a user
router.get('/', auth, async (req, res) => {
  try {
    // Find all saved posts by user ID
    const savedPostItems = await SavedPost.find({ userId: req.user.id }).sort({ savedAt: -1 });
    
    // Extract post IDs
    const postIds = savedPostItems.map(item => item.postId);
    
    // Get full post data
    const savedPosts = await Post.find({ _id: { $in: postIds } })
      .populate('userId', 'name username avatar verified');
      
    res.json(savedPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a collection
router.post('/collection', auth, async (req, res) => {
  try {
    const { name, description, preview } = req.body;
    
    const newCollection = new Collection({
      userId: req.user.id,
      name,
      description,
      preview
    });
    
    const collection = await newCollection.save();
    res.json(collection);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all collections for a user
router.get('/collections', auth, async (req, res) => {
  try {
    const collections = await Collection.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(collections);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add post to collection
router.put('/collection/:collectionId/post/:postId', auth, async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    
    if (!collection) {
      return res.status(404).json({ msg: 'Collection not found' });
    }
    
    // Check if user owns this collection
    if (collection.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    // Check if post exists
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    
    // Check if post already in collection
    if (collection.posts.includes(req.params.postId)) {
      return res.status(400).json({ msg: 'Post already in collection' });
    }
    
    collection.posts.push(req.params.postId);
    await collection.save();
    
    res.json(collection);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Resource not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
