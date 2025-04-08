
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { CreatePost } from '@/components/home/CreatePost';
import { PostsList } from '@/components/home/PostsList';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container px-0 mx-auto flex">
        <Sidebar />
        <main className="flex-1 min-h-screen border-x px-4 sm:px-6">
          <div className="py-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Home</h1>
            <CreatePost />
            <PostsList />
          </div>
        </main>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Index;
