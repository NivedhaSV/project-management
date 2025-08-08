import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ClientCard } from "./ClientCard";

interface ClientListProps {
  clients: any[];
  onClientUpdate?: (client: any) => void;
}

export function ClientList({ clients: initialClients, onClientUpdate }: ClientListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState(initialClients);

  const handleClientUpdate = (updatedClient: any) => {
    setClients(prevClients =>
      prevClients.map(client =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
    onClientUpdate?.(updatedClient);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.industry?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search clients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            onClientUpdate={handleClientUpdate}
          />
        ))}
      </div>
      {filteredClients.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No clients found.</p>
        </div>
      )}
    </div>
  );
}