"use client";

import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Users } from 'lucide-react';

// Mock data for teams
const mockTeams = [
  { id: 'team-1', name: 'Frontend Wizards', memberCount: 5, projectCount: 2 },
  { id: 'team-2', name: 'Backend Ninjas', memberCount: 4, projectCount: 3 },
  { id: 'team-3', name: 'QA Avengers', memberCount: 3, projectCount: 5 },
];

export default function TeamsPage() {
  return (
    <div className="container mx-auto py-2 sm:py-8">
      <PageHeader
        title="Teams"
        description="Manage your teams and collaborate effectively."
        actions={
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Team
          </Button>
        }
      />
      
      {mockTeams.length === 0 ? (
        <div className="text-center py-10">
          <Users className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium text-foreground">No teams created yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Organize your members into teams for better project assignment and collaboration.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockTeams.map((team) => (
            <Card key={team.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{team.name}</CardTitle>
                <CardDescription>
                  {team.memberCount} members &bull; {team.projectCount} active projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Placeholder for avatars or more details */}
                <div className="flex -space-x-2 overflow-hidden">
                  {Array.from({ length: Math.min(team.memberCount, 5) }).map((_, i) => (
                     <img
                        key={i}
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-background"
                        src={`https://placehold.co/40x40.png?text=U${i+1}`}
                        alt={`Member ${i+1}`}
                        data-ai-hint="user avatar"
                      />
                  ))}
                 
                </div>
              </CardContent>
              {/* <CardFooter>
                <Button variant="outline" size="sm" className="w-full">View Team</Button>
              </CardFooter> */}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
