
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Home, MessageSquare, Search, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-social-indigo to-social-blue flex items-center justify-center">
              <span className="text-white font-bold text-sm">SW</span>
            </div>
            <span className="hidden font-bold sm:inline-block text-xl">SocialWeave</span>
          </Link>
        </div>
        
        <div className="hidden md:flex max-w-sm flex-1 mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8"
            />
          </div>
        </div>
        
        <nav className="flex items-center gap-1 sm:gap-2">
          <Button asChild variant="ghost" size="icon">
            <Link to="/">
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <Link to="/messages">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <Link to="/notifications">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <Link to="/profile">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                <User className="h-5 w-5" />
              </div>
              <span className="sr-only">Profile</span>
            </Link>
          </Button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "md:hidden fixed inset-x-0 top-16 bg-background border-b z-40 transition-transform duration-200 ease-in-out",
        isMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="container p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button asChild variant="outline" className="justify-start">
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/messages" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Messages</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
