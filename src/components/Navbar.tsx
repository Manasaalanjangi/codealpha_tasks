
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const cartItemsCount = cart.items.reduce((total, item) => total + item.quantity, 0);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };
  
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              ShopIt
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-primary transition-colors dark:text-white">Home</Link>
            <Link to="/products" className="font-medium hover:text-primary transition-colors dark:text-white">Shop</Link>
            <Link to="/about" className="font-medium hover:text-primary transition-colors dark:text-white">About</Link>
            
            {/* Search Button */}
            <Button variant="ghost" onClick={toggleSearch} className="p-1">
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Cart Button with Badge */}
            <Link to="/cart">
              <Button variant="ghost" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge 
                    className={`absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-primary text-white text-xs rounded-full p-0 ${cartItemsCount > 0 ? 'animate-cart-bounce' : ''}`}
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
          
          {/* Mobile buttons */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" onClick={toggleSearch} className="p-1 mr-2">
              <Search className="h-5 w-5" />
            </Button>
            
            <ThemeToggle />
            
            <Link to="/cart" className="mr-4 relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge 
                  className={`absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-primary text-white text-xs rounded-full p-0 ${cartItemsCount > 0 ? 'animate-cart-bounce' : ''}`}
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Link>
            <Button variant="ghost" onClick={toggleMenu} className="p-1">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <form onSubmit={handleSearch} className="flex">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow"
                  autoFocus
                />
                <Button type="submit" className="ml-2">
                  Search
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                <Link to="/" className="font-medium hover:text-primary transition-colors" onClick={toggleMenu}>Home</Link>
                <Link to="/products" className="font-medium hover:text-primary transition-colors" onClick={toggleMenu}>Shop</Link>
                <Link to="/about" className="font-medium hover:text-primary transition-colors" onClick={toggleMenu}>About</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
