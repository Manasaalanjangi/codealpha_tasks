
import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, UserPlus, UserMinus, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Sample user data
const allFriends = [
  {
    id: '101',
    name: 'Jane Cooper',
    username: 'janecooper',
    avatar: '',
    status: 'Online',
    mutualFriends: 12,
  },
  {
    id: '102',
    name: 'Alex Morgan',
    username: 'alexmorgan',
    avatar: '',
    status: 'Offline',
    mutualFriends: 8,
  },
  {
    id: '103',
    name: 'Emma Wilson',
    username: 'emmawilson',
    avatar: '',
    status: 'Online',
    mutualFriends: 5,
  },
  {
    id: '104',
    name: 'Michael Brown',
    username: 'michaelbrown',
    avatar: '',
    status: 'Offline',
    mutualFriends: 3,
  },
  {
    id: '105',
    name: 'Sophia Davis',
    username: 'sophiadavis',
    avatar: '',
    status: 'Online',
    mutualFriends: 15,
  },
];

const pendingRequests = [
  {
    id: '106',
    name: 'David Garcia',
    username: 'davidgarcia',
    avatar: '',
    mutualFriends: 7,
  },
  {
    id: '107',
    name: 'Olivia Martinez',
    username: 'oliviamartinez',
    avatar: '',
    mutualFriends: 4,
  },
];

const suggestions = [
  {
    id: '108',
    name: 'Ethan Johnson',
    username: 'ethanjohnson',
    avatar: '',
    mutualFriends: 9,
  },
  {
    id: '109',
    name: 'Ava Williams',
    username: 'avawilliams',
    avatar: '',
    mutualFriends: 6,
  },
  {
    id: '110',
    name: 'Noah Taylor',
    username: 'noahtaylor',
    avatar: '',
    mutualFriends: 11,
  },
];

const Friends = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState(allFriends);
  const [requests, setRequests] = useState(pendingRequests);
  const [recommendedUsers, setRecommendedUsers] = useState(suggestions);

  const handleAcceptRequest = (userId: string) => {
    const userToAccept = requests.find(user => user.id === userId);
    if (userToAccept) {
      setRequests(requests.filter(user => user.id !== userId));
      setFriends([...friends, {...userToAccept, status: 'Online'}]);
      toast({
        title: "Friend Request Accepted",
        description: `You are now friends with ${userToAccept.name}.`,
      });
    }
  };

  const handleDeclineRequest = (userId: string) => {
    setRequests(requests.filter(user => user.id !== userId));
    toast({
      title: "Friend Request Declined",
      description: "The friend request has been declined.",
    });
  };

  const handleAddFriend = (userId: string) => {
    const userToAdd = recommendedUsers.find(user => user.id === userId);
    if (userToAdd) {
      setRecommendedUsers(recommendedUsers.filter(user => user.id !== userId));
      toast({
        title: "Friend Request Sent",
        description: `Friend request sent to ${userToAdd.name}.`,
      });
    }
  };

  const handleRemoveFriend = (userId: string) => {
    const userToRemove = friends.find(user => user.id === userId);
    if (userToRemove) {
      setFriends(friends.filter(user => user.id !== userId));
      toast({
        title: "Friend Removed",
        description: `${userToRemove.name} has been removed from your friends.`,
      });
    }
  };

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container px-0 mx-auto flex">
        <Sidebar />
        <main className="flex-1 min-h-screen border-x px-4 sm:px-6">
          <div className="py-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Friends</h1>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search friends..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>All Friends</span>
                </TabsTrigger>
                <TabsTrigger value="requests" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Requests</span>
                  {requests.length > 0 && (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {requests.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="suggestions" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Suggestions</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="space-y-4">
                  {filteredFriends.length > 0 ? (
                    filteredFriends.map((friend) => (
                      <Card key={friend.id}>
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src={friend.avatar} />
                              <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{friend.name}</h3>
                              <p className="text-sm text-muted-foreground">@{friend.username}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className={`w-2 h-2 rounded-full ${friend.status === 'Online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                <span className="text-xs text-muted-foreground">{friend.status}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <a href={`/profile/${friend.username}`}>View Profile</a>
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleRemoveFriend(friend.id)}>
                              <UserMinus className="h-4 w-4" />
                              <span className="sr-only">Remove Friend</span>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-center py-6 text-muted-foreground">
                      {searchQuery ? 'No friends match your search' : 'You have no friends yet'}
                    </p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="requests" className="mt-6">
                <div className="space-y-4">
                  {requests.length > 0 ? (
                    requests.map((request) => (
                      <Card key={request.id}>
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src={request.avatar} />
                              <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{request.name}</h3>
                              <p className="text-sm text-muted-foreground">@{request.username}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {request.mutualFriends} mutual friends
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" onClick={() => handleAcceptRequest(request.id)}>Accept</Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeclineRequest(request.id)}>Decline</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-center py-6 text-muted-foreground">
                      No pending friend requests
                    </p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="suggestions" className="mt-6">
                <div className="space-y-4">
                  {recommendedUsers.map((user) => (
                    <Card key={user.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">@{user.username}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {user.mutualFriends} mutual friends
                            </p>
                          </div>
                        </div>
                        <Button size="sm" onClick={() => handleAddFriend(user.id)}>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Add Friend
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Friends;
