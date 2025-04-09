
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { 
  ArrowLeft, 
  Calendar,
  CheckSquare,
  Flag,
  MoreVertical,
  Plus
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CommentList } from "@/components/CommentList";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Comment } from "@/types";

const TaskDetail = () => {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();
  const { projects, currentUser, addComment } = useAppContext();
  
  const project = projects.find(p => p.id === projectId);
  const task = project?.tasks.find(t => t.id === taskId);
  
  if (!project || !task) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Task not found</h1>
        <Button variant="outline" onClick={() => navigate('/')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  const handleAddComment = (content: string) => {
    if (projectId && taskId) {
      const newComment: Comment = {
        id: `comment-${Date.now()}`,
        content,
        author: currentUser,
        createdAt: new Date().toISOString()
      };
      
      addComment(projectId, taskId, newComment);
      toast.success("Comment added successfully!");
    }
  };

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
    <div className="container py-8">
      <Button variant="ghost" className="mb-4" onClick={() => navigate(`/projects/${projectId}`)}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Project
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div>
            <div className="flex items-start justify-between">
              <h1 className="text-2xl font-bold">{task.title}</h1>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 items-center mt-2">
              <Badge variant="outline" className={statusColors[task.status]}>
                {task.status.replace('-', ' ')}
              </Badge>
              
              <Badge variant="outline" className={priorityColors[task.priority]}>
                {task.priority} priority
              </Badge>
              
              {task.dueDate && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Due {format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{task.description}</p>
          </div>
          
          <Separator />
          
          <CommentList 
            comments={task.comments} 
            currentUser={currentUser}
            onAddComment={handleAddComment}
          />
        </div>
        
        <div className="space-y-6">
          <div className="bg-card rounded-lg border p-4">
            <h3 className="font-medium mb-3">Details</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Assignees</p>
                <div className="flex flex-wrap gap-2">
                  {task.assignees.map(assignee => (
                    <div key={assignee.id} className="flex items-center gap-2 bg-secondary/50 rounded-full py-1 px-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={assignee.avatar} alt={assignee.name} />
                        <AvatarFallback className="text-xs">{assignee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{assignee.name}</span>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="rounded-full h-7">
                    <Plus className="h-3 w-3 mr-1" /> Add
                  </Button>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Button variant="outline" className="w-full justify-start">
                  <div className={`w-2 h-2 rounded-full ${task.status === 'done' ? 'bg-green-500' : 'bg-blue-500'} mr-2`}></div>
                  {task.status.replace('-', ' ')}
                </Button>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Priority</p>
                <Button variant="outline" className="w-full justify-start">
                  <Flag className={`h-4 w-4 mr-2 ${
                    task.priority === 'high' ? 'text-red-500' : 
                    task.priority === 'medium' ? 'text-amber-500' : 'text-green-500'
                  }`} />
                  {task.priority} priority
                </Button>
              </div>
              
              {task.dueDate && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Due Date</p>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    {format(new Date(task.dueDate), 'MMMM d, yyyy')}
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-card rounded-lg border p-4">
            <h3 className="font-medium mb-3">Activity</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <CheckSquare className="h-4 w-4 text-green-500" />
                <div className="text-sm">
                  <p><span className="font-medium">Jamie Chen</span> marked task as in-progress</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CalendarIcon className="h-4 w-4 text-blue-500" />
                <div className="text-sm">
                  <p><span className="font-medium">Alex Morgan</span> updated due date</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

export default TaskDetail;
