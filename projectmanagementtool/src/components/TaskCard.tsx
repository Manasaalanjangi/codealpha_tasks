
import { Task } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const priorityColors = {
    high: "text-red-500 bg-red-50",
    medium: "text-amber-500 bg-amber-50",
    low: "text-green-500 bg-green-50",
  };

  const statusColors = {
    "todo": "text-slate-600 bg-slate-100",
    "in-progress": "text-blue-600 bg-blue-100",
    "review": "text-purple-600 bg-purple-100",
    "done": "text-green-600 bg-green-100",
  };

  return (
    <Card 
      className="cursor-pointer hover:border-primary/20 transition-all hover:shadow-md"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-base">{task.title}</h3>
          <Badge variant="outline" className={statusColors[task.status]}>
            {task.status.replace('-', ' ')}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {task.description}
        </p>
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex -space-x-2">
            {task.assignees.slice(0, 3).map(assignee => (
              <Avatar key={assignee.id} className="h-6 w-6 border-2 border-white">
                <AvatarImage src={assignee.avatar} alt={assignee.name} />
                <AvatarFallback className="text-xs">{assignee.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
            {task.assignees.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-secondary text-xs flex items-center justify-center border-2 border-white">
                +{task.assignees.length - 3}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3 text-muted-foreground">
            {task.comments.length > 0 && (
              <div className="flex items-center gap-1 text-xs">
                <MessageSquare size={12} />
                <span>{task.comments.length}</span>
              </div>
            )}
            
            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs">
                <Calendar size={12} />
                <span>{format(new Date(task.dueDate), 'MMM d')}</span>
              </div>
            )}
            
            <Badge variant="outline" className={`text-xs ${priorityColors[task.priority]}`}>
              {task.priority}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
