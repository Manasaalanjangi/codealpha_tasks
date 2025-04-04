
import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      
      {/* Categories Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80', path: '/products?category=electronics' },
              { name: 'Home Decor', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80', path: '/products?category=home' },
              { name: 'Clothing', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80', path: '/products?category=clothing' },
              { name: 'Kitchen Groceries', image: 'https://images.unsplash.com/photo-1556911220-bda9f33a8b25?auto=format&fit=crop&w=800&q=80', path: '/products?category=groceries' },
            ].map((category, index) => (
              <Link 
                key={index} 
                to={category.path} 
                className="group relative rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 hover:shadow-lg"
              >
                <div className="aspect-square">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Browse our collection of high-quality products and find exactly what you're looking for.
        </p>
        <Button asChild size="lg">
          <Link to="/products">Shop All Products</Link>
        </Button>
      </section>
    </div>
  );
};

export default Index;
