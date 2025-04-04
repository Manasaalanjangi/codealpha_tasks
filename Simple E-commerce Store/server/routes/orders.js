
const express = require('express');
const router = express.Router();
const orders = [];
let orderIdCounter = 1;

// Get all orders
router.get('/', (req, res) => {
  res.json(orders);
});

// Create a new order
router.post('/', (req, res) => {
  const { items, totalAmount, customerInfo } = req.body;
  
  if (!items || !items.length || !totalAmount || !customerInfo) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  const newOrder = {
    id: orderIdCounter++,
    items,
    totalAmount,
    customerInfo,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Get order by id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const order = orders.find(o => o.id === id);
  
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  res.json(order);
});

module.exports = router;
