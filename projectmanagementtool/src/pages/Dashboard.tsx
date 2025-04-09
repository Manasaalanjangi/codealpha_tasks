
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { ProjectCard } from "@/components/ProjectCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const { projects, selectProject } = useAppContext();
  const navigate = useNavigate();

  const handleProjectClick = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      selectProject(project);
      navigate(`/projects/${projectId}`);
    }
  };

  const handleCreateProject = () => {
    // In a real app, this would open a form to create a new project
    toast.info("Project creation would open here in a real app");
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={handleCreateProject}>
          <Plus className="h-4 w-4 mr-2" /> New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Projects</h2>
            <Button variant="link" onClick={() => navigate('/projects')}>
              View all
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.slice(0, 4).map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => handleProjectClick(project.id)}
              />
            ))}
          </div>
        </div>
        
        <div className="bg-card rounded-lg border p-4">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
