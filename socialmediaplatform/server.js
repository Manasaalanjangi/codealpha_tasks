
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const likeRoutes = require('./routes/likes');
const saveRoutes = require('./routes/saved');
const friendRoutes = require('./routes/friends');
const messageRoutes = require('./routes/messages');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/socialweave')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/saved', saveRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/messages', messageRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('SocialWeave API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
