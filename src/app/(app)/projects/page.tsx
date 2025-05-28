"use client";

import { useState, useEffect } // Add useEffect
from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { ProjectList } from '@/components/projects/ProjectList';
import { CreateProjectDialog } from '@/components/projects/CreateProjectDialog';
import type { Project } from '@/lib/types';
import { mockProjects } from '@/data/mockData'; // Using mock data
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate fetching projects
    setTimeout(() => {
      setProjects(mockProjects);
      setIsLoading(false); // Set loading to false after data is "fetched"
    }, 1000); // Simulate 1 second delay
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
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <ProjectList projects={projects} />
      )}
    </div>
  );
}
