
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">About ShopIt</h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="prose prose-lg mx-auto">
          <p className="lead text-xl text-gray-600 mb-6">
            ShopIt is your one-stop destination for all your shopping needs. We provide high-quality products at competitive prices with excellent customer service.
          </p>
          
          <div className="bg-primary/5 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4 text-primary">Our Mission</h2>
            <p>
              To provide a seamless shopping experience with carefully curated products that enhance our customers' lives. We believe in quality, affordability, and exceptional service.
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">
                We carefully select each product to ensure it meets our high standards of quality and durability.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">
                We process orders quickly and partner with reliable shipping carriers to get your products to you as fast as possible.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Secure Shopping</h3>
              <p className="text-gray-600">
                Your security is our priority. We use industry-standard encryption to keep your personal information safe.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Customer Support</h3>
              <p className="text-gray-600">
                Our friendly customer support team is always ready to assist you with any questions or concerns.
              </p>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">Ready to Start Shopping?</h2>
            <Button asChild size="lg">
              <Link to="/products">Browse Our Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
