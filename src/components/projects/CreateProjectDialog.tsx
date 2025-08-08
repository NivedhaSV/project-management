"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { ProjectSchema } from '@/lib/schema';
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
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Edit } from 'lucide-react';
import { useState } from 'react';
import type { Project } from '@/lib/types';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { mockClients } from '@/data/mockData';


type ProjectFormValues = z.infer<typeof ProjectSchema>;

interface ProjectDialogProps {
  mode: 'create' | 'edit';
  project?: Project;
  onProjectCreated?: (newProject: Project) => void;
  onProjectUpdated?: (updatedProject: Project) => void;
  trigger?: React.ReactNode;
}

export function CreateProjectDialog({ 
  mode, 
  project, 
  onProjectCreated, 
  onProjectUpdated,
  trigger 
}: ProjectDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = mode === 'edit';
  const dialogTitle = isEditMode ? 'Edit Project' : 'Create New Project';
  const dialogDescription = isEditMode 
    ? 'Update the project details below.' 
    : 'Fill in the details below to start a new project.';
  const submitButtonText = isEditMode ? 'Save Changes' : 'Create Project';

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: project?.name || '',
      description: project?.description || '',
      status: project?.status || 'active',
      clientId: project?.clientId || '',
    },
  });

  async function onSubmit(data: ProjectFormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      if (isEditMode && project) {
        // Update existing project
        const updatedProject: Project = {
          ...project,
          ...data,
          updatedAt: new Date().toISOString(),
        };
        
        onProjectUpdated?.(updatedProject);
        toast({
          title: "Project Updated",
          description: `Project "${data.name}" has been successfully updated.`,
        });
      } else {
        // Create new project
        const newProject: Project = {
          id: `proj-${Date.now()}`,
          ...data,
          description: data.description || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ownerId: '1', // Mock owner ID
          members: [{ userId: '1', role: 'admin' as const }],
        };
        
        onProjectCreated?.(newProject);
        toast({
          title: "Project Created",
          description: `Project "${data.name}" has been successfully created.`,
        });
      }
      
      form.reset();
      setOpen(false);
    } catch (error) {
      toast({
        title: isEditMode ? "Error Updating Project" : "Error Creating Project",
        description: isEditMode 
          ? "Could not update the project. Please try again."
          : "Could not create the project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const defaultTrigger = isEditMode ? (
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
      <Edit className="h-4 w-4" />
    </Button>
  ) : (
    <Button>
      <PlusCircle className="mr-2 h-4 w-4" /> Create Project
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a client" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockClients.map(client => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Website Redesign" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A brief description of your project."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="stopped">Stopped</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <LoadingSpinner size="sm" className="mr-2" />}
                {submitButtonText}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}