"use client";

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { ProjectList } from '@/components/projects/ProjectList';
import { CreateProjectDialog } from '@/components/projects/CreateProjectDialog';
import { ClientOnly } from '@/components/shared/ClientOnly';
import type { Project } from '@/lib/types';
import { mockProjects } from '@/data/mockData';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching projects
    setTimeout(() => {
      setProjects(mockProjects);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleProjectCreated = (newProject: Project) => {
    setProjects((prevProjects) => [newProject, ...prevProjects]);
  };

  return (
    <div className="container mx-auto py-2 sm:py-8">
      <PageHeader
        title="Projects"
        description="Manage all your projects in one place."
        actions={<CreateProjectDialog onProjectCreated={handleProjectCreated} />}
      />
      <ClientOnly fallback={
        <div className="flex justify-center items-center min-h-[300px]">
          <LoadingSpinner size="lg" />
        </div>
      }>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <ProjectList projects={projects} />
        )}
      </ClientOnly>
    </div>
  );
}
