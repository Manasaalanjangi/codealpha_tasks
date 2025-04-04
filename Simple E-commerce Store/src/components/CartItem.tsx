
import React from 'react';
import { useCart, Product } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, X } from 'lucide-react';

type CartItemProps = {
  item: {
    product: Product;
    quantity: number;
  };
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleIncreaseQuantity = () => {
    increaseQuantity(product.id);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      decreaseQuantity(product.id);
    } else {
      removeFromCart(product.id);
    }
  };

  return (
    <div className="flex items-center py-4 border-b">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <h3 className="font-medium text-gray-900">{product.name}</h3>
          <p className="text-gray-900 font-medium">${(product.price * quantity).toFixed(2)}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500">${product.price.toFixed(2)} each</p>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border rounded">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDecreaseQuantity}
              className="px-2 py-1 h-8"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="px-3">{quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleIncreaseQuantity}
              className="px-2 py-1 h-8"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeFromCart(product.id)}
            className="text-red-500 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
