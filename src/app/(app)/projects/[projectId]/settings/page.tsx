"use client";

import { PageHeader } from '@/components/shared/PageHeader';
import { mockProjects } from '@/data/mockData';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ProjectSettingsPageProps {
  params: { projectId: string };
}

export default function ProjectSettingsPage({ params }: ProjectSettingsPageProps) {
  const project = mockProjects.find(p => p.id === params.projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* <PageHeader title="Project Settings" description={`Configure settings for project: ${project.name}`} /> */}
      
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
            <Textarea id="projectDescription" defaultValue={project.description} className="min-h-[100px]" />
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
  );
}
