
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft, Heart, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Product } from '../contexts/CartContext';
import { toast } from "sonner";
import { motion } from 'framer-motion';
import LazyImage from '../components/LazyImage';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (!id) return;
        
        const productId = parseInt(id);
        setLoading(true);
        const data = await fetchProductById(productId);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Product could not be loaded. Please try again later.');
        setLoading(false);
        toast.error('Failed to load product details.');
      }
    };
    
    loadProduct();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);
  
  // Check if product in cart
  const cartItem = product ? cart.items.find(item => item.product.id === product.id) : null;
  
  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      toast.success(`${quantity} ${product.name} added to cart`);
    }
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };
  
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      toast.success('Added to wishlist');
    } else {
      toast.success('Removed from wishlist');
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading product details...</p>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-8">{error || "Sorry, we couldn't find the product you're looking for."}</p>
        <Button onClick={() => navigate('/products')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-square relative">
            <LazyImage 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <Button 
              variant="outline" 
              size="icon" 
              className={`absolute top-4 right-4 rounded-full ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white/80'}`}
              onClick={toggleWishlist}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex gap-2 mb-3">
            <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20 uppercase">
              {product.category}
            </Badge>
            {product.subCategory && (
              <Badge className="mb-2 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 uppercase">
                {product.subCategory}
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">(24 reviews)</span>
          </div>
          
          <p className="text-2xl font-bold text-primary mb-4">
            ${product.price.toFixed(2)}
          </p>
          
          <div className="prose max-w-none mb-6 text-gray-700 dark:text-gray-300">
            <p>{product.description}</p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium mb-2">
              Quantity
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="border rounded-md p-2 w-24 dark:bg-gray-800 dark:border-gray-700"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          
          {cartItem && (
            <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">
              You have {cartItem.quantity} in your cart
            </p>
          )}
          
          <div className="flex flex-wrap gap-4">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 sm:flex-none"
            >
              <Button 
                onClick={handleAddToCart} 
                className="w-full"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> 
                Add to Cart
              </Button>
            </motion.div>
            
            {cartItem && (
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 sm:flex-none"
              >
                <Button
                  onClick={() => navigate('/cart')}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  View Cart
                </Button>
              </motion.div>
            )}
          </div>
          
          <div className="mt-8 border-t pt-6 dark:border-gray-700">
            <h3 className="font-semibold mb-2">Product Details</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><span className="font-medium">Category:</span> {product.category}</li>
              {product.subCategory && (
                <li><span className="font-medium">Sub-Category:</span> {product.subCategory}</li>
              )}
              <li><span className="font-medium">ID:</span> {product.id}</li>
              <li><span className="font-medium">Free shipping:</span> On orders over $50</li>
            </ul>
          </div>
        </motion.div>
      </div>
      
      {/* Related Products Section would go here */}
    </motion.div>
  );
};

export default ProductDetail;
