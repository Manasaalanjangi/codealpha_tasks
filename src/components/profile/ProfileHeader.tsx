
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Link as LinkIcon, MapPin, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface ProfileHeaderProps {
  user: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    coverImage?: string;
    bio?: string;
    location?: string;
    website?: string;
    joinDate?: string;
    following: number;
    followers: number;
    isOwnProfile?: boolean;
    isFollowing?: boolean;
  };
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [followers, setFollowers] = useState(user.followers);

  const handleFollow = () => {
    if (isFollowing) {
      setFollowers(followers - 1);
    } else {
      setFollowers(followers + 1);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="mb-6">
      <div className="h-48 bg-muted relative rounded-t-xl overflow-hidden">
        {user.coverImage ? (
          <img
            src={user.coverImage}
            alt={`${user.name}'s cover`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-social-indigo to-social-blue opacity-50" />
        )}
      </div>
      
      <div className="px-4 pb-0 relative">
        <div className="flex justify-between">
          <div className="-mt-12">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="mt-4">
            {user.isOwnProfile ? (
              <Button variant="outline" className="rounded-full">
                <Pencil className="h-4 w-4 mr-2" />
                Edit profile
              </Button>
            ) : (
              <Button
                onClick={handleFollow}
                variant={isFollowing ? "outline" : "default"}
                className={`rounded-full ${
                  isFollowing ? "hover:bg-destructive hover:text-destructive-foreground" : ""
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            )}
          </div>
        </div>

        <div className="mt-2">
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">@{user.username}</p>

          {user.bio && <p className="mt-3">{user.bio}</p>}

          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-muted-foreground">
            {user.location && (
              <div className="flex items-center">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{user.location}</span>
              </div>
            )}
            {user.website && (
              <div className="flex items-center">
                <LinkIcon className="h-3.5 w-3.5 mr-1" />
                <a 
                  href={user.website.startsWith('http') ? user.website : `https://${user.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {user.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {user.joinDate && (
              <div className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                <span>Joined {user.joinDate}</span>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-3 text-sm">
            <Link to={`/profile/${user.username}/following`} className="hover:underline">
              <span className="font-bold">{user.following}</span>{" "}
              <span className="text-muted-foreground">Following</span>
            </Link>
            <Link to={`/profile/${user.username}/followers`} className="hover:underline">
              <span className="font-bold">{followers}</span>{" "}
              <span className="text-muted-foreground">Followers</span>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="posts" className="mt-6">
          <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0">
            <TabsTrigger 
              value="posts"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-3 pt-0 px-6 data-[state=active]:shadow-none"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger 
              value="media"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-3 pt-0 px-6 data-[state=active]:shadow-none"
            >
              Media
            </TabsTrigger>
            <TabsTrigger 
              value="likes"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-3 pt-0 px-6 data-[state=active]:shadow-none"
            >
              Likes
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
