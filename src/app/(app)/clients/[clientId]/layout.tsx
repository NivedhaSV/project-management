"use client";

import { use } from 'react';
import { SubNav } from '@/components/layout/SubNav';
import { mockClients } from '@/data/mockData';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  Briefcase,
  Timer,
} from 'lucide-react';

interface ClientLayoutProps {
  children: React.ReactNode;
  params: Promise<{ clientId: string }>;
}

export default function ClientLayout({ children, params }: ClientLayoutProps) {
  const { clientId } = use(params);
  const client = mockClients.find(c => c.id === clientId);

  if (!client) {
    notFound();
  }

  const navLinks = [
    {
      href: `/clients/${clientId}`,
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      href: `/clients/${clientId}/projects`,
      label: 'Projects',
      icon: Briefcase,
    },
    {
      href: `/clients/${clientId}/sprints`,
      label: 'Sprints',
      icon: Timer,
    },
    {
      href: `/clients/${clientId}/members`,
      label: 'Members',
      icon: Users,
    },
    {
      href: `/clients/${clientId}/settings`,
      label: 'Settings',
      icon: Settings,
    },
  ];
  
  return (
    <div className="container mx-auto py-2 sm:py-8">
      <PageHeader
        title={client.name}
        description={client.description || "Manage this client's details, projects, and progress."}
      />
      <SubNav links={navLinks} />
      {children}
    </div>
  );
} 