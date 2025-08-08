import * as z from "zod";

export const TeamSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long.")
    .max(100, "Name cannot exceed 100 characters."),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters.")
    .optional(),
  type: z.enum(["development", "design", "product", "qa", "operations"], {
    required_error: "Team type is required.",
  }),
  leadId: z
    .string({
      required_error: "Team lead is required.",
    }),
});

export const ClientSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  description: z.string().max(500, "Description cannot exceed 500 characters.").optional(),
  email: z.string().email("Invalid email address."),
  website: z.string().url("Invalid website URL.").optional(),
  industry: z.string().max(100, "Industry cannot exceed 100 characters.").optional(),
});

export const ProjectSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  description: z.string().max(500, "Description cannot exceed 500 characters.").optional(),
  status: z.enum(["active", "inactive"], {
    required_error: "Status is required.",
  }),
  clientId: z.string({
    required_error: "Client is required.",
  }),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Invalid email format."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(100, "Password cannot exceed 100 characters.")
});

export const SignupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const SprintSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  description: z.string().max(500, "Description cannot exceed 500 characters.").optional(),
});

export const TaskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long.")
    .max(100, "Title cannot exceed 100 characters."),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters.")
    .optional(),
  status: z.enum(["todo", "inprogress", "review", "done"], {
    required_error: "Status is required.",
  }),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Priority is required.",
  }),
  dueDate: z
    .string()
    .refine((date) => {
      try {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
      } catch {
        return false;
      }
    }, "Invalid date format")
    .refine((date) => new Date(date) > new Date(), "Due date must be in the future")
    .optional(),
  storyPoints: z
    .number()
    .min(1, "Story points must be at least 1")
    .max(13, "Story points cannot exceed 13")
    .optional(),
  projectId: z.string().optional(), // Made optional since we'll add it in onSubmit
  userStoryId: z.string().optional(), // Made optional for Kanban view
  sprintId: z.string().optional(), // Made optional for Kanban view
  assigneeId: z.string().optional(),
});