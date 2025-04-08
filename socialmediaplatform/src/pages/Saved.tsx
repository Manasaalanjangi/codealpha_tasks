
import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { Post, PostProps } from '@/components/home/Post';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bookmark, MessageCircle } from 'lucide-react';

// Sample saved posts data
const savedPosts: PostProps[] = [
  {
    id: '201',
    user: {
      id: '105',
      name: 'Sophia Davis',
      username: 'sophiadavis',
      avatar: '',
      verified: true,
    },
    content: 'Just finished reading this incredible book about sustainable architecture. The ideas presented could revolutionize how we design buildings in urban environments. #sustainability #architecture #design',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
    createdAt: '3d ago',
    likes: 189,
    comments: 27,
    shares: 14,
    hasBookmarked: true,
  },
  {
    id: '202',
    user: {
      id: '107',
      name: 'Olivia Martinez',
      username: 'oliviamartinez',
      avatar: '',
      verified: true,
    },
    content: 'Visited the new art exhibition downtown yesterday. The sculptures were incredible! If you\'re in town this month, I highly recommend checking it out.',
    image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249',
    createdAt: '2d ago',
    likes: 103,
    comments: 18,
    shares: 9,
    hasBookmarked: true,
  },
  {
    id: '203',
    user: {
      id: '109',
      name: 'James Wilson',
      username: 'jameswilson',
      avatar: '',
    },
    content: 'Just discovered this amazing productivity technique that has doubled my efficiency. It involves breaking down work into 25-minute focused sessions with short breaks in between. Game changer! #productivity #timemanagement',
    createdAt: '5d ago',
    likes: 76,
    comments: 31,
    shares: 22,
    hasBookmarked: true,
  },
];

// Sample saved collections (folders with saved content)
const savedCollections = [
  {
    id: '301',
    name: 'Web Development Resources',
    description: 'Helpful articles and tutorials for web development',
    count: 12,
    preview: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'
  },
  {
    id: '302',
    name: 'Recipe Ideas',
    description: 'Food inspiration for weeknight dinners',
    count: 8,
    preview: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f'
  },
  {
    id: '303',
    name: 'Travel Destinations',
    description: 'Places to visit on future trips',
    count: 15,
    preview: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828'
  }
];

const Saved = () => {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container px-0 mx-auto flex">
        <Sidebar />
        <main className="flex-1 min-h-screen border-x px-4 sm:px-6">
          <div className="py-6">
            <div className="flex items-center mb-6">
              <Bookmark className="h-7 w-7 text-primary mr-3" />
              <h1 className="text-2xl font-bold">Saved Items</h1>
            </div>
            
            <Tabs defaultValue="posts" onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="posts" className="flex gap-2 items-center">
                  <Bookmark className="h-4 w-4" />
                  <span>Saved Posts</span>
                </TabsTrigger>
                <TabsTrigger value="collections" className="flex gap-2 items-center">
                  <MessageCircle className="h-4 w-4" />
                  <span>Collections</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="posts" className="space-y-4">
                <div className="space-y-4">
                  {savedPosts.map((post) => (
                    <Post key={post.id} {...post} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="collections" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedCollections.map((collection) => (
                    <Card key={collection.id} className="mb-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="w-full h-36 overflow-hidden">
                        <img 
                          src={collection.preview} 
                          alt={collection.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-lg">{collection.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {collection.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">{collection.count} saved items</p>
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

export default Saved;
