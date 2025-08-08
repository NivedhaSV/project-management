"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { TeamDialog } from "@/components/teams/TeamDialog";
import { TeamList } from "@/components/teams/TeamList";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { mockTeams } from "@/data/mockData";

export default function TeamsPage() {
  const [teams, setTeams] = useState(mockTeams);

  const handleTeamUpdate = (updatedTeam: any) => {
    setTeams(prevTeams =>
      prevTeams.map(team =>
        team.id === updatedTeam.id ? updatedTeam : team
      )
    );
  };

  const handleTeamCreate = (newTeam: any) => {
    setTeams(prevTeams => [
      {
        ...newTeam,
        members: newTeam.members || [],
        projects: newTeam.projects || [],
      },
      ...prevTeams,
    ]);
  };

  return (
    <div className="container space-y-8 py-8">
      <PageHeader
        title="Teams"
        description="Manage your teams and their members."
        action={
          <TeamDialog
            mode="create"
            onTeamUpdated={handleTeamCreate}
            trigger={
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Team
              </Button>
            }
          />
        }
      />
      <TeamList teams={teams} onTeamUpdate={handleTeamUpdate} />
    </div>
  );
}