"use client";

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bug as BugIcon, Calendar, User, Link } from 'lucide-react';
import { format } from 'date-fns';
import type { Bug } from '@/lib/types';
import { mockUsers, mockTasks } from '@/data/mockData';
import { BugDetailsDialog } from './BugDetailsDialog';
import { BugDialog } from './BugDialog';

interface BugListProps {
  bugs: Bug[];
  onBugUpdated?: (updatedBug: Bug) => void;
}

export function BugList({ bugs, onBugUpdated }: BugListProps) {
  const [mounted, setMounted] = useState(false);
  const [bugList, setBugList] = useState<Bug[]>(bugs);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setBugList(bugs);
  }, [bugs]);

  // Format date only on client side to prevent hydration mismatch
  const formatDate = (dateString: string) => {
    if (!mounted) return 'Loading...';
    try {
      return format(new Date(dateString), 'MMM d');
    } catch {
      return 'N/A';
    }
  };

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

  const handleBugUpdate = (updatedBug: Bug) => {
    setBugList(prevBugs => 
      prevBugs.map(bug => bug.id === updatedBug.id ? updatedBug : bug)
    );
    onBugUpdated?.(updatedBug);
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }

  if (bugList.length === 0) {
    return (
      <div className="text-center py-8">
        <BugIcon className="mx-auto h-8 w-8 text-muted-foreground" />
        <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No bugs found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Get started by reporting your first bug.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {bugList.map((bug) => {
        const reporter = mockUsers.find(u => u.id === bug.reporterId);
        const assignee = bug.assigneeId ? mockUsers.find(u => u.id === bug.assigneeId) : null;
        const associatedTask = bug.taskId ? mockTasks.find(t => t.id === bug.taskId) : null;

        return (
          <Card key={bug.id} className="w-full">
            <CardContent className="p-3 space-y-1">
              {/* Row 1: Title and Badges */}
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-medium truncate flex-1">
                  {bug.title}
                </h3>
                <div className="flex gap-1 shrink-0">
                  <Badge 
                    variant={getStatusColor(bug.status)}
                    className="text-xs px-1.5 py-0.5 capitalize h-5"
                  >
                    {bug.status}
                  </Badge>
                  <Badge 
                    className={`text-xs px-1.5 py-0.5 capitalize h-5 ${getSeverityColor(bug.severity)}`}
                  >
                    {bug.severity}
                  </Badge>
                </div>
              </div>

              {/* Row 2: Description and Task Link */}
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground truncate flex-1">
                  {bug.description}
                </p>
                {associatedTask && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                    <Link className="h-3 w-3" />
                    <span className="truncate max-w-32">→ {associatedTask.title}</span>
                  </div>
                )}
              </div>

              {/* Row 3: Assignee, Date, and Actions */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {/* Assignee */}
                  <div className="flex items-center gap-1">
                    {assignee ? (
                      <>
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
                          <AvatarFallback className="text-xs">
                            {assignee.name.substring(0, 1).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate max-w-20">{assignee.name}</span>
                      </>
                    ) : (
                      <span>Unassigned</span>
                    )}
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(bug.createdAt)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-1 shrink-0">
                  <BugDetailsDialog 
                    bug={bug} 
                    trigger={
                      <Button variant="ghost" size="sm" className="h-5 px-2 text-xs">
                        View
                      </Button>
                    }
                  />
                  <BugDialog 
                    mode="edit" 
                    bug={bug} 
                    onBugUpdated={handleBugUpdate}
                    trigger={
                      <Button variant="outline" size="sm" className="h-5 px-2 text-xs">
                        Edit
                      </Button>
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
} 