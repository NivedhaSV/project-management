"use client";

import { mockProjects, mockTasks, mockUserStories, mockBugs, mockUsers } from '@/data/mockData';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, ListTodo, CheckCircle, Bug, CalendarDays, Edit3 } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProjectOverviewPageProps {
  params: { projectId: string };
}

export default function ProjectOverviewPage({ params }: ProjectOverviewPageProps) {
  const project = mockProjects.find(p => p.id === params.projectId);

  if (!project) {
    notFound();
  }

  const projectTasks = mockTasks.filter(t => t.projectId === project.id);
  const projectUserStories = mockUserStories.filter(us => us.projectId === project.id);
  const projectBugs = mockBugs.filter(b => b.projectId === project.id);
  const owner = mockUsers.find(u => u.id === project.ownerId);

  const completedTasks = projectTasks.filter(t => t.status === 'done').length;
  const totalTasks = projectTasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">{completedTasks} completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Stories</CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" /> {/* Re-using icon, can change */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectUserStories.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Bugs</CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectBugs.filter(b => b.status === 'open').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.members?.length || 1}</div> {/* Assuming owner is a member */}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full h-3" />
          <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Key Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Owner:</span>
              <div className="flex items-center gap-2">
                 {owner?.avatarUrl && <Avatar className="h-5 w-5"><AvatarImage src={owner.avatarUrl} data-ai-hint="user avatar"/><AvatarFallback>{owner.name[0]}</AvatarFallback></Avatar>}
                <span>{owner?.name || 'N/A'}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created:</span>
              <span>{format(new Date(project.createdAt), 'PPP')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Updated:</span>
              <span>{format(new Date(project.updatedAt), 'PPP p')}</span>
            </div>
            {/* Add more key info if needed */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent User Stories</CardTitle>
            <Button variant="outline" size="sm" asChild>
                <Link href={`/projects/${project.id}/user-stories`}>View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {projectUserStories.slice(0,3).map(story => (
                <div key={story.id} className="py-2 border-b last:border-b-0">
                    <h4 className="font-medium hover:underline"><Link href={`/projects/${project.id}/user-stories/${story.id}`}>{story.title}</Link></h4>
                    <p className="text-xs text-muted-foreground">Priority: <Badge variant={story.priority === 'high' ? 'destructive' : story.priority === 'medium' ? 'secondary' : 'outline'} className="capitalize text-xs px-1.5 py-0.5">{story.priority}</Badge> | Status: <Badge variant="outline" className="capitalize text-xs px-1.5 py-0.5">{story.status}</Badge></p>
                </div>
            ))}
            {projectUserStories.length === 0 && <p className="text-sm text-muted-foreground">No user stories yet.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
