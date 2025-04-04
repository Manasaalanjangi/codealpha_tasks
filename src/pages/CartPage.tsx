
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { toast } from "sonner";
import { createOrder } from '../services/api';

const CartPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      
      // In a real application, you would collect customer information here
      const orderData = {
        items: cart.items,
        totalAmount: cart.total * 1.07, // Including tax
        customerInfo: {
          name: "Customer Name",
          email: "customer@example.com",
          address: "123 Main St, Anytown, USA"
        }
      };
      
      const response = await createOrder(orderData);
      
      toast.success("Order placed successfully!");
      clearCart();
      setIsProcessing(false);
      navigate('/');
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error("Failed to process your order. Please try again.");
      setIsProcessing(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild>
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Cart Items ({cart.items.reduce((total, item) => total + item.quantity, 0)})</h2>
              <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-500 hover:text-red-700">
                <Trash2 className="h-4 w-4 mr-2" /> Clear Cart
              </Button>
            </div>
            <div className="divide-y">
              {cart.items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${(cart.total * 0.07).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>${(cart.total * 1.07).toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              onClick={handleCheckout} 
              className="w-full"
              size="lg"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>Checkout <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
            
            <div className="mt-4">
              <Button 
                asChild 
                variant="outline" 
                className="w-full"
              >
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
