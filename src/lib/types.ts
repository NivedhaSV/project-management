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
  description?: string;
  status: 'active' | 'paused' | 'stopped';
  clientId: string;
  ownerId: string;
  members?: ProjectMember[];
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'todo' | 'inprogress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  userStoryId: string;
  projectId: string;
  sprintId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  reporterId: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  storyPoints?: number;
  tags?: string[];
}

export type UserStoryStatus = 'backlog' | 'todo' | 'inprogress' | 'done';
export type UserStoryPriority = 'low' | 'medium' | 'high' | 'critical';

export interface UserStory {
  id: string;
  projectId: string;
  sprintId: string;
  title: string;
  description?: string;
  acceptanceCriteria?: string[];
  status: UserStoryStatus;
  priority: UserStoryPriority;
  reporterId: string;
  assigneeId?: string;
  createdAt: string;
  updatedAt: string;
  storyPoints?: number;
  businessValue?: number;
  tags?: string[];
  tasks?: Task[];
}

export type SprintStatus = 'planning' | 'active' | 'completed' | 'cancelled';

export interface Sprint {
  id: string;
  clientId: string;
  name: string;
  description?: string;
  status: SprintStatus;
  startDate: string;
  endDate: string;
  goal?: string;
  createdAt: string;
  updatedAt: string;
  capacity?: number;
  velocity?: number;
  userStoryIds: string[];
}

export interface Backlog {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  userStories: UserStory[];
  createdAt: string;
  updatedAt: string;
}

export type BugStatus = 'open' | 'inprogress' | 'resolved' | 'closed';
export type BugSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface Bug {
  id: string;
  projectId: string;
  taskId?: string;
  userStoryId?: string;
  sprintId?: string;
  title: string;
  description: string;
  status: BugStatus;
  severity: BugSeverity;
  reporterId: string;
  assigneeId?: string;
  createdAt: string;
  updatedAt: string;
  stepsToReproduce?: string[];
  expectedBehavior?: string;
  actualBehavior?: string;
}

// Analytics and Reporting Types
export interface SprintMetrics {
  sprintId: string;
  plannedStoryPoints: number;
  completedStoryPoints: number;
  velocity: number;
  burndownData: { date: string; remaining: number }[];
  completionRate: number;
}

export interface ProjectMetrics {
  projectId: string;
  totalUserStories: number;
  completedUserStories: number;
  totalTasks: number;
  completedTasks: number;
  totalBugs: number;
  resolvedBugs: number;
  averageVelocity: number;
  teamProductivity: number;
}

export interface Client {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}