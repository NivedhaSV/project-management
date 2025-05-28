"use client";

import type { ReactNode } from 'react';
import { ProjectSubNav } from '@/components/layout/ProjectSubNav';
import { mockProjects } from '@/data/mockData';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';

interface ProjectLayoutProps {
  children: ReactNode;
  params: { projectId: string };
}

export default function ProjectLayout({ children, params }: ProjectLayoutProps) {
  const project = mockProjects.find(p => p.id === params.projectId);

  if (!project) {
    notFound();
  }
  
  return (
    <div className="container mx-auto py-2 sm:py-8">
       <PageHeader
        title={project.name}
        description={project.description || "Manage this project's details, tasks, and progress."}
      />
      <ProjectSubNav projectId={params.projectId} />
      {children}
    </div>
  );
}
