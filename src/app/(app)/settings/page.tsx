"use client";

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { User, Bell, Palette, ShieldCheck } from 'lucide-react';

const settingsSections = [
  { title: "Profile", description: "Manage your personal information.", href: "/settings/profile", icon: User },
  { title: "Account", description: "Manage your account settings.", href: "/settings/account", icon: User },
  { title: "Notifications", description: "Configure your notification preferences.", href: "/settings/notifications", icon: Bell },
  { title: "Appearance", description: "Customize the look and feel.", href: "/settings/appearance", icon: Palette },
  { title: "Security", description: "Manage your security settings.", href: "/settings/security", icon: ShieldCheck },
];

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-2 sm:py-8">
      <PageHeader
        title="Settings"
        description="Manage your application preferences and account details."
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {settingsSections.map(section => (
          <Link key={section.title} href={section.href} passHref>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <section.icon className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
