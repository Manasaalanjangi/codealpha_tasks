
import { User } from '@/services/authService';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageCircle, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface ProfileItemProps {
  user: User;
  showMessageButton?: boolean;
}

export function ProfileItem({ user, showMessageButton = true }: ProfileItemProps) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/profile/${user.username}`);
  };

  const handleMessageClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering profile click
    navigate(`/messages?user=${user.id}`);
  };

  return (
    <div 
      className="p-4 border-b flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={handleProfileClick}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 border">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{user.name}</p>
            {user.verified && (
              <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                Verified
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
          {user.bio && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{user.bio}</p>
          )}
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={handleProfileClick}>
          <UserIcon className="h-4 w-4 mr-2" />
          Profile
        </Button>
        
        {showMessageButton && (
          <Button size="sm" variant="default" onClick={handleMessageClick}>
            <MessageCircle className="h-4 w-4 mr-2" />
            Message
          </Button>
        )}
      </div>
    </div>
  );
}
