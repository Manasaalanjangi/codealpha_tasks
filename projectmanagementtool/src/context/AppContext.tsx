
import { createContext, useContext, useState, ReactNode } from 'react';
import { User, Project, Task, Notification, Comment } from '../types';
import { projects as initialProjects, tasks, currentUser, notifications as initialNotifications } from '../data/mockData';

interface AppContextType {
  currentUser: User;
  projects: Project[];
  notifications: Notification[];
  selectedProject: Project | null;
  selectedTask: Task | null;
  animationsEnabled: boolean;
  selectProject: (project: Project) => void;
  selectTask: (task: Task) => void;
  clearSelection: () => void;
  addTask: (projectId: string, task: Task) => void;
  addProject: (project: Project) => void;
  addComment: (projectId: string, taskId: string, comment: Comment) => void;
  toggleAnimations: () => void;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (notificationId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);

  const selectProject = (project: Project) => {
    setSelectedProject(project);
    setSelectedTask(null);
  };

  const selectTask = (task: Task) => {
    setSelectedTask(task);
  };

  const clearSelection = () => {
    setSelectedProject(null);
    setSelectedTask(null);
  };
  
  const addTask = (projectId: string, task: Task) => {
    setProjects(currentProjects => 
      currentProjects.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: [...project.tasks, task]
          };
        }
        return project;
      })
    );
    
    // Add a notification for the new task
    const newNotification = {
      id: `notif-${Date.now()}`,
      type: 'assignment' as const,
      content: `${currentUser.name} created a new task: ${task.title}`,
      read: false,
      createdAt: new Date().toISOString()
    };
    
    setNotifications(current => [newNotification, ...current]);
  };
  
  const addProject = (project: Project) => {
    setProjects(currentProjects => [...currentProjects, project]);
    
    // Add a notification for the new project
    const newNotification = {
      id: `notif-${Date.now()}`,
      type: 'status' as const,
      content: `${currentUser.name} created a new project: ${project.title}`,
      read: false,
      createdAt: new Date().toISOString()
    };
    
    setNotifications(current => [newNotification, ...current]);
  };
  
  const addComment = (projectId: string, taskId: string, comment: Comment) => {
    setProjects(currentProjects => 
      currentProjects.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: project.tasks.map(task => {
              if (task.id === taskId) {
                return {
                  ...task,
                  comments: [...task.comments, comment]
                };
              }
              return task;
            })
          };
        }
        return project;
      })
    );
    
    // Add a notification for the new comment
    const newNotification = {
      id: `notif-${Date.now()}`,
      type: 'comment' as const,
      content: `${comment.author.name} commented on a task`,
      read: false,
      createdAt: new Date().toISOString()
    };
    
    setNotifications(current => [newNotification, ...current]);
  };

  // New functions
  const toggleAnimations = () => {
    setAnimationsEnabled(prev => !prev);
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications(current => 
      current.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(current => 
      current.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(current => 
      current.filter(notification => notification.id !== notificationId)
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        projects,
        notifications,
        selectedProject,
        selectedTask,
        animationsEnabled,
        selectProject,
        selectTask,
        clearSelection,
        addTask,
        addProject,
        addComment,
        toggleAnimations,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
