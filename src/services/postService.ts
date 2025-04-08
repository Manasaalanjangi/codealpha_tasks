
import api from './api';
import { toast } from 'sonner';
import { User } from './authService';

export interface Post {
  _id: string;
  userId: User | string;
  content: string;
  image?: string;
  likes: string[];
  comments: {
    userId: User | string;
    content: string;
    createdAt: string;
  }[];
  shares: number;
  createdAt: string;
}

export interface CreatePostData {
  content: string;
  image?: string;
}

export const createPost = async (postData: CreatePostData): Promise<Post | null> => {
  try {
    const response = await api.post<Post>('/posts', postData);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.msg || 'Failed to create post';
    toast.error(message);
    return null;
  }
};

export const getTimelinePosts = async (): Promise<Post[]> => {
  try {
    const response = await api.get<Post[]>('/posts/timeline');
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch posts');
    return [];
  }
};

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const response = await api.get<Post[]>('/posts');
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch posts');
    return [];
  }
};

export const getPost = async (postId: string): Promise<Post | null> => {
  try {
    const response = await api.get<Post>(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const deletePost = async (postId: string): Promise<boolean> => {
  try {
    await api.delete(`/posts/${postId}`);
    return true;
  } catch (error: any) {
    const message = error.response?.data?.msg || 'Failed to delete post';
    toast.error(message);
    return false;
  }
};

export const likePost = async (postId: string): Promise<string[] | null> => {
  try {
    const response = await api.put<string[]>(`/likes/post/${postId}`);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.msg || 'Failed to like post';
    toast.error(message);
    return null;
  }
};

export const unlikePost = async (postId: string): Promise<string[] | null> => {
  try {
    const response = await api.put<string[]>(`/likes/post/${postId}/unlike`);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.msg || 'Failed to unlike post';
    toast.error(message);
    return null;
  }
};

export const getLikedPosts = async (): Promise<Post[]> => {
  try {
    const response = await api.get<Post[]>('/likes/user');
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch liked posts');
    return [];
  }
};
