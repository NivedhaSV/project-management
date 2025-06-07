"use client";

import { use } from 'react';
import { SubNav } from '@/components/layout/SubNav';
import { mockProjects } from '@/data/mockData';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Bug,
  Settings,
} from 'lucide-react';

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

  const navLinks = [
    {
      href: `/projects/${projectId}`,
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      href: `/projects/${projectId}/kanban`,
      label: 'Kanban',
      icon: FolderKanban,
    },
    {
      href: `/projects/${projectId}/tasks`,
      label: 'Tasks',
      icon: ListTodo,
    },
    {
      href: `/projects/${projectId}/bugs`,
      label: 'Bugs',
      icon: Bug,
    },
    {
      href: `/projects/${projectId}/settings`,
      label: 'Settings',
      icon: Settings,
    },
  ];
  
  return (
    <div className="container mx-auto py-2 sm:py-8">
      <PageHeader
        title={project.name}
        description={project.description || "Manage this project's details, tasks, and progress."}
      />
      <SubNav links={navLinks} />
      {children}
    </div>
  );
}
