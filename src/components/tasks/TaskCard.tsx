"use client";

import type { Task } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUsers } from '@/data/mockData'; // For assignee lookup
import { GripVertical, CalendarIcon, MessageSquare } from 'lucide-react';
import { formatDistanceToNowStrict, format } from 'date-fns';
import { useState, useEffect } from 'react';

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

export function TaskCard({ task, isDragging = false }: TaskCardProps) {
  const [mounted, setMounted] = useState(false);
  const assignee = mockUsers.find(u => u.id === task.assigneeId);
  const priorityColors: Record<Task['priority'], string> = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Format date only on client side to prevent hydration mismatch
  const formatDueDate = (dateString: string) => {
    if (!mounted) return '';
    try {
      const date = new Date(dateString);
      return formatDistanceToNowStrict(date, { addSuffix: true });
    } catch {
      return '';
    }
  };

  const formatFullDate = (dateString: string) => {
    if (!mounted) return '';
    try {
      const date = new Date(dateString);
      return format(date, 'MMM d, yyyy');
    } catch {
      return '';
    }
  };

  return (
    <Card 
      className={`mb-3 shadow-sm hover:shadow-md transition-shadow duration-150 bg-card ${
        isDragging ? 'opacity-50 rotate-2' : 'cursor-grab active:cursor-grabbing'
      }`}
    >
      <CardHeader className="p-3 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-medium leading-tight line-clamp-2">
            {task.title}
          </CardTitle>
          {/* <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" /> */}
        </div>
        {task.description && (
          <CardDescription className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {task.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-3 pt-1">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div 
              className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`} 
              title={`Priority: ${task.priority}`} 
            />
            <Badge 
              variant={
                task.priority === 'high' ? 'destructive' : 
                task.priority === 'medium' ? 'secondary' : 'outline'
              } 
              className="capitalize text-xs px-1.5 py-0.5"
            >
              {task.priority}
            </Badge>
          </div>
          {assignee && (
            <Avatar className="h-6 w-6" title={`Assigned to: ${assignee.name}`}>
              <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
              <AvatarFallback className="text-xs">
                {assignee.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
        {task.dueDate && mounted && (
          <div className="flex items-center mt-2 text-xs text-muted-foreground">
            <CalendarIcon className="h-3 w-3 mr-1" />
            <span title={formatFullDate(task.dueDate)}>
              {formatDueDate(task.dueDate)}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-3 pt-2 border-t flex items-center justify-between">
        <div className="flex items-center -space-x-1">
          {/* Placeholder for comments/attachments icons */}
          {/* <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" /> */}
        </div>
        {!assignee && (
          <div className="h-6 w-6 rounded-full bg-muted border flex items-center justify-center text-xs text-muted-foreground" title="Unassigned">
            ?
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
