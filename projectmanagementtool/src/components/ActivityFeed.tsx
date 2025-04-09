
import { notifications } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  UserPlus, 
  AtSign, 
  ArrowRight,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function ActivityFeed() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'comment':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'assignment':
        return <UserPlus className="h-4 w-4 text-green-500" />;
      case 'mention':
        return <AtSign className="h-4 w-4 text-purple-500" />;
      case 'status':
        return <ArrowRight className="h-4 w-4 text-amber-500" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Recent Activity</h3>
      
      {notifications.map(notification => {
        const [userName, action] = extractUserAndAction(notification.content);
        
        return (
          <div key={notification.id} className="flex gap-3 items-start py-3 border-b last:border-0">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              {getIcon(notification.type)}
            </div>
            
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium">{userName}</span>{" "}
                {action}
              </p>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Helper function to extract user and action from notification content
function extractUserAndAction(content: string): [string, string] {
  const matches = content.match(/^([A-Z][a-z]+ [A-Z][a-z]+)(.*)/);
  if (matches && matches.length >= 3) {
    return [matches[1], matches[2]];
  }
  return ["Someone", content];
}
