
# Backend Integration with Express.js

This document provides guidance on how to connect the SocialWeave frontend application to an Express.js backend.

## Setting Up Express.js Backend

1. Create a new directory for your backend:

```bash
mkdir socialweave-backend
cd socialweave-backend
npm init -y
npm install express cors mongoose jsonwebtoken bcrypt dotenv
```

2. Create basic server structure:

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/likes', require('./routes/likes'));
app.use('/api/saved', require('./routes/saved'));
app.use('/api/friends', require('./routes/friends'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

## API Routes for Frontend Features

### User Authentication

```javascript
// routes/users.js
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    
    // Save user and return response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json('user not found');
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    !validPassword && res.status(400).json('wrong password');
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
```

### Posts API

```javascript
// routes/posts.js
const router = require('express').Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Create a post
router.post('/', auth, async (req, res) => {
  try {
    const newPost = new Post({
      userId: req.user.id,
      content: req.body.content,
      image: req.body.image
    });
    
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get timeline posts
router.get('/timeline', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
```

## Integrating with React Frontend

1. Install Axios in the frontend project:

```bash
npm install axios
```

2. Create an API service in the frontend:

```javascript
// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
```

3. Create API service functions:

```javascript
// src/services/authService.js
import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/users/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const register = async (username, email, password) => {
  return api.post('/users/register', { username, email, password });
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
```

## Next Steps for Full Backend Integration

1. Create all required MongoDB models
2. Implement remaining API routes
3. Add authentication middleware
4. Set up file uploads for images
5. Implement real-time features with Socket.io
6. Deploy both frontend and backend

Note: For a production application, consider using environment variables for API endpoints and implementing proper error handling and loading states in the frontend.
