"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FolderKanban,
  ListChecks,
  BarChart3,
  Settings,
  LifeBuoy,
  Users,
  Briefcase,
  Building2,
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  matchExact?: boolean;
}

const mainNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, matchExact: true },
  { href: '/clients', label: 'Clients', icon: Building2 },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/my-tasks', label: 'My Tasks', icon: ListChecks },
];

const secondaryNavItems: NavItem[] = [
  { href: '/reports', label: 'Reports', icon: BarChart3 },
  { href: '/teams', label: 'Teams', icon: Users },
  { href: '/settings', label: 'Settings', icon: Settings },
];


interface AppSidebarNavProps {
  isMobile?: boolean;
  className?: string;
}

export function AppSidebarNav({ isMobile = false, className }: AppSidebarNavProps) {
  const pathname = usePathname();

  const renderNavItem = (item: NavItem) => {
    const isActive = item.matchExact ? pathname === item.href : pathname.startsWith(item.href);
    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10',
          isActive && 'bg-primary/10 text-primary font-medium',
          isMobile && 'text-lg py-3' // Larger text for mobile
        )}
      >
        <item.icon className="h-5 w-5" />
        {item.label}
      </Link>
    );
  };

  return (
    <nav className={cn("grid items-start gap-2 text-sm font-medium", className)}>
      <div className="flex flex-col gap-1 py-2">
        <span className="px-3 py-1 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">Main</span>
        {mainNavItems.map(renderNavItem)}
      </div>
      <div className="flex flex-col gap-1 py-2">
         <span className="px-3 py-1 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">Management</span>
        {secondaryNavItems.map(renderNavItem)}
      </div>
    </nav>
  );
}
