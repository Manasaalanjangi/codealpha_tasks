
import api from './api';
import { toast } from 'sonner';
import { User } from './authService';

// Our in-memory store for demo purposes
let sampleFollowingUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    username: 'alexj',
    email: 'alex.johnson@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Digital artist and creative coder',
    verified: true
  },
  {
    id: '2',
    name: 'Samantha Lee',
    username: 'samlee',
    email: 'samantha.lee@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    bio: 'UX Designer | Dog lover | Coffee addict'
  },
  {
    id: '3',
    name: 'Marcus Chen',
    username: 'mchen',
    email: 'marcus.chen@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'Software engineer and open source contributor'
  },
  {
    id: '4',
    name: 'Priya Patel',
    username: 'priyap',
    email: 'priya.patel@example.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
    bio: 'Product Manager | Travel enthusiast',
    verified: true
  },
  {
    id: '5',
    name: 'Thomas Wright',
    username: 'twright',
    email: 'thomas.wright@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Full-stack developer and tech blogger'
  }
];

let sampleFollowersUsers: User[] = [
  {
    id: '3',
    name: 'Marcus Chen',
    username: 'mchen',
    email: 'marcus.chen@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'Software engineer and open source contributor'
  },
  {
    id: '4',
    name: 'Priya Patel',
    username: 'priyap',
    email: 'priya.patel@example.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
    bio: 'Product Manager | Travel enthusiast',
    verified: true
  },
  {
    id: '5',
    name: 'Thomas Wright',
    username: 'twright',
    email: 'thomas.wright@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Full-stack developer and tech blogger'
  },
  {
    id: '6',
    name: 'Emma Wilson',
    username: 'ewilson',
    email: 'emma.wilson@example.com',
    avatar: 'https://i.pravatar.cc/150?img=6',
    bio: 'Graphic designer and illustrator'
  },
  {
    id: '7',
    name: 'David Kim',
    username: 'dkim',
    email: 'david.kim@example.com',
    avatar: 'https://i.pravatar.cc/150?img=7',
    bio: 'Frontend developer | Music lover',
    verified: true
  }
];

// Available users to follow (not in following list)
const availableUsers: User[] = [
  {
    id: '6',
    name: 'Emma Wilson',
    username: 'ewilson',
    email: 'emma.wilson@example.com',
    avatar: 'https://i.pravatar.cc/150?img=6',
    bio: 'Graphic designer and illustrator'
  },
  {
    id: '7',
    name: 'David Kim',
    username: 'dkim',
    email: 'david.kim@example.com',
    avatar: 'https://i.pravatar.cc/150?img=7',
    bio: 'Frontend developer | Music lover',
    verified: true
  },
  {
    id: '8',
    name: 'Olivia Martinez',
    username: 'omartinez',
    email: 'olivia.martinez@example.com',
    avatar: 'https://i.pravatar.cc/150?img=8',
    bio: 'Photographer | Travel enthusiast'
  }
];

export const followUser = async (userId: string): Promise<boolean> => {
  try {
    // Simulate API call
    await api.put(`/friends/follow/${userId}`);
    
    // For demo: find the user from available users or followers and add to following
    const userToFollow = [...availableUsers, ...sampleFollowersUsers].find(user => user.id === userId);
    
    if (userToFollow && !sampleFollowingUsers.some(user => user.id === userId)) {
      // Add to following
      sampleFollowingUsers = [...sampleFollowingUsers, userToFollow];
      
      // If not already a follower, add to followers with 20% chance (to simulate not all follows are mutual)
      if (!sampleFollowersUsers.some(user => user.id === userId) && Math.random() > 0.8) {
        sampleFollowersUsers = [...sampleFollowersUsers, userToFollow];
      }
      
      toast.success(`You are now following ${userToFollow.name}`);
    }
    
    return true;
  } catch (error: any) {
    const message = error.response?.data?.msg || 'Failed to follow user';
    toast.error(message);
    return false;
  }
};

export const unfollowUser = async (userId: string): Promise<boolean> => {
  try {
    // Simulate API call
    await api.put(`/friends/unfollow/${userId}`);
    
    // For demo: remove from following list
    sampleFollowingUsers = sampleFollowingUsers.filter(user => user.id !== userId);
    
    toast.success("Unfollowed successfully");
    return true;
  } catch (error: any) {
    const message = error.response?.data?.msg || 'Failed to unfollow user';
    toast.error(message);
    return false;
  }
};

export const getFollowing = async (): Promise<User[]> => {
  try {
    // For demonstration, return the in-memory sample data
    return sampleFollowingUsers;
  } catch (error) {
    toast.error('Failed to fetch following users');
    return [];
  }
};

export const getFollowers = async (): Promise<User[]> => {
  try {
    // For demonstration, return the in-memory sample data
    return sampleFollowersUsers;
  } catch (error) {
    toast.error('Failed to fetch followers');
    return [];
  }
};

export const getFriendSuggestions = async (): Promise<User[]> => {
  try {
    // Return users that are not currently being followed
    return availableUsers.filter(user => !sampleFollowingUsers.some(following => following.id === user.id));
  } catch (error) {
    toast.error('Failed to fetch friend suggestions');
    return [];
  }
};
