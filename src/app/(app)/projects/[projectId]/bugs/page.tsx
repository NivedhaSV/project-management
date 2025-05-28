"use client";

import { use, useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { BugDialog } from '@/components/bugs/BugDialog';
import { BugList } from '@/components/bugs/BugList';
import { ClientOnly } from '@/components/shared/ClientOnly';
import type { Bug } from '@/lib/types';
import { mockBugs, mockProjects } from '@/data/mockData';
import { notFound } from 'next/navigation';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

interface ProjectBugsPageProps {
  params: Promise<{ projectId: string }>;
}

export default function ProjectBugsPage({ params }: ProjectBugsPageProps) {
  const { projectId } = use(params);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const project = mockProjects.find(p => p.id === projectId);

  useEffect(() => {
    // Simulate fetching bugs
    setTimeout(() => {
      const projectBugs = mockBugs.filter(bug => bug.projectId === projectId);
      setBugs(projectBugs);
      setIsLoading(false);
    }, 1000);
  }, [projectId]);

  if (!project) {
    notFound();
  }

  const handleBugCreated = (newBug: Bug) => {
    setBugs((prevBugs) => [newBug, ...prevBugs]);
  };

  const handleBugUpdated = (updatedBug: Bug) => {
    setBugs((prevBugs) => 
      prevBugs.map(bug => bug.id === updatedBug.id ? updatedBug : bug)
    );
  };

  return (
    <div>
      <PageHeader 
        title="Project Bugs" 
        description={`Track and manage bugs for project: ${project.name}`} 
        actions={
          <BugDialog 
            mode="create"
            projectId={projectId} 
            onBugCreated={handleBugCreated} 
          />
        } 
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
          <BugList bugs={bugs} onBugUpdated={handleBugUpdated} />
        )}
      </ClientOnly>
    </div>
  );
}
