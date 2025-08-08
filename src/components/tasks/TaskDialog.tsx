"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema } from "@/lib/schema";
import { useToast } from "@/components/ui/use-toast";
import { Edit, PlusCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface TaskDialogProps {
  mode: "create" | "edit";
  projectId: string;
  userStoryId?: string;
  sprintId?: string;
  task?: any;
  defaultValues?: any;
  onTaskCreated?: (task: any) => void;
  onTaskUpdated?: (task: any) => void;
  trigger: React.ReactNode;
}

export function TaskDialog({
  mode,
  projectId,
  userStoryId,
  sprintId,
  task,
  defaultValues,
  onTaskCreated,
  onTaskUpdated,
  trigger,
}: TaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(TaskSchema),
    defaultValues: task || {
      title: "",
      description: "",
      status: defaultValues?.status || "todo",
      priority: "medium",
      storyPoints: 1,
      dueDate: format(new Date(Date.now() + 86400000), "yyyy-MM-dd'T'HH:mm:ss"),
      ...defaultValues,
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedTask = mode === "edit"
        ? {
            ...task,
            ...data,
            updatedAt: new Date().toISOString(),
          }
        : {
            id: `task-${Date.now()}`,
            ...data,
            projectId,
            userStoryId: userStoryId || undefined,
            sprintId: sprintId || undefined,
            reporterId: "1", // Mock user ID
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

      if (mode === "edit") {
        onTaskUpdated?.(updatedTask);
      } else {
        onTaskCreated?.(updatedTask);
      }

      setOpen(false);
      toast({
        title: mode === "edit" ? "Task Updated" : "Task Created",
        description: mode === "edit" ? "Task has been updated successfully." : "Task has been created successfully.",
      });
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast({
        title: "Error",
        description: "Failed to save task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      reset();
      setError(null);
    }
  };

  const handleStatusChange = (value: string) => {
    setValue("status", value);
  };

  const handlePriorityChange = (value: string) => {
    setValue("priority", value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Edit Task" : "Create Task"}</DialogTitle>
          <DialogDescription>
            {mode === "edit" ? "Update the task details below." : "Fill in the task details below."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Enter task title"
              aria-invalid={!!errors.title}
            />
            {errors.title && (
              <p className="text-sm font-medium text-destructive">{errors.title.message?.toString()}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Enter task description"
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <p className="text-sm font-medium text-destructive">{errors.description.message?.toString()}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              defaultValue={defaultValues?.status || task?.status || "todo"}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm font-medium text-destructive">{errors.status.message?.toString()}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              defaultValue={task?.priority || "medium"}
              onValueChange={handlePriorityChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            {errors.priority && (
              <p className="text-sm font-medium text-destructive">{errors.priority.message?.toString()}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="datetime-local"
              step="1"
              {...register("dueDate")}
              aria-invalid={!!errors.dueDate}
            />
            {errors.dueDate && (
              <p className="text-sm font-medium text-destructive">{errors.dueDate.message?.toString()}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="storyPoints">Story Points</Label>
            <Input
              id="storyPoints"
              type="number"
              min="1"
              max="13"
              {...register("storyPoints", { valueAsNumber: true })}
              aria-invalid={!!errors.storyPoints}
            />
            {errors.storyPoints && (
              <p className="text-sm font-medium text-destructive">{errors.storyPoints.message?.toString()}</p>
            )}
          </div>

          {error && <p className="text-sm font-medium text-destructive">{error}</p>}

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === "edit" ? "Saving..." : "Creating..."}
                </>
              ) : mode === "edit" ? (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Task
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}