"use client";

import { use } from 'react';
import { ProjectSubNav } from '@/components/layout/ProjectSubNav';
import { mockProjects } from '@/data/mockData';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';

interface ProjectLayoutProps {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}

export default function ProjectLayout({ children, params }: ProjectLayoutProps) {
  const { projectId } = use(params);
  const project = mockProjects.find(p => p.id === projectId);

  if (!project) {
    notFound();
  }
  
  return (
    <div className="container mx-auto py-2 sm:py-8">
       <PageHeader
        title={project.name}
        description={project.description || "Manage this project's details, tasks, and progress."}
      />
      <ProjectSubNav projectId={projectId} />
      {children}
    </div>
  );
}
