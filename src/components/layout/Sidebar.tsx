
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Heart, Users, Bookmark, Settings, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InviteFriendsModal } from '@/components/friends/InviteFriendsModal';

const sidebarItems = [
  {
    icon: Home,
    label: 'Home',
    path: '/'
  },
  {
    icon: User,
    label: 'Profile',
    path: '/profile'
  },
  {
    icon: MessageCircle,
    label: 'Messages',
    path: '/messages'
  },
  {
    icon: Users,
    label: 'Friends',
    path: '/friends'
  },
  {
    icon: Heart,
    label: 'Likes',
    path: '/likes'
  },
  {
    icon: Bookmark,
    label: 'Saved',
    path: '/saved'
  },
  {
    icon: Settings,
    label: 'Settings',
    path: '/settings'
  }
];

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  
  return (
    <aside className="hidden lg:flex flex-col border-r bg-background w-64 p-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="mt-6 space-y-1">
        {sidebarItems.map((item) => (
          <Button
            key={item.path}
            variant={currentPath === item.path ? "default" : "ghost"}
            className={`w-full justify-start text-base font-medium ${currentPath === item.path ? "bg-primary" : ""}`}
            asChild
          >
            <Link to={item.path} className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          </Button>
        ))}
      </div>
      
      <div className="mt-auto pt-6">
        <div className="rounded-lg bg-muted p-4">
          <h4 className="font-medium leading-none mb-2">New to SocialWeave?</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Connect with friends and share what matters to you.
          </p>
          <Button className="w-full" onClick={() => setInviteModalOpen(true)}>
            Invite Friends
          </Button>
        </div>
      </div>
      
      <InviteFriendsModal open={inviteModalOpen} onOpenChange={setInviteModalOpen} />
    </aside>
  );
}
