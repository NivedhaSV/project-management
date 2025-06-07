"use client";

import { useState } from 'react';
import { mockProjects } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Users } from 'lucide-react';

export default function ClientProjectsPage() {
  const { clientId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects for this client
  const clientProjects = mockProjects.filter(project => project.clientId === clientId);
  
  // Apply search filter
  const filteredProjects = clientProjects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-semibold">
                    {project.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  {/* Project Members */}
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div className="flex -space-x-2">
                      {project.members?.slice(0, 3).map((member, index) => (
                        <Avatar key={member.userId} className="h-6 w-6 border-2 border-background">
                          <AvatarImage src={`https://github.com/shadcn.png`} />
                          <AvatarFallback>
                            {member.userId.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {(project.members?.length || 0) > 3 && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-xs text-muted-foreground">
                          +{project.members!.length - 3}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Project Metadata */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            {clientProjects.length === 0 
              ? "No projects found for this client." 
              : "No projects match your search."}
          </p>
        </div>
      )}
    </div>
  );
} 