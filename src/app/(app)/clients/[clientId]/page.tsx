"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProjects, mockSprints } from "@/data/mockData";
import { useParams } from "next/navigation";

export default function ClientOverviewPage() {
  const params = useParams();
  const projects = mockProjects.filter(p => p.clientId === params.clientId);
  const sprints = mockSprints.filter(s => s.clientId === params.clientId);

  const activeProjects = projects.length;
  const activeSprints = sprints.filter(s => s.status === 'active').length;
  const totalStoryPoints = sprints.reduce((sum, sprint) => sum + (sprint.capacity || 0), 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sprints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSprints}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Story Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStoryPoints}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity or other relevant content */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.slice(0, 5).map(project => (
                <div key={project.id} className="flex justify-between items-center">
                  <span>{project.name}</span>
                  <span className="text-muted-foreground text-sm">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Sprints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sprints
                .filter(s => s.status === 'active')
                .slice(0, 5)
                .map(sprint => (
                  <div key={sprint.id} className="flex justify-between items-center">
                    <span>{sprint.name}</span>
                    <span className="text-muted-foreground text-sm">
                      {new Date(sprint.endDate).toLocaleDateString()}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 