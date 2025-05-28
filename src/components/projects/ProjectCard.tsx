import Link from 'next/link';
import type { Project } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FolderKanban, CalendarDays, Edit3, Trash2 } from 'lucide-react';
import {formatDistanceToNow } from 'date-fns';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
            <FolderKanban className="h-8 w-8 text-primary mb-2" />
            {/* Placeholder for actions dropdown */}
        </div>
        <CardTitle className="text-xl">
            <Link href={`/projects/${project.id}`} className="hover:underline">
                {project.name}
            </Link>
        </CardTitle>
        <CardDescription className="text-sm h-10 overflow-hidden text-ellipsis">
          {project.description || 'No description provided.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Placeholder for project stats like task count or progress */}
        {/* <div className="text-xs text-muted-foreground">
          <p>Tasks: 15 / 30</p>
          <Progress value={50} className="h-2 mt-1" />
        </div> */}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 text-xs text-muted-foreground border-t pt-4">
        <div className="flex items-center w-full justify-between">
            <div className="flex items-center">
                <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                <span>Updated {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}</span>
            </div>
            <Badge variant="outline" className="capitalize">
                {/* Placeholder Status/Type */}
                Active
            </Badge>
        </div>
        <div className="w-full mt-2">
             <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href={`/projects/${project.id}`}>View Project</Link>
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
