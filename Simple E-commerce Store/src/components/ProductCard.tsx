
import React from 'react';
import { Link } from 'react-router-dom';
import { Product, useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import LazyImage from './LazyImage';
import { toast } from 'sonner';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to wishlist`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-all duration-300">
        <Link to={`/product/${product.id}`} className="h-full flex flex-col">
          <div className="aspect-square overflow-hidden relative group">
            <LazyImage 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                className="bg-white p-2 rounded-full shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWishlist}
              >
                <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
              </motion.button>
            </div>
          </div>
          <CardContent className="flex-grow p-4">
            <div className="mb-2">
              <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                {product.category}
              </span>
              {product.subCategory && (
                <span className="ml-1 px-2 py-1 bg-gray-100 text-xs rounded-full">
                  {product.subCategory}
                </span>
              )}
            </div>
            <CardTitle className="text-lg font-semibold line-clamp-1">{product.name}</CardTitle>
            <p className="text-primary font-bold mt-2">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <motion.div 
              className="w-full"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button 
                onClick={handleAddToCart} 
                className="w-full group"
              >
                <ShoppingCart className="h-4 w-4 mr-2 group-hover:animate-bounce" /> 
                Add to Cart
              </Button>
            </motion.div>
          </CardFooter>
        </Link>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
