"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface SubNavProps {
  links: NavLink[];
}

export function SubNav({ links }: SubNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-2 mb-4 border-b">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center h-9 px-4 py-6 -mb-px text-sm transition-colors hover:text-primary",
              isActive
                ? "border-b-2 border-primary font-medium text-primary"
                : "text-muted-foreground"
            )}
          >
            <link.icon className="w-4 h-4 mr-2" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
} 