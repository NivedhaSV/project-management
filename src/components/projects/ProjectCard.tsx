import Link from 'next/link';
import type { Project } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FolderKanban, CalendarDays, Edit3 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { CreateProjectDialog } from './CreateProjectDialog';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
  onProjectUpdate?: (updatedProject: Project) => void;
}

export function ProjectCard({ project, onProjectUpdate }: ProjectCardProps) {
  const [currentProject, setCurrentProject] = useState(project);

  const handleProjectUpdate = (updatedProject: Project) => {
    setCurrentProject(updatedProject);
    onProjectUpdate?.(updatedProject);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'stopped':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <FolderKanban className="h-8 w-8 text-primary mb-2" />
          <CreateProjectDialog
            mode="edit"
            project={currentProject}
            onProjectUpdated={handleProjectUpdate}
            trigger={
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            }
          />
        </div>
        <CardTitle className="text-xl">
          <Link href={`/projects/${currentProject.id}`} className="hover:underline">
            {currentProject.name}
          </Link>
        </CardTitle>
        <CardDescription className="text-sm h-10 overflow-hidden text-ellipsis">
          {currentProject.description || 'No description provided.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Project status indicator */}
        <div className="mb-2">
          <Badge 
            variant="outline" 
            className={`capitalize text-xs px-2 py-1 ${getStatusColor(currentProject.status)}`}
          >
            {currentProject.status}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 text-xs text-muted-foreground border-t pt-4">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center">
            <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
            <span>Updated {formatDistanceToNow(new Date(currentProject.updatedAt), { addSuffix: true })}</span>
          </div>
          <Badge variant="outline" className="capitalize">
            {currentProject.members?.length || 1} member{(currentProject.members?.length || 1) > 1 ? 's' : ''}
          </Badge>
        </div>
        <div className="w-full mt-2">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href={`/projects/${currentProject.id}`}>View Project</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
