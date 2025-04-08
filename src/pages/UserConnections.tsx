
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { ProfileItem } from '@/components/friends/ProfileItem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getFollowing, getFollowers, followUser, unfollowUser } from '@/services/friendService';
import { getUserByUsername, User } from '@/services/authService';
import { ArrowLeft, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const UserConnections = () => {
  const { username, type = 'following' } = useParams<{ username: string, type: string }>();
  const [activeTab, setActiveTab] = useState(type === 'followers' ? 'followers' : 'following');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // Fetch the user
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user', username],
    queryFn: () => username ? getUserByUsername(username) : null,
    enabled: !!username
  });

  // Fetch following users
  const { data: following = [], isLoading: followingLoading, refetch: refetchFollowing } = useQuery({
    queryKey: ['following'],
    queryFn: getFollowing
  });

  // Fetch followers
  const { data: followers = [], isLoading: followersLoading, refetch: refetchFollowers } = useQuery({
    queryKey: ['followers'],
    queryFn: getFollowers
  });

  // Handler for following a user
  const handleFollowUser = async (userId: string) => {
    const success = await followUser(userId);
    if (success) {
      // Refetch both following and followers to update the UI
      refetchFollowing();
      refetchFollowers();
    }
  };

  // Handler for unfollowing a user
  const handleUnfollowUser = async (userId: string) => {
    const success = await unfollowUser(userId);
    if (success) {
      // Refetch both following and followers to update the UI
      refetchFollowing();
      refetchFollowers();
    }
  };

  // Update the active tab based on the URL when it changes
  useEffect(() => {
    if (type === 'followers') {
      setActiveTab('followers');
    } else {
      setActiveTab('following');
    }
  }, [type]);

  // Filter users based on search query
  const filteredFollowing = following.filter((user) => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFollowers = followers.filter((user) => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGoBack = () => {
    navigate(-1);
  };

  // Loading skeletons for user items
  const ProfileItemSkeleton = () => (
    <div className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div>
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container px-0 mx-auto flex">
        <Sidebar />
        <main className="flex-1 min-h-screen border-x">
          <div className="p-4 border-b">
            <div className="flex items-center gap-3 mb-4">
              <Button variant="ghost" size="icon" onClick={handleGoBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold">
                {userLoading ? 'Loading...' : user ? `${user.name}'s Connections` : 'Connections'}
              </h1>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search connections..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                  <div className="divide-y">
                    {[1, 2, 3, 4].map((i) => (
                      <ProfileItemSkeleton key={i} />
                    ))}
                  </div>
                ) : filteredFollowing.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    {searchQuery ? 'No matching users found.' : 'No following users found.'}
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredFollowing.map((user) => (
                      <ProfileItem 
                        key={user.id} 
                        user={user} 
                        onFollow={() => handleFollowUser(user.id)}
                        onUnfollow={() => handleUnfollowUser(user.id)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="followers">
                {followersLoading ? (
                  <div className="divide-y">
                    {[1, 2, 3, 4].map((i) => (
                      <ProfileItemSkeleton key={i} />
                    ))}
                  </div>
                ) : filteredFollowers.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    {searchQuery ? 'No matching users found.' : 'No followers found.'}
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredFollowers.map((user) => (
                      <ProfileItem 
                        key={user.id} 
                        user={user} 
                        onFollow={() => handleFollowUser(user.id)}
                        onUnfollow={() => handleUnfollowUser(user.id)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <RightSidebar />
      </div>
    </div>
  );
};

export default UserConnections;
