import type { Project, Task, UserStory, Bug, User } from '@/lib/types';

export const mockUsers: User[] = [
  { id: '1', name: 'Alice Wonderland', email: 'alice@example.com', avatarUrl: 'https://placehold.co/100x100.png?text=AW' },
  { id: '2', name: 'Bob The Builder', email: 'bob@example.com', avatarUrl: 'https://placehold.co/100x100.png?text=BB' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', avatarUrl: 'https://placehold.co/100x100.png?text=CB' },
];

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'TaskFlow UI Overhaul',
    description: 'Complete redesign of the TaskFlow application interface for enhanced user experience.',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    ownerId: '1',
  },
  {
    id: 'proj-2',
    name: 'Mobile App Development',
    description: 'Develop native mobile applications for iOS and Android platforms.',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    ownerId: '2',
  },
  {
    id: 'proj-3',
    name: 'API Integration for Partners',
    description: 'Build and document a new API for third-party integrations.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    ownerId: '1',
  },
];

export const mockUserStories: UserStory[] = [
  {
    id: 'us-1',
    projectId: 'proj-1',
    title: 'As a user, I want a modern dashboard so I can quickly see my tasks.',
    description: 'The dashboard should show pending tasks, project progress, and recent activity.',
    status: 'inprogress',
    priority: 'high',
    reporterId: '1',
    assigneeId: '2',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'us-2',
    projectId: 'proj-1',
    title: 'As a project manager, I want to easily create new projects.',
    description: 'The project creation flow should be intuitive and quick.',
    status: 'todo',
    priority: 'medium',
    reporterId: '1',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  }
];


export const mockTasks: Task[] = [
  {
    id: 'task-1',
    projectId: 'proj-1',
    userStoryId: 'us-1',
    title: 'Design dashboard layout',
    description: 'Create wireframes and mockups for the new dashboard.',
    status: 'done',
    priority: 'high',
    assigneeId: '2',
    reporterId: '1',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'task-2',
    projectId: 'proj-1',
    userStoryId: 'us-1',
    title: 'Implement dashboard components',
    description: 'Code the React components for the dashboard.',
    status: 'inprogress',
    priority: 'high',
    assigneeId: '3',
    reporterId: '1',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'task-3',
    projectId: 'proj-1',
    title: 'Setup project creation form',
    status: 'todo',
    priority: 'medium',
    reporterId: '1',
    assigneeId: '2',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'task-4',
    projectId: 'proj-2',
    title: 'Define iOS app architecture',
    status: 'todo',
    priority: 'high',
    reporterId: '2',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockBugs: Bug[] = [
  {
    id: 'bug-1',
    projectId: 'proj-1',
    taskId: 'task-2',
    title: 'Dashboard widgets overlap on small screens',
    description: 'When viewing the dashboard on a screen width less than 768px, the widgets overlap.',
    status: 'open',
    severity: 'medium',
    reporterId: '3',
    assigneeId: '2',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
