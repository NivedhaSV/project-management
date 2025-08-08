"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { TeamCard } from "./TeamCard";

interface TeamListProps {
  teams: any[];
  onTeamUpdate?: (team: any) => void;
}

export function TeamList({ teams: initialTeams, onTeamUpdate }: TeamListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const handleTeamUpdate = (updatedTeam: any) => {
    onTeamUpdate?.(updatedTeam);
  };

  const filteredTeams = initialTeams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search teams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            onTeamUpdate={handleTeamUpdate}
          />
        ))}
      </div>
      {filteredTeams.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No teams found.</p>
        </div>
      )}
    </div>
  );
}