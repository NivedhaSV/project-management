"use client";

import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { PlusCircle, Bug } from 'lucide-react';
import type { Bug as BugType } from '@/lib/types';
import { mockBugs, mockProjects } from '@/data/mockData';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface ProjectBugsPageProps {
  params: { projectId: string };
}

export default function ProjectBugsPage({ params }: ProjectBugsPageProps) {
  const project = mockProjects.find(p => p.id === params.projectId);
  const [bugs, setBugs] = useState<BugType[]>([]);

  useEffect(() => {
    const projectBugs = mockBugs.filter(bug => bug.projectId === params.projectId);
    setBugs(projectBugs);
  }, [params.projectId]);

  if (!project) {
    notFound();
  }

  return (
    <div>
      {/* <PageHeader title="Project Bugs" description={`Track and manage bugs for project: ${project.name}`} actions={
        <Button><PlusCircle className="mr-2 h-4 w-4" /> Report Bug</Button>
      } /> */}

      {bugs.length === 0 ? (
        <div className="text-center py-10">
          <Bug className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium text-foreground">No bugs reported</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            This project is looking clean! Or, be the first to report an issue.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bugs.map((bug) => (
            <Card key={bug.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{bug.title}</CardTitle>
                  <Badge variant={bug.status === 'open' || bug.status === 'inprogress' ? 'destructive' : 'outline'} className="capitalize">{bug.status}</Badge>
                </div>
                <CardDescription>Reported on {format(new Date(bug.createdAt), 'MMM d, yyyy')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{bug.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center text-xs">
                <Badge variant="secondary" className="capitalize">{bug.severity} Severity</Badge>
                <Button variant="link" size="sm">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
