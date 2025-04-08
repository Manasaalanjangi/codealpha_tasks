
import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { Post, PostProps } from '@/components/home/Post';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, ThumbsUp } from 'lucide-react';

// Sample liked posts data
const likedPosts: PostProps[] = [
  {
    id: '101',
    user: {
      id: '102',
      name: 'Alex Morgan',
      username: 'alexmorgan',
      avatar: '',
    },
    content: 'Beautiful sunset at the beach today! Nature never fails to amaze me.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    createdAt: '4h ago',
    likes: 156,
    comments: 23,
    shares: 45,
    hasLiked: true,
  },
  {
    id: '105',
    user: {
      id: '105',
      name: 'Sophia Davis',
      username: 'sophiadavis',
      avatar: '',
      verified: true,
    },
    content: 'Just got back from an amazing hiking trip in the mountains! The views were absolutely breathtaking. #nature #hiking #adventure',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    createdAt: '1d ago',
    likes: 211,
    comments: 32,
    shares: 18,
    hasLiked: true,
  },
  {
    id: '108',
    user: {
      id: '108',
      name: 'Ethan Johnson',
      username: 'ethanjohnson',
      avatar: '',
    },
    content: 'Just adopted this adorable puppy! Meet Max, the newest addition to our family. ❤️🐕',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    createdAt: '2d ago',
    likes: 287,
    comments: 53,
    shares: 27,
    hasLiked: true,
  },
];

// Sample content that you've liked (could be posts, photos, comments)
const likedContent = [
  {
    id: '201',
    type: 'comment',
    content: 'This is such an insightful observation about the design principles!',
    user: {
      name: 'Daniel Wilson',
      username: 'danielw',
      avatar: ''
    },
    postTitle: 'Design Trends for 2025',
    timestamp: '3d ago'
  },
  {
    id: '202',
    type: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
    user: {
      name: 'Emma Roberts',
      username: 'emmar',
      avatar: ''
    },
    description: 'My cat enjoying the sunshine',
    timestamp: '5d ago'
  }
];

const Likes = () => {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container px-0 mx-auto flex">
        <Sidebar />
        <main className="flex-1 min-h-screen border-x px-4 sm:px-6">
          <div className="py-6">
            <div className="flex items-center mb-6">
              <Heart className="h-7 w-7 text-red-500 mr-3" />
              <h1 className="text-2xl font-bold">Your Likes</h1>
            </div>
            
            <Tabs defaultValue="posts" onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="posts" className="flex gap-2 items-center">
                  <Heart className="h-4 w-4" />
                  <span>Liked Posts</span>
                </TabsTrigger>
                <TabsTrigger value="content" className="flex gap-2 items-center">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Other Content</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="posts" className="space-y-4">
                <div className="space-y-4">
                  {likedPosts.map((post) => (
                    <Post key={post.id} {...post} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="content" className="space-y-4">
                {likedContent.map((item) => (
                  <Card key={item.id} className="mb-4">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <img 
                          src={`https://ui-avatars.com/api/?name=${item.user.name}`} 
                          alt={item.user.name} 
                          className="w-5 h-5 rounded-full"
                        />
                        <span>{item.user.name}</span>
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {item.timestamp}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      {item.type === 'comment' ? (
                        <div>
                          <p className="text-sm mb-1">{item.content}</p>
                          <p className="text-xs text-muted-foreground">on post: {item.postTitle}</p>
                        </div>
                      ) : (
                        <div>
                          <img 
                            src={item.imageUrl} 
                            alt={item.description} 
                            className="w-full h-48 object-cover rounded-md mb-2"
                          />
                          <p className="text-sm">{item.description}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Likes;
