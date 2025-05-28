"use client";

import { use, useState, useEffect } from 'react';
import { KanbanColumn } from '@/components/kanban/KanbanColumn';
import type { Task, TaskStatus } from '@/lib/types';
import { mockTasks, mockProjects } from '@/data/mockData';
import { notFound } from 'next/navigation';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface KanbanPageProps {
  params: Promise<{ projectId: string }>;
}

const taskStatuses: TaskStatus[] = ['todo', 'inprogress', 'review', 'done'];

export default function KanbanPage({ params }: KanbanPageProps) {
  const { projectId } = use(params);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const project = mockProjects.find(p => p.id === projectId);

  if (!project) {
    notFound();
  }

  useEffect(() => {
    // Simulate loading project tasks
    setTimeout(() => {
      const projectTasks = mockTasks.filter(task => task.projectId === projectId);
      setTasks(projectTasks);
      setIsLoading(false);
    }, 500);
  }, [projectId]);

  const handleTaskMove = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading kanban board...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <ScrollArea className="w-full">
        <div className="flex gap-6 p-6 min-h-[calc(100vh-200px)]">
          {taskStatuses.map((status) => {
            const statusTasks = tasks.filter(task => task.status === status);
            return (
              <KanbanColumn
                key={status}
                status={status}
                tasks={statusTasks}
                onTaskMove={handleTaskMove}
              />
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
