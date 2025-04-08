
import api from './api';
import { toast } from 'sonner';
import { Post } from './postService';

export interface Collection {
  _id: string;
  userId: string;
  name: string;
  description?: string;
  preview?: string;
  posts: string[];
  createdAt: string;
}

export const savePost = async (postId: string): Promise<boolean> => {
  try {
    await api.post(`/saved/post/${postId}`);
    return true;
  } catch (error: any) {
    const message = error.response?.data?.msg || 'Failed to save post';
    toast.error(message);
    return false;
  }
};

export const unsavePost = async (postId: string): Promise<boolean> => {
  try {
    await api.delete(`/saved/post/${postId}`);
    return true;
  } catch (error: any) {
    const message = error.response?.data?.msg || 'Failed to unsave post';
    toast.error(message);
    return false;
  }
};

export const getSavedPosts = async (): Promise<Post[]> => {
  try {
    const response = await api.get<Post[]>('/saved');
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch saved posts');
    return [];
  }
};

export const createCollection = async (
  name: string,
  description?: string,
  preview?: string
): Promise<Collection | null> => {
  try {
    const response = await api.post<Collection>('/saved/collection', {
      name,
      description,
      preview
    });
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.msg || 'Failed to create collection';
    toast.error(message);
    return null;
  }
};

export const getCollections = async (): Promise<Collection[]> => {
  try {
    const response = await api.get<Collection[]>('/saved/collections');
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch collections');
    return [];
  }
};

export const addPostToCollection = async (
  collectionId: string,
  postId: string
): Promise<Collection | null> => {
  try {
    const response = await api.put<Collection>(
      `/saved/collection/${collectionId}/post/${postId}`
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.msg || 'Failed to add post to collection';
    toast.error(message);
    return null;
  }
};
