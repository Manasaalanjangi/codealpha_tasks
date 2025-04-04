
const express = require('express');
const router = express.Router();
const products = require('../data/products');

// Function to check if images are valid (working URLs)
const validImageProducts = products.map(product => {
  // Replace commonly problematic image URLs with reliable fallbacks
  if (product.image.includes('unsplash.com')) {
    // Ensure we're using auto format and fit=crop for consistent image delivery
    try {
      const imageUrl = new URL(product.image);
      if (!imageUrl.search.includes('auto=format')) {
        if (imageUrl.search) {
          imageUrl.search += '&auto=format&fit=crop&w=800&q=80';
        } else {
          imageUrl.search = '?auto=format&fit=crop&w=800&q=80';
        }
        product.image = imageUrl.toString();
      }
    } catch (error) {
      // If the URL is invalid, replace with a reliable fallback
      product.image = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&w=800&q=80";
    }
  }
  return product;
});

// Get all products with valid images
router.get('/', (req, res) => {
  // Filter by category if provided in query params
  const category = req.query.category;
  
  if (category && category !== 'all') {
    const filteredProducts = validImageProducts.filter(product => product.category === category);
    return res.json(filteredProducts);
  }
  
  res.json(validImageProducts);
});

// Get product by id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = validImageProducts.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  res.json(product);
});

module.exports = router;
