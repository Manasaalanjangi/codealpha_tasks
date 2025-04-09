
export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignees: User[];
  comments: Comment[];
  dueDate?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  members: User[];
  createdAt: string;
}

export type NotificationType = 'mention' | 'assignment' | 'comment' | 'status';

export interface Notification {
  id: string;
  type: NotificationType;
  content: string;
  read: boolean;
  createdAt: string;
}
