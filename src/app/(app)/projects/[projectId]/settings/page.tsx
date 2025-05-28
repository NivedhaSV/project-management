"use client";

import { use } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { mockProjects } from '@/data/mockData';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ClientOnly } from '@/components/shared/ClientOnly';

interface ProjectSettingsPageProps {
  params: Promise<{ projectId: string }>;
}

export default function ProjectSettingsPage({ params }: ProjectSettingsPageProps) {
  const { projectId } = use(params);
  const project = mockProjects.find(p => p.id === projectId);

  if (!project) {
    notFound();
  }

  return (
    <ClientOnly fallback={
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="h-6 w-32 bg-muted animate-pulse rounded mb-2" />
            <div className="h-4 w-48 bg-muted animate-pulse rounded" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="h-10 w-full bg-muted animate-pulse rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              <div className="h-24 w-full bg-muted animate-pulse rounded" />
            </div>
            <div className="h-10 w-24 bg-muted animate-pulse rounded" />
          </CardContent>
        </Card>
      </div>
    }>
      <div className="space-y-6">
        <PageHeader 
          title="Project Settings" 
          description={`Configure settings for project: ${project.name}`} 
        />
        
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Update your project's name and description.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input id="projectName" defaultValue={project.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectDescription">Project Description</Label>
              <Textarea 
                id="projectDescription" 
                defaultValue={project.description} 
                className="min-h-[100px]" 
              />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage who has access to this project.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Team management features are coming soon.</p>
            {/* Future: List members, invite new members, change roles */}
          </CardContent>
        </Card>
        
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Actions like deleting the project are permanent.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">Delete Project</Button>
          </CardContent>
        </Card>
      </div>
    </ClientOnly>
  );
}
