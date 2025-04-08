
import api from './api';
import { User } from './authService';

export interface Message {
  _id: string;
  content: string;
  sender: {
    _id: string;
    name: string;
    username: string;
    avatar: string;
  };
  recipient: {
    _id: string;
    name: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  partner: {
    _id: string;
    name: string;
    username: string;
    avatar: string;
    verified?: boolean; 
  };
  lastMessage: {
    _id: string;
    content: string;
    createdAt: string;
    read: boolean;
  };
  unreadCount: number;
}

// In-memory store for demo purposes
const conversationsStore: Conversation[] = [
  {
    partner: {
      _id: '1',
      name: 'Alex Johnson',
      username: 'alexj',
      avatar: 'https://i.pravatar.cc/150?img=1',
      verified: true
    },
    lastMessage: {
      _id: 'msg1',
      content: 'Hey, have you seen the latest design updates?',
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      read: true
    },
    unreadCount: 0
  },
  {
    partner: {
      _id: '2',
      name: 'Samantha Lee',
      username: 'samlee',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    lastMessage: {
      _id: 'msg2',
      content: 'Can we meet tomorrow to discuss the project?',
      createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
      read: false
    },
    unreadCount: 2
  },
  {
    partner: {
      _id: '3',
      name: 'Marcus Chen',
      username: 'mchen',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    lastMessage: {
      _id: 'msg3',
      content: 'I just pushed the new features to the repository!',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      read: true
    },
    unreadCount: 0
  }
];

const messagesStore: Record<string, Message[]> = {
  '1': [
    {
      _id: 'msg1-1',
      content: 'Hey, how are you doing?',
      sender: {
        _id: '1',
        name: 'Alex Johnson',
        username: 'alexj',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      recipient: {
        _id: 'me',
        name: 'Me',
        username: 'me',
        avatar: ''
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
      read: true
    },
    {
      _id: 'msg1-2',
      content: "I'm doing great! Working on the new UI components.",
      sender: {
        _id: 'me',
        name: 'Me',
        username: 'me',
        avatar: ''
      },
      recipient: {
        _id: '1',
        name: 'Alex Johnson',
        username: 'alexj',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 58).toISOString(), // 58 minutes ago
      read: true
    },
    {
      _id: 'msg1-3',
      content: 'Have you seen the latest design updates?',
      sender: {
        _id: '1',
        name: 'Alex Johnson',
        username: 'alexj',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      recipient: {
        _id: 'me',
        name: 'Me',
        username: 'me',
        avatar: ''
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      read: true
    }
  ],
  '2': [
    {
      _id: 'msg2-1',
      content: 'Hi there! Do you have a minute to chat about the project timeline?',
      sender: {
        _id: '2',
        name: 'Samantha Lee',
        username: 'samlee',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      recipient: {
        _id: 'me',
        name: 'Me',
        username: 'me',
        avatar: ''
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
      read: true
    },
    {
      _id: 'msg2-2',
      content: 'Sure, what do you need to discuss?',
      sender: {
        _id: 'me',
        name: 'Me',
        username: 'me',
        avatar: ''
      },
      recipient: {
        _id: '2',
        name: 'Samantha Lee',
        username: 'samlee',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 175).toISOString(), // 2 hours 55 minutes ago
      read: true
    },
    {
      _id: 'msg2-3',
      content: 'Can we meet tomorrow to discuss the project?',
      sender: {
        _id: '2',
        name: 'Samantha Lee',
        username: 'samlee',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      recipient: {
        _id: 'me',
        name: 'Me',
        username: 'me',
        avatar: ''
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
      read: false
    },
    {
      _id: 'msg2-4',
      content: "I've got some new ideas for the frontend implementation.",
      sender: {
        _id: '2',
        name: 'Samantha Lee',
        username: 'samlee',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      recipient: {
        _id: 'me',
        name: 'Me',
        username: 'me',
        avatar: ''
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 119).toISOString(), // 1 hour 59 minutes ago
      read: false
    }
  ],
  '3': [
    {
      _id: 'msg3-1',
      content: 'I just pushed the new features to the repository!',
      sender: {
        _id: '3',
        name: 'Marcus Chen',
        username: 'mchen',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      recipient: {
        _id: 'me',
        name: 'Me',
        username: 'me',
        avatar: ''
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      read: true
    }
  ]
};

// Get replies based on message content
const getSmartReply = (message: string): string => {
  const messageLower = message.toLowerCase();
  
  if (messageLower.includes('hello') || messageLower.includes('hi') || messageLower.includes('hey')) {
    return "Hi there! How are you doing today?";
  }
  
  if (messageLower.includes('how are you') || messageLower.includes('how\'s it going')) {
    return "I'm doing well, thanks for asking! How about you?";
  }
  
  if (messageLower.includes('project') || messageLower.includes('work')) {
    return "About the project - I've made some progress and would love to share updates soon!";
  }
  
  if (messageLower.includes('meeting') || messageLower.includes('call') || messageLower.includes('discuss')) {
    return "Sure, I'm available for a meeting. When works best for you?";
  }
  
  if (messageLower.includes('thanks') || messageLower.includes('thank')) {
    return "You're welcome! Let me know if you need anything else.";
  }
  
  if (messageLower.includes('help') || messageLower.includes('question')) {
    return "I'll do my best to help. What specifically do you need assistance with?";
  }
  
  // Default responses
  const defaultResponses = [
    "That's interesting! Tell me more.",
    "I see. What are your thoughts on that?",
    "Sounds good! Let's talk more about this soon.",
    "I appreciate you sharing that with me.",
    "That makes sense. I'll keep that in mind.",
    "Great point! I hadn't thought about it that way.",
    "I'll work on that and get back to you.",
    "Let me think about that and I'll follow up soon.",
    "Thanks for the update!",
    "I'm looking forward to our next conversation about this."
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

// Send a message to a user
export const sendMessage = async (recipientId: string, content: string): Promise<Message> => {
  try {
    // In a real app, make API call here
    // const response = await api.post('/messages', { recipientId, content });
    
    // For demo, create a new message and update store
    const newMessage: Message = {
      _id: `new-${Date.now()}`,
      content,
      sender: {
        _id: 'me',
        name: 'Me',
        username: 'me',
        avatar: ''
      },
      recipient: {
        _id: recipientId,
        name: '',  // This would be populated from the conversation
        username: '',
        avatar: ''
      },
      createdAt: new Date().toISOString(),
      read: true
    };
    
    // Find the conversation to get recipient details
    const conversation = conversationsStore.find(c => c.partner._id === recipientId);
    if (conversation) {
      newMessage.recipient = {
        _id: recipientId,
        name: conversation.partner.name,
        username: conversation.partner.username,
        avatar: conversation.partner.avatar
      };
      
      // Update last message for the conversation
      conversation.lastMessage = {
        _id: newMessage._id,
        content: newMessage.content,
        createdAt: newMessage.createdAt,
        read: true
      };
    }
    
    // Add message to store
    if (!messagesStore[recipientId]) {
      messagesStore[recipientId] = [];
    }
    messagesStore[recipientId].push(newMessage);
    
    // Simulate delay and reply (for demo)
    setTimeout(() => {
      const reply: Message = {
        _id: `reply-${Date.now()}`,
        content: getSmartReply(content),
        sender: newMessage.recipient,  // The recipient becomes the sender
        recipient: newMessage.sender,  // The sender becomes the recipient
        createdAt: new Date().toISOString(),
        read: true
      };
      
      messagesStore[recipientId].push(reply);
      
      // Update conversation last message
      if (conversation) {
        conversation.lastMessage = {
          _id: reply._id,
          content: reply.content,
          createdAt: reply.createdAt,
          read: true
        };
      }
    }, Math.random() * 1000 + 1000);  // Random delay between 1-2 seconds
    
    return newMessage;
  } catch (error) {
    throw error;
  }
};

// Get conversation with specific user
export const getConversation = async (userId: string): Promise<Message[]> => {
  try {
    // In a real app, make API call here
    // const response = await api.get(`/messages/conversation/${userId}`);
    
    // For demo, return from store
    return messagesStore[userId] || [];
  } catch (error) {
    throw error;
  }
};

// Get all conversations for current user
export const getConversations = async (): Promise<Conversation[]> => {
  try {
    // In a real app, make API call here
    // const response = await api.get('/messages/conversations');
    
    // For demo, return from store
    return conversationsStore;
  } catch (error) {
    throw error;
  }
};

// Create a new conversation with a user
export const createConversation = async (user: User): Promise<Conversation> => {
  // Check if conversation already exists
  const existingConversation = conversationsStore.find(c => c.partner._id === user.id);
  if (existingConversation) {
    return existingConversation;
  }
  
  // Create new conversation
  const newConversation: Conversation = {
    partner: {
      _id: user.id,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
      verified: user.verified
    },
    lastMessage: {
      _id: '',
      content: 'No messages yet',
      createdAt: new Date().toISOString(),
      read: true
    },
    unreadCount: 0
  };
  
  // Add to store
  conversationsStore.unshift(newConversation);
  
  return newConversation;
};

// Mark messages from a user as read
export const markAsRead = async (userId: string): Promise<boolean> => {
  try {
    // In a real app, make API call here
    // const response = await api.put(`/messages/read/${userId}`);
    
    // For demo, mark all messages from user as read
    const conversation = conversationsStore.find(c => c.partner._id === userId);
    if (conversation) {
      conversation.unreadCount = 0;
    }
    
    if (messagesStore[userId]) {
      messagesStore[userId] = messagesStore[userId].map(msg => {
        if (msg.sender._id === userId && !msg.read) {
          return { ...msg, read: true };
        }
        return msg;
      });
    }
    
    return true;
  } catch (error) {
    throw error;
  }
};
