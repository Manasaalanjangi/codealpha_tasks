
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { TaskCard } from "@/components/TaskCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Plus, 
  Users,
  Calendar,
  Settings,
  ListTodo
} from "lucide-react";
import { format } from "date-fns";
import { Task } from "@/types";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects, selectTask, addTask } = useAppContext();
  const [activeTab, setActiveTab] = useState("board");
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("todo");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Find the current project
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Button variant="outline" onClick={() => navigate('/')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  const handleTaskClick = (taskId: string) => {
    const task = project.tasks.find(t => t.id === taskId);
    if (task) {
      selectTask(task);
      navigate(`/projects/${projectId}/tasks/${taskId}`);
    }
  };

  const handleCreateTask = () => {
    setIsNewTaskDialogOpen(true);
  };
  
  const handleSubmitNewTask = () => {
    if (!newTaskTitle.trim()) {
      toast.error("Task title is required");
      return;
    }
    
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      description: newTaskDescription,
      status: newTaskStatus as 'todo' | 'in-progress' | 'review' | 'done',
      priority: newTaskPriority as 'low' | 'medium' | 'high',
      assignees: [project.members[0]], // Default to first member for now
      comments: [],
      createdAt: new Date().toISOString(),
      dueDate: selectedDate ? selectedDate.toISOString() : undefined
    };
    
    addTask(projectId, newTask);
    toast.success("Task created successfully!");
    
    // Reset form fields
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskStatus("todo");
    setNewTaskPriority("medium");
    setIsNewTaskDialogOpen(false);
  };

  const groupedTasks: Record<string, Task[]> = {
    "todo": [],
    "in-progress": [],
    "review": [],
    "done": []
  };
  
  project.tasks.forEach(task => {
    if (groupedTasks[task.status]) {
      groupedTasks[task.status].push(task);
    }
  });

  // Function to get tasks due on a specific day for the calendar view
  const getTasksForDate = (date: Date) => {
    return project.tasks.filter(task => {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate);
      return (
        dueDate.getDate() === date.getDate() &&
        dueDate.getMonth() === date.getMonth() &&
        dueDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Group tasks by date for calendar view
  const tasksByDate = new Map<string, Task[]>();
  
  project.tasks.forEach(task => {
    if (task.dueDate) {
      const dateString = format(new Date(task.dueDate), 'yyyy-MM-dd');
      const tasks = tasksByDate.get(dateString) || [];
      tasks.push(task);
      tasksByDate.set(dateString, tasks);
    }
  });

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Button variant="ghost" className="mb-2" onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="text-muted-foreground mt-1">{project.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" /> 
              Team
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {project.members.map(member => (
                <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {project.members.length} team members
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Created {format(new Date(project.createdAt), "MMMM d, yyyy")}</span>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="board" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="board">Board</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          
          <Button onClick={handleCreateTask}>
            <Plus className="h-4 w-4 mr-2" /> New Task
          </Button>
        </div>
        
        <TabsContent value="board" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(groupedTasks).map(([status, tasks]) => (
              <div key={status} className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium capitalize">{status.replace('-', ' ')}</h3>
                  <span className="text-muted-foreground text-sm">{tasks.length}</span>
                </div>
                
                <div className="space-y-3">
                  {tasks.map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onClick={() => handleTaskClick(task.id)}
                    />
                  ))}
                  
                  {tasks.length === 0 && (
                    <div className="h-24 border border-dashed rounded-lg flex items-center justify-center text-muted-foreground">
                      No tasks
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="list">
          <div className="bg-card rounded-lg border p-4">
            <div className="space-y-4">
              {project.tasks.length > 0 ? (
                project.tasks.map(task => (
                  <div key={task.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          task.priority === 'high' ? 'bg-red-500' : 
                          task.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                        }`}></div>
                        <h3 className="font-medium">{task.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-secondary">
                          {task.status.replace('-', ' ')}
                        </span>
                        <Button variant="ghost" size="sm" onClick={() => handleTaskClick(task.id)}>
                          View
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{task.description}</p>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex -space-x-2">
                        {task.assignees.map(assignee => (
                          <Avatar key={assignee.id} className="h-6 w-6 border-2 border-background">
                            <AvatarImage src={assignee.avatar} alt={assignee.name} />
                            <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {task.dueDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Due {format(new Date(task.dueDate), "MMM d")}
                          </span>
                        )}
                        {task.comments.length > 0 && (
                          <span>{task.comments.length} comments</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No tasks in this project yet
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="calendar">
          <div className="bg-card rounded-lg border p-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="border rounded-md p-3"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="font-medium mb-3">
                  Tasks for {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Selected Date"}
                </h3>
                <div className="space-y-3">
                  {selectedDate && getTasksForDate(selectedDate).length > 0 ? (
                    getTasksForDate(selectedDate).map(task => (
                      <div 
                        key={task.id} 
                        className="p-3 border rounded-lg cursor-pointer hover:bg-secondary/20"
                        onClick={() => handleTaskClick(task.id)}
                      >
                        <div className="flex justify-between">
                          <span className="font-medium">{task.title}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            task.priority === 'high' ? 'bg-red-100 text-red-700' : 
                            task.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 
                            'bg-green-100 text-green-700'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {task.description}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-4 text-muted-foreground border border-dashed rounded-lg">
                      No tasks scheduled for this date
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* New Task Dialog */}
      <Dialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input 
                placeholder="Task title" 
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                placeholder="Task description"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={newTaskStatus} onValueChange={setNewTaskStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select value={newTaskPriority} onValueChange={setNewTaskPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date</label>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="border rounded-md p-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewTaskDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitNewTask}>Create Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectDetail;
