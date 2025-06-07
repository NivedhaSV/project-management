"use client";

import { useState } from 'react';
import { mockSprints } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { Plus, Timer, Calendar, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import { CreateSprintDialog } from '@/components/sprints/CreateSprintDialog';
import type { Sprint } from '@/lib/types';

export default function ClientSprintsPage() {
  const { clientId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sprints, setSprints] = useState<Sprint[]>(
    mockSprints.filter(sprint => sprint.clientId === clientId)
  );

  // Filter sprints for this client
  const clientSprints = mockSprints.filter(sprint => sprint.clientId === clientId);
  
  // Apply search filter
  const filteredSprints = clientSprints.filter(sprint =>
    sprint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sprint.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSprintProgress = (sprint: typeof mockSprints[0]) => {
    if (sprint.status === 'completed') return 100;
    if (sprint.status === 'planning') return 0;
    
    // For active sprints, calculate based on velocity vs capacity
    return Math.round((sprint.velocity || 0) / (sprint.capacity || 1) * 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'planning':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'completed':
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const handleSprintCreated = (newSprint: Sprint) => {
    setSprints(prev => [newSprint, ...prev]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search sprints..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <CreateSprintDialog 
          clientId={clientId}
          onSprintCreated={handleSprintCreated}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSprints.map((sprint) => (
          <Card key={sprint.id} className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold">
                  {sprint.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {sprint.description || 'No description provided'}
                </p>
              </div>
              <Badge 
                variant="outline" 
                className={`capitalize ${getStatusColor(sprint.status)}`}
              >
                {sprint.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Sprint Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{getSprintProgress(sprint)}%</span>
                  </div>
                  <Progress value={getSprintProgress(sprint)} />
                </div>

                {/* Sprint Details */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Timer className="h-4 w-4" />
                    <span>{sprint.capacity} Points</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{sprint.velocity || 0} Done</span>
                  </div>
                </div>

                {/* Sprint Dates */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{format(new Date(sprint.startDate), 'MMM d')} - {format(new Date(sprint.endDate), 'MMM d, yyyy')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSprints.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            {clientSprints.length === 0 
              ? "No sprints found for this client." 
              : "No sprints match your search."}
          </p>
        </div>
      )}
    </div>
  );
} 