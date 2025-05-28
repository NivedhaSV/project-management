"use client";

import { use, useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { TaskCard } from '@/components/tasks/TaskCard';
import type { Task } from '@/lib/types';
import { mockTasks, mockProjects } from '@/data/mockData';
import { notFound } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientOnly } from '@/components/shared/ClientOnly';

interface ProjectTasksPageProps {
  params: Promise<{ projectId: string }>;
}

export default function ProjectTasksPage({ params }: ProjectTasksPageProps) {
  const { projectId } = use(params);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [mounted, setMounted] = useState(false);

  const project = mockProjects.find(p => p.id === projectId);

  useEffect(() => {
    setMounted(true);
    // Simulate fetching tasks for the project
    const projectTasks = mockTasks.filter(task => task.projectId === projectId);
    setTasks(projectTasks);
  }, [projectId]);

  if (!project) {
    notFound();
  }

  // Format date only on client side to prevent hydration mismatch
  const formatDate = (dateString: string) => {
    if (!mounted) return 'Loading...';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch {
      return 'N/A';
    }
  };

  return (
    <div>
      <PageHeader 
        title="Project Tasks" 
        description={`All tasks for project: ${project.name}`} 
        actions={
          <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Task</Button>
        } 
      />
      
      <ClientOnly fallback={
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-pulse">Loading tasks...</div>
        </div>
      }>
        {tasks.length === 0 ? (
          <p className="text-muted-foreground">No tasks found for this project.</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>All Tasks</CardTitle>
              <CardDescription>
                A comprehensive list of all tasks associated with this project.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            task.priority === 'high' ? 'destructive' : 
                            task.priority === 'medium' ? 'secondary' : 'outline'
                          } 
                          className="capitalize"
                        >
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {task.dueDate ? formatDate(task.dueDate) : 'N/A'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </ClientOnly>
    </div>
  );
}
