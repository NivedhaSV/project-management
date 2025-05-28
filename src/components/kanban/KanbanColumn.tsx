"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TaskCard } from '@/components/tasks/TaskCard';
import type { Task, TaskStatus } from '@/lib/types';
import { PlusCircle } from 'lucide-react';

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onTaskMove?: (taskId: string, newStatus: TaskStatus) => void;
}

const columnTitles: Record<TaskStatus, string> = {
  todo: "To Do",
  inprogress: "In Progress",
  review: "In Review",
  done: "Done"
};

const columnColors: Record<TaskStatus, string> = {
  todo: "border-l-gray-400",
  inprogress: "border-l-blue-400",
  review: "border-l-yellow-400",
  done: "border-l-green-400"
};

export function KanbanColumn({ status, tasks, onTaskMove }: KanbanColumnProps) {
  const title = columnTitles[status];
  const colorClass = columnColors[status];
  
  const handleAddTask = () => {
    console.log(`Add task to ${status}`);
    // TODO: Implement add task functionality
  };

  const handleTaskDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId && onTaskMove) {
      onTaskMove(taskId, status);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <Card 
      className={`w-[300px] flex-shrink-0 h-full flex flex-col bg-muted/50 shadow-sm border-l-4 ${colorClass}`}
      onDrop={handleTaskDrop}
      onDragOver={handleDragOver}
    >
      <CardHeader className="p-4 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            {title} ({tasks.length})
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7" 
            onClick={handleAddTask}
          >
            <PlusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </CardHeader>
      <ScrollArea className="flex-grow">
        <CardContent className="p-3 space-y-3 min-h-[100px]">
          {tasks.length === 0 && (
            <div className="text-center py-8">
              <p className="text-xs text-muted-foreground">No tasks here yet.</p>
              <p className="text-xs text-muted-foreground mt-1">
                Drag tasks here or click + to add new ones.
              </p>
            </div>
          )}
          {tasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', task.id);
              }}
              className="cursor-move"
            >
              <TaskCard task={task} />
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
