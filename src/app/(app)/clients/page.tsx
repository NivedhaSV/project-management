"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { ClientDialog } from "@/components/clients/ClientDialog";
import { ClientList } from "@/components/clients/ClientList";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { mockClients } from "@/data/mockData";

export default function ClientsPage() {
  const [clients, setClients] = useState(mockClients);

  const handleClientUpdate = (updatedClient: any) => {
    setClients(prevClients =>
      prevClients.map(client =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
  };

  const handleClientCreate = (newClient: any) => {
    // Add the new client to the beginning of the list
    setClients(prevClients => [
      {
        ...newClient,
        id: `client-${prevClients.length + 1}`,
        projects: [],
        sprints: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      ...prevClients,
    ]);
  };

  return (
    <div className="container space-y-8 py-8">
      <PageHeader
        title="Clients"
        description="Manage your client relationships and projects."
        action={
          <ClientDialog
            mode="create"
            onClientUpdated={handleClientCreate}
            trigger={
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Client
              </Button>
            }
          />
        }
      />
      <ClientList clients={clients} onClientUpdate={handleClientUpdate} />
    </div>
  );
}