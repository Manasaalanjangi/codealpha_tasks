import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Send, Search, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getConversations, getConversation, sendMessage, markAsRead } from '@/services/messageService';
import { getUserByUsername, getUserProfile, User } from '@/services/authService';
import { getFollowing, getFollowers } from '@/services/friendService';
import { ProfileItem } from '@/components/friends/ProfileItem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface Conversation {
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

interface Message {
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

const sampleUsers: User[] = [
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
  }
];

const sampleConversations: Conversation[] = [
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

const sampleMessages: Record<string, Message[]> = {
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

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showContacts, setShowContacts] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { data: following = sampleUsers, isLoading: followingLoading } = useQuery({
    queryKey: ['following'],
    queryFn: getFollowing
  });
  
  const { data: followers = sampleUsers.slice(2).concat(sampleUsers.slice(0, 2)), isLoading: followersLoading } = useQuery({
    queryKey: ['followers'],
    queryFn: getFollowers
  });
  
  const [conversations, setConversations] = useState<Conversation[]>(sampleConversations);
  const [messages, setMessages] = useState<Message[]>([]);
  const conversationsLoading = false;
  const messagesLoading = false;
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userId = params.get('user');
    
    if (userId && conversations) {
      const conversation = conversations.find(c => c.partner._id === userId);
      if (conversation) {
        setSelectedConversation(conversation);
        setMessages(sampleMessages[userId] || []);
      }
    }
  }, [location.search, conversations]);

  useEffect(() => {
    if (selectedConversation) {
      setMessages(sampleMessages[selectedConversation.partner._id] || []);
      
      if (selectedConversation.unreadCount > 0) {
        const updatedConversations = conversations.map(conv => {
          if (conv.partner._id === selectedConversation.partner._id) {
            return { ...conv, unreadCount: 0 };
          }
          return conv;
        });
        setConversations(updatedConversations);
      }
    }
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    const newMsg: Message = {
      _id: `new-${Date.now()}`,
      content: newMessage.trim(),
      sender: {
        _id: 'me',
        name: 'Me',
        username: 'me',
        avatar: ''
      },
      recipient: {
        _id: selectedConversation.partner._id,
        name: selectedConversation.partner.name,
        username: selectedConversation.partner.username,
        avatar: selectedConversation.partner.avatar
      },
      createdAt: new Date().toISOString(),
      read: true
    };
    
    setMessages([...messages, newMsg]);
    
    const updatedConversations = conversations.map(conv => {
      if (conv.partner._id === selectedConversation.partner._id) {
        return {
          ...conv,
          lastMessage: {
            _id: newMsg._id,
            content: newMsg.content,
            createdAt: newMsg.createdAt,
            read: true
          }
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setNewMessage('');
    
    setTimeout(() => {
      const replyContent = getRandomReply();
      const reply: Message = {
        _id: `reply-${Date.now()}`,
        content: replyContent,
        sender: {
          _id: selectedConversation.partner._id,
          name: selectedConversation.partner.name,
          username: selectedConversation.partner.username,
          avatar: selectedConversation.partner.avatar
        },
        recipient: {
          _id: 'me',
          name: 'Me',
          username: 'me',
          avatar: ''
        },
        createdAt: new Date().toISOString(),
        read: true
      };
      
      setMessages(current => [...current, reply]);
      
      const updatedConvsWithReply = conversations.map(conv => {
        if (conv.partner._id === selectedConversation.partner._id) {
          return {
            ...conv,
            lastMessage: {
              _id: reply._id,
              content: reply.content,
              createdAt: reply.createdAt,
              read: true
            }
          };
        }
        return conv;
      });
      
      setConversations(updatedConvsWithReply);
    }, 2000);
  };

  const getRandomReply = () => {
    const replies = [
      "That sounds great!",
      "I'll get back to you on that soon.",
      "Thanks for letting me know!",
      "Interesting, tell me more about it.",
      "I'm not sure I understand. Could you explain?",
      "Looking forward to our collaboration!",
      "Let me check my schedule and get back to you.",
      "Perfect, that works for me.",
      "I have some thoughts on this, let's discuss further."
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const selectContact = (user: User) => {
    const conversation = conversations.find(conv => conv.partner._id === user.id);
    
    if (conversation) {
      setSelectedConversation(conversation);
    } else {
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
      
      setConversations([newConversation, ...conversations]);
      setSelectedConversation(newConversation);
      setMessages([]);
    }
    
    setShowContacts(false);
    navigate(`/messages?user=${user.id}`, { replace: true });
  };

  const filteredConversations = searchQuery 
    ? conversations.filter((conv: Conversation) => 
        conv.partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.partner.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  const filteredFollowing = searchQuery 
    ? following.filter((user) => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : following;
  
  const filteredFollowers = searchQuery 
    ? followers.filter((user) => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : followers;

  const formatMessageDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container px-0 mx-auto flex">
        <Sidebar />
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 min-h-[calc(100vh-4rem)]">
          <div className="border-r md:col-span-1">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">{showContacts ? 'Contacts' : 'Messages'}</h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowContacts(!showContacts);
                    setSearchQuery('');
                  }}
                >
                  {showContacts ? (
                    <ArrowLeft className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={showContacts ? "Search contacts..." : "Search messages..."}
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {showContacts ? (
              <ScrollArea className="h-[calc(100vh-8rem)]">
                <Tabs defaultValue="following" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="following" className="flex-1">
                      Following
                      {following.length > 0 && <span className="ml-1 text-xs">({following.length})</span>}
                    </TabsTrigger>
                    <TabsTrigger value="followers" className="flex-1">
                      Followers
                      {followers.length > 0 && <span className="ml-1 text-xs">({followers.length})</span>}
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="following">
                    {followingLoading ? (
                      <div className="p-4 text-center">Loading contacts...</div>
                    ) : filteredFollowing.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">
                        {searchQuery ? 'No matching contacts found.' : 'You\'re not following anyone yet.'}
                      </div>
                    ) : (
                      filteredFollowing.map((user) => (
                        <div key={user.id} onClick={() => selectContact(user)}>
                          <ProfileItem user={user} showMessageButton={false} />
                        </div>
                      ))
                    )}
                  </TabsContent>
                  
                  <TabsContent value="followers">
                    {followersLoading ? (
                      <div className="p-4 text-center">Loading followers...</div>
                    ) : filteredFollowers.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">
                        {searchQuery ? 'No matching followers found.' : 'You don\'t have any followers yet.'}
                      </div>
                    ) : (
                      filteredFollowers.map((user) => (
                        <div key={user.id} onClick={() => selectContact(user)}>
                          <ProfileItem user={user} showMessageButton={false} />
                        </div>
                      ))
                    )}
                  </TabsContent>
                </Tabs>
              </ScrollArea>
            ) : (
              <ScrollArea className="h-[calc(100vh-8rem)]">
                {conversationsLoading ? (
                  <div className="p-4 text-center">Loading conversations...</div>
                ) : filteredConversations.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    {searchQuery ? 'No matching conversations found.' : 'No conversations yet.'}
                  </div>
                ) : (
                  filteredConversations.map((conversation: Conversation) => (
                    <div
                      key={conversation.partner._id}
                      className={`p-4 border-b flex items-center gap-3 cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedConversation?.partner._id === conversation.partner._id
                          ? "bg-muted"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedConversation(conversation);
                        navigate(`/messages?user=${conversation.partner._id}`, { replace: true });
                      }}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12 border">
                          <AvatarImage src={conversation.partner.avatar} />
                          <AvatarFallback>{conversation.partner.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {conversation.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">{conversation.partner.name}</h3>
                          <span className="text-xs text-muted-foreground">
                            {formatMessageDate(conversation.lastMessage.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm truncate text-muted-foreground">
                          {conversation.lastMessage.content}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                
                {!conversationsLoading && filteredConversations.length === 0 && !searchQuery && (
                  <div className="p-4 mt-4">
                    <Card className="p-6 text-center">
                      <h3 className="text-lg font-medium mb-2">Start chatting</h3>
                      <p className="text-muted-foreground mb-4">Connect with people you follow and start a conversation</p>
                      <Button 
                        onClick={() => setShowContacts(true)} 
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        New Conversation
                      </Button>
                    </Card>
                  </div>
                )}
              </ScrollArea>
            )}
          </div>
          
          <div className="md:col-span-2 flex flex-col h-[calc(100vh-4rem)]">
            {selectedConversation ? (
              <>
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3 cursor-pointer" 
                       onClick={() => navigate(`/profile/${selectedConversation.partner.username}`)}>
                    <Avatar className="h-12 w-12 border">
                      <AvatarImage src={selectedConversation.partner.avatar} />
                      <AvatarFallback>{selectedConversation.partner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-medium">{selectedConversation.partner.name}</h2>
                        {selectedConversation.partner.verified && (
                          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        @{selectedConversation.partner.username}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate(`/profile/${selectedConversation.partner.username}`)}
                  >
                    View Profile
                  </Button>
                </div>
                
                <ScrollArea className="flex-1 p-4">
                  {messagesLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <p>Loading messages...</p>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <Avatar className="h-16 w-16 mb-4">
                        <AvatarImage src={selectedConversation.partner.avatar} />
                        <AvatarFallback>{selectedConversation.partner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-medium text-lg">Start a conversation with {selectedConversation.partner.name}</h3>
                      <p className="text-muted-foreground text-center mt-2 max-w-xs">
                        Say hello and start chatting with {selectedConversation.partner.name}.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message: Message) => {
                        const isMe = message.sender._id === 'me';
                        return (
                          <div
                            key={message._id}
                            className={`flex ${
                              isMe ? "justify-end" : "justify-start"
                            }`}
                          >
                            {!isMe && (
                              <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                                <AvatarImage src={message.sender.avatar} />
                                <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            )}
                            <div
                              className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                                isMe
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}
                            >
                              <p>{message.content}</p>
                              <span
                                className={`text-xs ${
                                  isMe
                                    ? "text-primary-foreground/80"
                                    : "text-muted-foreground"
                                } block text-right mt-1`}
                              >
                                {formatMessageDate(message.createdAt)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </ScrollArea>
                
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder={`Write a message to ${selectedConversation.partner.name}...`}
                      className="min-h-[60px] resize-none"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="h-[60px] w-[60px]"
                      disabled={!newMessage.trim()}
                      onClick={handleSendMessage}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <h2 className="text-xl font-medium mb-2">Welcome to Messages</h2>
                <p className="text-muted-foreground max-w-md mb-6">
                  Connect with friends and start conversations. Choose from your existing chats or start a new one.
                </p>
                <Button onClick={() => setShowContacts(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Start New Conversation
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
