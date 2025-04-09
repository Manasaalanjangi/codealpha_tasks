
import { Project } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckSquare } from "lucide-react";
import { format } from "date-fns";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const completedTasks = project.tasks.filter(task => task.status === "done").length;
  const totalTasks = project.tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card 
      className="cursor-pointer hover:border-primary/20 transition-all hover:shadow-md"
      onClick={onClick}
    >
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg">{project.title}</h3>
          <span className="text-xs text-muted-foreground">
            {format(new Date(project.createdAt), "MMM d, yyyy")}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <CheckSquare size={14} />
            <span>{completedTasks}/{totalTasks} tasks</span>
          </div>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full" 
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex -space-x-2">
            {project.members.slice(0, 3).map(member => (
              <Avatar key={member.id} className="h-6 w-6 border-2 border-white">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
            {project.members.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-secondary text-xs flex items-center justify-center border-2 border-white">
                +{project.members.length - 3}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
