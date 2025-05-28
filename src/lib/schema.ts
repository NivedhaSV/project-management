import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }), // Min 1 for presence
});

export const SignupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export const ProjectSchema = z.object({
  name: z.string().min(3, { message: "Project name must be at least 3 characters." }).max(50),
  description: z.string().max(200).optional(),
});

export const UserStorySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(100),
  description: z.string().max(500).optional(),
  priority: z.enum(['low', 'medium', 'high'], { message: "Invalid priority level."}),
});

export const TaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['todo', 'inprogress', 'review', 'done'], { message: "Invalid status."}),
  priority: z.enum(['low', 'medium', 'high'], { message: "Invalid priority level."}),
});

export const BugSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(100),
  description: z.string().min(10, "Description must be at least 10 characters.").max(1000),
  severity: z.enum(['critical', 'high', 'medium', 'low'], { message: "Invalid severity level."}),
  status: z.enum(['open', 'inprogress', 'resolved', 'closed'], { message: "Invalid status."}),
});
