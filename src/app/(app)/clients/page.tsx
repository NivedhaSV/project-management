"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockClients, mockProjects, mockSprints } from '@/data/mockData';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getClientStats = (clientId: string) => {
    const projects = mockProjects.filter(p => p.clientId === clientId);
    const sprints = mockSprints.filter(s => s.clientId === clientId);
    const activeSprints = sprints.filter(s => s.status === 'active').length;

    return {
      totalProjects: projects.length,
      activeSprints,
    };
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track all your clients
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Client
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search clients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => {
          const stats = getClientStats(client.id);
          return (
            <Link key={client.id} href={`/clients/${client.id}`}>
              <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-semibold">
                      {client.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {client.description}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Projects: </span>
                        <Badge variant="secondary" className="ml-1">
                          {stats.totalProjects}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Active Sprints: </span>
                        <Badge variant="secondary" className="ml-1">
                          {stats.activeSprints}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Created {new Date(client.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Updated {new Date(client.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No clients found</p>
        </div>
      )}
    </div>
  );
} 