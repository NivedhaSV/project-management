"use client";

import { PageHeader } from '@/components/shared/PageHeader';
import { TaskCard } from '@/components/tasks/TaskCard';
import type { Task } from '@/lib/types';
import { mockTasks, mockUsers } from '@/data/mockData';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { ListChecks } from 'lucide-react';

export default function MyTasksPage() {
  const { user } = useAuth();
  const [myTasks, setMyTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (user) {
      // Simulate fetching tasks assigned to the current user
      const userTasks = mockTasks.filter(task => task.assigneeId === user.id);
      setMyTasks(userTasks);
    }
  }, [user]);

  return (
    <div className="container mx-auto py-2 sm:py-8">
      <PageHeader
        title="My Tasks"
        description="All tasks currently assigned to you across all projects."
      />
      
      {myTasks.length === 0 ? (
        <div className="text-center py-10">
          <ListChecks className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium text-foreground">No tasks assigned</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            You're all clear! Or, new tasks might be coming your way soon.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {myTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
