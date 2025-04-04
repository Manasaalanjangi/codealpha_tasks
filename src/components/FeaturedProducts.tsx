
import React from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from './ProductGrid';
import { fetchProducts } from '../services/api';
import { Button } from '@/components/ui/button';
import { Product } from '../contexts/CartContext';
import { toast } from "sonner";
import { useQuery } from '@tanstack/react-query';
import { products as fallbackProducts } from '../data/products';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FeaturedProducts = () => {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      try {
        const allProducts = await fetchProducts();
        // Get first 8 products as featured (increased from 4)
        return allProducts.slice(0, 8);
      } catch (error) {
        console.error('Failed to load featured products:', error);
        toast.error('Failed to load featured products');
        // Return fallback data if API fails
        return fallbackProducts.slice(0, 8);
      }
    }
  });

  // Show fallback data if there's an error
  const featuredProducts = error ? fallbackProducts.slice(0, 8) : products;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="flex justify-between items-center mb-8">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Products
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button asChild variant="outline">
            <Link to="/products" className="group">
              View All 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">
          <div className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading featured products...</p>
        </div>
      ) : (
        <ProductGrid products={featuredProducts} />
      )}
    </motion.div>
  );
};

export default FeaturedProducts;
