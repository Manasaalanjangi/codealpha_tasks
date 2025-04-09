
import { User, Project, Task, Comment, Notification } from "../types";

export const users: User[] = [
  {
    id: "user-1",
    name: "Alex Morgan",
    avatar: "/placeholder.svg",
    email: "alex@example.com",
  },
  {
    id: "user-2",
    name: "Jamie Chen",
    avatar: "/placeholder.svg",
    email: "jamie@example.com",
  },
  {
    id: "user-3",
    name: "Taylor Swift",
    avatar: "/placeholder.svg",
    email: "taylor@example.com",
  },
  {
    id: "user-4",
    name: "Jordan Lee",
    avatar: "/placeholder.svg",
    email: "jordan@example.com",
  },
];

export const currentUser: User = users[0];

export const comments: Comment[] = [
  {
    id: "comment-1",
    content: "Let's finish this by tomorrow. I've made some progress already.",
    author: users[1],
    createdAt: "2023-04-05T14:48:00.000Z",
  },
  {
    id: "comment-2",
    content: "I've updated the design. Check it out when you get a chance.",
    author: users[2],
    createdAt: "2023-04-06T09:32:00.000Z",
  },
  {
    id: "comment-3",
    content: "This is looking great! Just a few minor tweaks needed.",
    author: users[0],
    createdAt: "2023-04-06T15:17:00.000Z",
  },
  {
    id: "comment-4",
    content: "User interface is now looking much better. Great work team!",
    author: users[3],
    createdAt: "2023-04-07T11:23:00.000Z",
  },
  {
    id: "comment-5",
    content: "I've pushed the latest changes to the repository.",
    author: users[1],
    createdAt: "2023-04-07T16:45:00.000Z",
  },
];

export const tasks: Task[] = [
  {
    id: "task-1",
    title: "Design new dashboard layout",
    description: "Create wireframes and mockups for the new dashboard design.",
    status: "done",
    priority: "high",
    assignees: [users[0], users[2]],
    comments: [comments[0], comments[2]],
    dueDate: "2023-04-10T00:00:00.000Z",
    createdAt: "2023-04-01T10:00:00.000Z",
  },
  {
    id: "task-2",
    title: "Implement authentication flow",
    description: "Set up user registration and login functionality with OAuth.",
    status: "done",
    priority: "high",
    assignees: [users[1]],
    comments: [comments[1], comments[4]],
    dueDate: "2023-04-15T00:00:00.000Z",
    createdAt: "2023-04-02T14:30:00.000Z",
  },
  {
    id: "task-3",
    title: "Create API documentation",
    description: "Document all API endpoints, request/response formats, and error codes.",
    status: "todo",
    priority: "medium",
    assignees: [users[3]],
    comments: [],
    dueDate: "2023-04-20T00:00:00.000Z",
    createdAt: "2023-04-03T09:15:00.000Z",
  },
  {
    id: "task-4",
    title: "Fix responsive layout issues",
    description: "Address layout problems on mobile devices and small screens.",
    status: "review",
    priority: "low",
    assignees: [users[2]],
    comments: [],
    dueDate: "2023-04-12T00:00:00.000Z",
    createdAt: "2023-04-04T16:45:00.000Z",
  },
  {
    id: "task-5",
    title: "Optimize database queries",
    description: "Improve query performance for the dashboard and project views.",
    status: "todo",
    priority: "medium",
    assignees: [users[1], users[3]],
    comments: [],
    dueDate: "2023-04-18T00:00:00.000Z",
    createdAt: "2023-04-05T11:20:00.000Z",
  },
  {
    id: "task-6",
    title: "Implement push notifications",
    description: "Add push notification support for mobile devices using Firebase Cloud Messaging.",
    status: "done",
    priority: "high",
    assignees: [users[0], users[1]],
    comments: [comments[3]],
    dueDate: "2023-04-14T00:00:00.000Z",
    createdAt: "2023-04-03T13:25:00.000Z",
  },
  {
    id: "task-7",
    title: "Create onboarding screens",
    description: "Design and implement user onboarding flow for first-time app users.",
    status: "in-progress",
    priority: "medium",
    assignees: [users[2]],
    comments: [],
    dueDate: "2023-04-22T00:00:00.000Z",
    createdAt: "2023-04-05T09:30:00.000Z",
  },
];

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Website Redesign",
    description: "Refresh and modernize the company website with new branding.",
    tasks: [tasks[0], tasks[3]],
    members: [users[0], users[1], users[2]],
    createdAt: "2023-03-15T08:00:00.000Z",
  },
  {
    id: "project-2",
    title: "Mobile App Development",
    description: "Build a cross-platform mobile app for customers.",
    tasks: [tasks[1], tasks[6], tasks[5]],
    members: [users[0], users[1], users[3]],
    createdAt: "2023-03-20T10:30:00.000Z",
  },
  {
    id: "project-3",
    title: "API Integration",
    description: "Connect our services with third-party APIs and partners.",
    tasks: [tasks[2]],
    members: [users[1], users[3]],
    createdAt: "2023-03-25T14:15:00.000Z",
  },
  {
    id: "project-4",
    title: "E-commerce Platform",
    description: "Develop an online shopping experience with secure payment processing.",
    tasks: [tasks[4]],
    members: [users[0], users[3]],
    createdAt: "2023-03-28T09:45:00.000Z",
  },
  {
    id: "project-5",
    title: "Data Analytics Dashboard",
    description: "Create interactive data visualization tools for business insights.",
    tasks: [],
    members: [users[1], users[2]],
    createdAt: "2023-04-01T11:20:00.000Z",
  },
];

export const notifications: Notification[] = [
  {
    id: "notif-1",
    type: "mention",
    content: "Jamie Chen mentioned you in a comment on 'Design new dashboard layout'",
    read: false,
    createdAt: "2023-04-06T10:24:00.000Z",
  },
  {
    id: "notif-2",
    type: "assignment",
    content: "You were assigned to 'Fix responsive layout issues'",
    read: true,
    createdAt: "2023-04-05T15:36:00.000Z",
  },
  {
    id: "notif-3",
    type: "comment",
    content: "Taylor Swift commented on 'Implement authentication flow'",
    read: false,
    createdAt: "2023-04-06T09:45:00.000Z",
  },
  {
    id: "notif-4",
    type: "status",
    content: "Jamie Chen moved 'Design new dashboard layout' to Done",
    read: true,
    createdAt: "2023-04-04T16:12:00.000Z",
  },
  {
    id: "notif-5",
    type: "comment",
    content: "Jordan Lee commented on 'Create API documentation'",
    read: false,
    createdAt: "2023-04-07T14:30:00.000Z",
  },
  {
    id: "notif-6",
    type: "status",
    content: "Taylor Swift created a new project 'Data Analytics Dashboard'",
    read: false,
    createdAt: "2023-04-01T11:25:00.000Z",
  },
];
