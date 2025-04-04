
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import CategoryFilter from '../components/CategoryFilter';
import PriceRangeFilter from '../components/PriceRangeFilter';
import { fetchProducts } from '../services/api';
import { Input } from '@/components/ui/input';
import { Search, AlertCircle, Filter, X } from 'lucide-react';
import { Product } from '../contexts/CartContext';
import { toast } from "sonner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge'; // Make sure this import is added
import { useQuery } from '@tanstack/react-query';
import { products as fallbackProducts } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category') || 'all';
  const searchParam = queryParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Use React Query for data fetching with better error handling
  const { 
    data: products = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['products', activeCategory],
    queryFn: async () => {
      try {
        const result = await fetchProducts(activeCategory);
        return result;
      } catch (error) {
        console.error('Failed to fetch products:', error);
        toast.error('Failed to load products. Please try again later.');
        // We let the error propagate so React Query can handle it
        throw error;
      }
    }
  });
  
  // Use fallback products when there's an error
  const productsToDisplay = error ? fallbackProducts : products;
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory !== 'all') {
      params.set('category', activeCategory);
    }
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    
    const newUrl = 
      params.toString() 
        ? `${location.pathname}?${params.toString()}` 
        : location.pathname;
    
    navigate(newUrl, { replace: true });
  }, [activeCategory, searchQuery, navigate, location.pathname]);
  
  // Filter products based on search query and price range
  useEffect(() => {
    let filtered = productsToDisplay;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(filtered);
  }, [productsToDisplay, searchQuery, priceRange]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setIsFilterOpen(false);
  };
  
  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already applied via the useEffect
  };
  
  const clearFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setPriceRange([0, 1000]);
    navigate('/products');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      
      {/* Desktop Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <form 
          onSubmit={handleSearchSubmit} 
          className="flex-grow relative"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 w-full"
          />
          {searchQuery && (
            <button 
              type="button" 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </form>
        
        {/* Mobile Filter Button */}
        <div className="md:hidden">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Refine your product search with these filters.
                </SheetDescription>
              </SheetHeader>
              <div className="py-6">
                <CategoryFilter 
                  activeCategory={activeCategory} 
                  onCategoryChange={handleCategoryChange} 
                />
                <PriceRangeFilter 
                  priceRange={priceRange}
                  onPriceRangeChange={handlePriceRangeChange}
                />
                <Button variant="outline" onClick={clearFilters} className="mt-4 w-full">
                  Clear All Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Clear Filters Button - Only show when filters are active */}
        {(activeCategory !== 'all' || searchQuery || priceRange[0] > 0 || priceRange[1] < 1000) && (
          <Button variant="outline" onClick={clearFilters} className="hidden md:flex">
            <X className="mr-2 h-4 w-4" /> Clear Filters
          </Button>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24">
            <CategoryFilter 
              activeCategory={activeCategory} 
              onCategoryChange={handleCategoryChange} 
            />
            <PriceRangeFilter 
              priceRange={priceRange}
              onPriceRangeChange={handlePriceRangeChange}
            />
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="flex-1">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Failed to load products from the server.
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2" 
                  onClick={() => refetch()}
                >
                  Try Again
                </Button>
              </AlertDescription>
            </Alert>
          )}
        
          {/* Active Filters Summary */}
          {(activeCategory !== 'all' || searchQuery || priceRange[0] > 0 || priceRange[1] < 1000) && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-medium mb-2">Active Filters:</h3>
              <div className="flex flex-wrap gap-2">
                {activeCategory !== 'all' && (
                  <Badge className="px-3 py-1 flex items-center gap-1">
                    Category: {activeCategory}
                    <button 
                      onClick={() => setActiveCategory('all')}
                      className="ml-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {searchQuery && (
                  <Badge className="px-3 py-1 flex items-center gap-1">
                    Search: {searchQuery}
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="ml-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                  <Badge className="px-3 py-1 flex items-center gap-1">
                    Price: ${priceRange[0]} - ${priceRange[1]}
                    <button 
                      onClick={() => setPriceRange([0, 1000])}
                      className="ml-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading products...</p>
            </div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${searchQuery}-${priceRange.join('-')}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductGrid products={filteredProducts} itemsPerPage={12} />
                  
                  {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                      <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">No products found</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Try adjusting your search or filter to find what you're looking for.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
