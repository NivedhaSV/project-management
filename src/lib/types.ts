export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export type ProjectRole = 'admin' | 'member' | 'viewer';

export interface ProjectMember {
  userId: string;
  role: ProjectRole;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  members?: ProjectMember[];
}

export type TaskStatus = 'todo' | 'inprogress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  projectId: string;
  userStoryId?: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  reporterId: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
}

export interface UserStory {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: 'todo' | 'inprogress' | 'done';
  priority: TaskPriority;
  reporterId: string;
  assigneeId?: string;
  createdAt: string;
  updatedAt: string;
  tasks?: Task[];
}

export type BugStatus = 'open' | 'inprogress' | 'resolved' | 'closed';
export type BugSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface Bug {
  id: string;
  projectId: string;
  taskId?: string;
  userStoryId?: string;
  title: string;
  description: string;
  status: BugStatus;
  severity: BugSeverity;
  reporterId: string;
  assigneeId?: string;
  createdAt: string;
  updatedAt: string;
}
