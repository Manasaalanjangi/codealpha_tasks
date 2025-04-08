
import api from './api';
import { toast } from 'sonner';

export interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  verified?: boolean;
  bio?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const register = async (userData: RegisterData): Promise<User | null> => {
  try {
    const response = await api.post<AuthResponse>('/users/register', userData);
    
    // Store token and user data
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data.user;
  } catch (error: any) {
    const message = error.response?.data?.msg || 'Registration failed';
    toast.error(message);
    return null;
  }
};

export const login = async (loginData: LoginData): Promise<User | null> => {
  try {
    const response = await api.post<AuthResponse>('/users/login', loginData);
    
    // Store token and user data
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data.user;
  } catch (error: any) {
    const message = error.response?.data?.msg || 'Login failed';
    toast.error(message);
    return null;
  }
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('token') !== null;
};

export const getUserProfile = async (): Promise<User | null> => {
  try {
    const response = await api.get<User>('/users/me');
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getUserByUsername = async (username: string): Promise<User | null> => {
  try {
    const response = await api.get<User>(`/users/username/${username}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
