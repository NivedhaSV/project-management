"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutGrid, KanbanSquare, ListChecks, Bug, Settings2 } from 'lucide-react';

interface ProjectSubNavProps {
  projectId: string;
}

const navItems = [
  { href: '', label: 'Overview', icon: LayoutGrid },
  { href: '/kanban', label: 'Kanban Board', icon: KanbanSquare },
  { href: '/tasks', label: 'Tasks', icon: ListChecks },
  { href: '/bugs', label: 'Bugs', icon: Bug },
  { href: '/settings', label: 'Settings', icon: Settings2 },
];

export function ProjectSubNav({ projectId }: ProjectSubNavProps) {
  const pathname = usePathname();
  const basePath = `/projects/${projectId}`;

  return (
    <nav className="flex items-center space-x-2 sm:space-x-4 border-b pb-3 mb-6 overflow-x-auto whitespace-nowrap">
      {navItems.map((item) => {
        const fullHref = `${basePath}${item.href}`;
        // For overview, exact match basePath. For others, startsWith fullHref.
        const isActive = item.href === '' ? pathname === basePath : pathname.startsWith(fullHref);
        
        return (
          <Link
            key={item.label}
            href={fullHref}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
