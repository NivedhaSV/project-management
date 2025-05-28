"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Calendar, User, AlertTriangle, Clock, Link } from 'lucide-react';
import { format } from 'date-fns';
import type { Bug } from '@/lib/types';
import { mockUsers, mockTasks } from '@/data/mockData';

interface BugDetailsDialogProps {
  bug: Bug;
  trigger?: React.ReactNode;
}

export function BugDetailsDialog({ bug, trigger }: BugDetailsDialogProps) {
  const [open, setOpen] = useState(false);
  
  const reporter = mockUsers.find(u => u.id === bug.reporterId);
  const assignee = bug.assigneeId ? mockUsers.find(u => u.id === bug.assigneeId) : null;
  const associatedTask = bug.taskId ? mockTasks.find(t => t.id === bug.taskId) : null;

  const getSeverityColor = (severity: Bug['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-600 text-white';
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: Bug['status']) => {
    switch (status) {
      case 'open':
        return 'destructive';
      case 'inprogress':
        return 'secondary';
      case 'resolved':
        return 'outline';
      case 'closed':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const defaultTrigger = (
    <Button variant="ghost" size="sm">
      View Details
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-xl">{bug.title}</DialogTitle>
              <DialogDescription>
                Bug ID: {bug.id}
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              <Badge 
                variant={getStatusColor(bug.status)}
                className="capitalize"
              >
                {bug.status}
              </Badge>
              <Badge 
                className={`capitalize ${getSeverityColor(bug.severity)}`}
              >
                {bug.severity}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Description</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {bug.description}
            </p>
          </div>

          {associatedTask && (
            <>
              <Separator />
              <div className="flex items-center gap-3">
                <Link className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Associated Task</p>
                  <div className="mt-1 p-3 bg-muted rounded-md">
                    <p className="text-sm font-medium">{associatedTask.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Status: <span className="capitalize">{associatedTask.status}</span>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          <Separator />

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Reported by</p>
                  <div className="flex items-center gap-2 mt-1">
                    {reporter && (
                      <>
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={reporter.avatarUrl} alt={reporter.name} />
                          <AvatarFallback className="text-xs">
                            {reporter.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{reporter.name}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(bug.createdAt), 'PPP p')}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Assigned to</p>
                  <div className="flex items-center gap-2 mt-1">
                    {assignee ? (
                      <>
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
                          <AvatarFallback className="text-xs">
                            {assignee.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{assignee.name}</span>
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground">Unassigned</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Last updated</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(bug.updatedAt), 'PPP p')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Severity Level</p>
              <p className="text-sm text-muted-foreground capitalize">
                {bug.severity} priority - {
                  bug.severity === 'critical' ? 'Requires immediate attention' :
                  bug.severity === 'high' ? 'Should be resolved soon' :
                  bug.severity === 'medium' ? 'Normal priority' :
                  'Can be addressed when convenient'
                }
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 