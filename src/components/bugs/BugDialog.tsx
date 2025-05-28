"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Combobox } from '@/components/ui/combobox';
import { PlusCircle, Edit, Link } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Bug } from '@/lib/types';
import { mockUsers, mockTasks } from '@/data/mockData';

const bugFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description must be less than 1000 characters'),
  status: z.enum(['open', 'inprogress', 'resolved', 'closed']).optional(),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  assigneeId: z.string().optional(),
  taskId: z.string().optional(),
});

type BugFormValues = z.infer<typeof bugFormSchema>;

interface BugDialogProps {
  mode: 'create' | 'edit';
  projectId?: string;
  bug?: Bug;
  onBugCreated?: (bug: Bug) => void;
  onBugUpdated?: (bug: Bug) => void;
  trigger?: React.ReactNode;
}

export function BugDialog({ 
  mode, 
  projectId, 
  bug, 
  onBugCreated, 
  onBugUpdated, 
  trigger 
}: BugDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = mode === 'edit';
  const isCreateMode = mode === 'create';

  // Get tasks for the current project
  const projectTasks = mockTasks.filter(task => task.projectId === (projectId || bug?.projectId));
  const taskOptions = [
    { value: 'none', label: 'No associated task' },
    ...projectTasks.map(task => ({
      value: task.id,
      label: task.title
    }))
  ];

  const form = useForm<BugFormValues>({
    resolver: zodResolver(bugFormSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'open',
      severity: 'medium',
      assigneeId: 'unassigned',
      taskId: 'none',
    },
  });

  // Reset form when dialog opens or bug changes
  useEffect(() => {
    if (open) {
      if (bug && isEditMode) {
        form.reset({
          title: bug.title,
          description: bug.description,
          status: bug.status,
          severity: bug.severity,
          assigneeId: bug.assigneeId || 'unassigned',
          taskId: bug.taskId || 'none',
        });
      } else if (isCreateMode) {
        form.reset({
          title: '',
          description: '',
          status: 'open',
          severity: 'medium',
          assigneeId: 'unassigned',
          taskId: 'none',
        });
      }
    }
  }, [open, bug, isEditMode, isCreateMode, form]);

  const onSubmit = async (values: BugFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isCreateMode) {
        const newBug: Bug = {
          id: `bug-${Date.now()}`,
          projectId: projectId!,
          title: values.title,
          description: values.description,
          status: 'open',
          severity: values.severity,
          reporterId: '1', // Current user ID (mock)
          assigneeId: values.assigneeId === 'unassigned' ? undefined : values.assigneeId,
          taskId: values.taskId === 'none' ? undefined : values.taskId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        onBugCreated?.(newBug);
      } else if (bug) {
        const updatedBug: Bug = {
          ...bug,
          title: values.title,
          description: values.description,
          status: values.status!,
          severity: values.severity,
          assigneeId: values.assigneeId === 'unassigned' ? undefined : values.assigneeId,
          taskId: values.taskId === 'none' ? undefined : values.taskId,
          updatedAt: new Date().toISOString(),
        };
        
        onBugUpdated?.(updatedBug);
      }
      
      setOpen(false);
    } catch (error) {
      console.error('Error submitting bug:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDialogTitle = () => {
    return isCreateMode ? 'Report Bug' : 'Update Bug';
  };

  const getDialogDescription = () => {
    return isCreateMode 
      ? 'Report a bug to help improve the project quality.' 
      : 'Update the bug details and status.';
  };

  const getSubmitButtonText = () => {
    if (isSubmitting) {
      return isCreateMode ? 'Creating...' : 'Updating...';
    }
    return isCreateMode ? 'Create Bug' : 'Update Bug';
  };

  const getDefaultTrigger = () => {
    if (isCreateMode) {
      return (
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Report Bug
        </Button>
      );
    } else {
      return (
        <Button variant="outline" size="sm">
          <Edit className="mr-1 h-3 w-3" />
          Edit
        </Button>
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || getDefaultTrigger()}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>
            {getDialogDescription()}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief description of the bug..." {...field} />
                  </FormControl>
                  <FormDescription>
                    A clear, concise title for the bug.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the bug in detail..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Provide detailed information about the bug, including steps to reproduce.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="taskId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Link className="h-4 w-4" />
                    Associated Task (Optional)
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a task..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {taskOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Link this bug to a specific task if it's related to task functionality.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {isEditMode && (
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="inprogress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Current status of the bug.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="severity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Severity</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How severe is this bug?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="assigneeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign To {isCreateMode && '(Optional)'}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {mockUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Who should work on this bug?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {getSubmitButtonText()}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 