
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { PostsList } from '@/components/home/PostsList';

const Profile = () => {
  // Sample user data
  const user = {
    id: '101',
    name: 'Jane Cooper',
    username: 'janecooper',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93',
    bio: 'Digital product designer and frontend developer. Creating user-centered designs that solve problems.',
    location: 'San Francisco, CA',
    website: 'janecooper.design',
    joinDate: 'August 2023',
    following: 382,
    followers: 1429,
    isOwnProfile: true,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container px-0 mx-auto flex">
        <Sidebar />
        <main className="flex-1 min-h-screen border-x">
          <ProfileHeader user={user} />
          <div className="px-4 sm:px-6">
            <PostsList />
          </div>
        </main>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Profile;
