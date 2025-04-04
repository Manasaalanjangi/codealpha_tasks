
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allows requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
}

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);

// Simple test route
app.get('/', (req, res) => {
  res.send('E-commerce API is running');
});

// Handle React routing in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
