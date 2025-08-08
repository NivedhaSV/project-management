import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { ClientDialog } from "./ClientDialog";
import { format } from "date-fns";
import Link from "next/link";

interface ClientCardProps {
  client: any;
  onClientUpdate?: (client: any) => void;
}

export function ClientCard({ client, onClientUpdate }: ClientCardProps) {
  const [currentClient, setCurrentClient] = useState(client);

  const handleClientUpdate = (updatedClient: any) => {
    setCurrentClient(updatedClient);
    onClientUpdate?.(updatedClient);
  };

  return (
    <Card className="relative group">
      <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-4 space-y-0">
        <div>
          <Link href={`/clients/${currentClient.id}`} className="hover:underline">
            <CardTitle>{currentClient.name}</CardTitle>
          </Link>
          <CardDescription>{currentClient.industry}</CardDescription>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <ClientDialog
            mode="edit"
            client={currentClient}
            onClientUpdated={handleClientUpdate}
            trigger={
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          {currentClient.description && (
            <p className="text-muted-foreground line-clamp-2">{currentClient.description}</p>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground">Projects</p>
              <p className="font-medium">{currentClient.projects?.length || 0} active</p>
            </div>
            <div>
              <p className="text-muted-foreground">Sprints</p>
              <p className="font-medium">{currentClient.sprints?.length || 0} active</p>
            </div>
          </div>
          <div className="pt-2 flex justify-between text-xs text-muted-foreground">
            <span>Created {format(new Date(currentClient.createdAt), "MMM d, yyyy")}</span>
            <span>Updated {format(new Date(currentClient.updatedAt), "MMM d, yyyy")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}