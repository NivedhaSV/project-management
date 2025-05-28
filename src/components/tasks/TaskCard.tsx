import type { Task } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUsers } from '@/data/mockData'; // For assignee lookup
import { GripVertical, CalendarIcon, MessageSquare } from 'lucide-react';
import { formatDistanceToNowStrict, format } from 'date-fns';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const assignee = mockUsers.find(u => u.id === task.assigneeId);
  const priorityColors: Record<Task['priority'], string> = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };

  return (
    <Card className="mb-3 shadow-sm hover:shadow-md transition-shadow duration-150 bg-card cursor-grab active:cursor-grabbing">
      <CardHeader className="p-3 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-medium leading-tight">{task.title}</CardTitle>
          {/* <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" /> */}
        </div>
        {task.description && (
          <CardDescription className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {task.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-3 pt-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`} title={`Priority: ${task.priority}`} />
            <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'secondary' : 'outline'} className="capitalize text-xs px-1.5 py-0.5">{task.priority}</Badge>
          </div>
          {task.dueDate && (
            <div className="flex items-center" title={`Due: ${format(new Date(task.dueDate), 'MMM d, yyyy')}`}>
              <CalendarIcon className="h-3.5 w-3.5 mr-1" />
              <span>{formatDistanceToNowStrict(new Date(task.dueDate), { addSuffix: true })}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-2 border-t flex items-center justify-between">
        <div className="flex items-center -space-x-1">
          {/* Placeholder for comments/attachments icons */}
          {/* <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" /> */}
        </div>
        {assignee && (
          <Avatar className="h-6 w-6" title={`Assigned to: ${assignee.name}`}>
            <AvatarImage src={assignee.avatarUrl} alt={assignee.name} data-ai-hint="user avatar small" />
            <AvatarFallback className="text-xs">{assignee.name.substring(0,1)}</AvatarFallback>
          </Avatar>
        )}
        {!assignee && <div className="h-6 w-6 rounded-full bg-muted border flex items-center justify-center text-xs text-muted-foreground" title="Unassigned">?</div>}
      </CardFooter>
    </Card>
  );
}
