
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const suggestedUsers = [
  {
    id: '1',
    name: 'Alex Morgan',
    username: '@alexmorgan',
    avatar: '',
    followed: false
  },
  {
    id: '2',
    name: 'Taylor Swift',
    username: '@taylorswift',
    avatar: '',
    followed: false
  },
  {
    id: '3',
    name: 'Chris Evans',
    username: '@chrisevans',
    avatar: '',
    followed: true
  },
  {
    id: '4',
    name: 'Emma Watson',
    username: '@emmawatson',
    avatar: '',
    followed: false
  },
];

const trending = [
  { id: 1, tag: '#TechTalks', posts: '23K' },
  { id: 2, tag: '#ArtistSpotlight', posts: '18K' },
  { id: 3, tag: '#GamingCommunity', posts: '12K' },
  { id: 4, tag: '#FoodieFriday', posts: '9K' },
];

export function RightSidebar() {
  const [users, setUsers] = useState(suggestedUsers);
  
  const toggleFollow = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, followed: !user.followed } : user
    ));
  };
  
  return (
    <aside className="hidden xl:flex flex-col border-l bg-background w-80 p-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="mb-6">
        <h3 className="font-medium text-lg mb-4">Suggested for you</h3>
        <div className="space-y-4">
          {users.map(user => (
            <div key={user.id} className="flex items-center justify-between">
              <Link to={`/profile/${user.username}`} className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.username}</p>
                </div>
              </Link>
              <Button 
                variant={user.followed ? "outline" : "default"} 
                size="sm"
                onClick={() => toggleFollow(user.id)}
                className={user.followed ? "hover:bg-destructive hover:text-destructive-foreground" : ""}
              >
                {user.followed ? "Following" : (
                  <>
                    <UserPlus className="h-4 w-4 mr-1" />
                    Follow
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-lg mb-4">Trending Topics</h3>
        <div className="space-y-3">
          {trending.map(topic => (
            <div key={topic.id} className="p-3 rounded-md hover:bg-muted">
              <Link to={`/trending/${topic.tag}`} className="block">
                <p className="text-sm font-medium text-primary">{topic.tag}</p>
                <p className="text-xs text-muted-foreground">{topic.posts} posts</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 text-xs text-muted-foreground">
        <div className="flex flex-wrap gap-2">
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/privacy" className="hover:underline">Privacy</Link>
          <Link to="/terms" className="hover:underline">Terms</Link>
          <Link to="/help" className="hover:underline">Help Center</Link>
        </div>
        <p className="mt-2">© 2025 SocialWeave</p>
      </div>
    </aside>
  );
}
