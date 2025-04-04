
import axios from 'axios';
import type { Product } from '../contexts/CartContext';
import { products as fallbackProducts } from '../data/products';

// Base API URL - adjust based on environment
// This allows the API to work both in development and when deployed
const API_URL = import.meta.env.PROD 
  ? '/api'  // When deployed, use relative path
  : 'http://localhost:5000/api';  // In development, use the local server

// Products API
export const fetchProducts = async (category?: string): Promise<Product[]> => {
  try {
    const url = category && category !== 'all' 
      ? `${API_URL}/products?category=${category}`
      : `${API_URL}/products`;
      
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    if (import.meta.env.DEV) {
      console.log('Returning fallback products data in development mode');
      if (category && category !== 'all') {
        return fallbackProducts.filter(product => product.category === category);
      }
      return fallbackProducts;
    }
    throw error; // Re-throw for production environments
  }
};

export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    // Return fallback product in development
    if (import.meta.env.DEV) {
      const product = fallbackProducts.find(p => p.id === id);
      if (product) return product;
    }
    throw error;
  }
};

// Orders API
export const createOrder = async (orderData: any) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const fetchOrder = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order with id ${id}:`, error);
    throw error;
  }
};
