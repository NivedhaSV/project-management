"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { TeamDialog } from "./TeamDialog";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockUsers } from "@/data/mockData";

interface TeamCardProps {
  team: any;
  onTeamUpdate?: (team: any) => void;
}

export function TeamCard({ team, onTeamUpdate }: TeamCardProps) {
  const [currentTeam, setCurrentTeam] = useState(team);

  const handleTeamUpdate = (updatedTeam: any) => {
    setCurrentTeam(updatedTeam);
    onTeamUpdate?.(updatedTeam);
  };

  const teamLead = mockUsers.find(user => user.id === currentTeam.leadId);

  return (
    <Card className="relative group">
      <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-4 space-y-0">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>{currentTeam.name}</CardTitle>
            <Badge variant="secondary" className="capitalize">
              {currentTeam.type}
            </Badge>
          </div>
          <CardDescription>{currentTeam.description}</CardDescription>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <TeamDialog
            mode="edit"
            team={currentTeam}
            onTeamUpdated={handleTeamUpdate}
            trigger={
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-1">Team Lead</p>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={teamLead?.avatarUrl} alt={teamLead?.name} />
                <AvatarFallback>{teamLead?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{teamLead?.name}</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Members ({currentTeam.members.length})</p>
            <div className="flex -space-x-2">
              {currentTeam.members.map((member: any) => {
                const user = mockUsers.find(u => u.id === member.userId);
                return (
                  <Avatar key={member.userId} className="h-6 w-6 border-2 border-background">
                    <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Projects ({currentTeam.projects.length})</p>
            <div className="flex gap-2">
              {currentTeam.projects.length > 0 ? (
                <Badge variant="outline">{currentTeam.projects.length} active projects</Badge>
              ) : (
                <span className="text-sm text-muted-foreground">No projects assigned</span>
              )}
            </div>
          </div>
          <div className="pt-2 flex justify-between text-xs text-muted-foreground">
            <span>Created {format(new Date(currentTeam.createdAt), "MMM d, yyyy")}</span>
            <span>Updated {format(new Date(currentTeam.updatedAt), "MMM d, yyyy")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}