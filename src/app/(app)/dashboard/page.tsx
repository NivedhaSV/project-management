"use client";

import { PageHeader } from '@/components/shared/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Activity, CheckCircle, ListTodo, Bug } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  // Placeholder data - replace with actual data fetching
  const stats = [
    { title: 'Active Projects', value: '3', icon: Activity, color: 'text-primary' },
    { title: 'Tasks Due Today', value: '5', icon: ListTodo, color: 'text-yellow-500' },
    { title: 'Completed Tasks (Sprint)', value: '12', icon: CheckCircle, color: 'text-green-500' },
    { title: 'Open Bugs', value: '2', icon: Bug, color: 'text-red-500' },
  ];

  return (
    <div className="container mx-auto py-2 sm:py-8">
      <PageHeader
        title={`Welcome, ${user?.name || 'User'}!`}
        description="Here's an overview of your TaskFlow activity."
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Updates from your projects.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {/* Placeholder recent activity */}
              <li className="text-sm text-muted-foreground">No recent activity to display.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Navigate to key areas quickly.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button variant="outline" asChild>
              <Link href="/projects">View All Projects</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/my-tasks">My Assigned Tasks</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
