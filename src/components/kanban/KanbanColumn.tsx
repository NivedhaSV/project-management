"use client";

import type { Task, TaskStatus } from '@/lib/types';
import { TaskCard } from '@/components/tasks/TaskCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  // onAddTask: (status: TaskStatus) => void; // For opening create task dialog with pre-filled status
}

const columnTitles: Record<TaskStatus, string> = {
  todo: "To Do",
  inprogress: "In Progress",
  review: "In Review",
  done: "Done"
};

export function KanbanColumn({ status, tasks }: KanbanColumnProps) {
  const title = columnTitles[status];
  
  return (
    <Card className="w-[300px] flex-shrink-0 h-full flex flex-col bg-muted/50 shadow-sm">
      <CardHeader className="p-4 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">{title} ({tasks.length})</CardTitle>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => console.log(`Add task to ${status}`)}>
            <PlusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </CardHeader>
      <ScrollArea className="flex-grow">
        <CardContent className="p-3 space-y-3 min-h-[100px]"> {/* Min height ensures drop zone visibility */}
          {tasks.length === 0 && (
            <div className="text-center py-4">
              <p className="text-xs text-muted-foreground">No tasks here yet.</p>
            </div>
          )}
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
