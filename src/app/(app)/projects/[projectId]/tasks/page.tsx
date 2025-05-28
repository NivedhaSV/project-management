"use client";

import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { TaskCard } from '@/components/tasks/TaskCard';
import type { Task } from '@/lib/types';
import { mockTasks, mockProjects } from '@/data/mockData';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react'; // Import useState and useEffect
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

interface ProjectTasksPageProps {
  params: { projectId: string };
}

export default function ProjectTasksPage({ params }: ProjectTasksPageProps) {
  const project = mockProjects.find(p => p.id === params.projectId);
  const [tasks, setTasks] = useState<Task[]>([]); // Initialize state for tasks

  useEffect(() => {
    // Simulate fetching tasks for the project
    const projectTasks = mockTasks.filter(task => task.projectId === params.projectId);
    setTasks(projectTasks);
  }, [params.projectId]); // Rerun effect if projectId changes

  if (!project) {
    notFound();
  }

  return (
    <div>
      {/* <PageHeader title="Project Tasks" description={`All tasks for project: ${project.name}`} actions={
        <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Task</Button>
      } /> */}
      
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
                  <TableCell><Badge variant="outline" className="capitalize">{task.status}</Badge></TableCell>
                  <TableCell><Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'secondary' : 'outline'} className="capitalize">{task.priority}</Badge></TableCell>
                  <TableCell>{task.dueDate ? format(new Date(task.dueDate), 'MMM d, yyyy') : 'N/A'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button> {/* Placeholder */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        </Card>
      )}
    </div>
  );
}
