"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeamSchema } from "@/lib/schema";
import { useToast } from "@/components/ui/use-toast";
import { Edit, PlusCircle, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockUsers } from "@/data/mockData";

interface TeamDialogProps {
  mode: "create" | "edit";
  team?: any;
  onTeamUpdated?: (team: any) => void;
  trigger: React.ReactNode;
}

export function TeamDialog({
  mode,
  team,
  onTeamUpdated,
  trigger,
}: TeamDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(TeamSchema),
    defaultValues: team || {
      name: "",
      description: "",
      type: "development" as const,
      leadId: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create a new team object or update existing one
      const updatedTeam = mode === "edit" 
        ? {
            ...team,
            ...data,
            updatedAt: new Date().toISOString(),
          }
        : {
            id: `team-${Date.now()}`,
            ...data,
            members: [
              { userId: data.leadId, role: "lead" as const },
            ],
            projects: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

      onTeamUpdated?.(updatedTeam);
      setOpen(false);
      toast({
        title: mode === "edit" ? "Team Updated" : "Team Created",
        description: mode === "edit" ? "Team has been updated successfully." : "Team has been created successfully.",
      });
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast({
        title: "Error",
        description: "Failed to save team. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      reset();
      setError(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Edit Team" : "Create Team"}</DialogTitle>
          <DialogDescription>
            {mode === "edit" ? "Update the team details below." : "Fill in the team details below."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter team name"
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-sm font-medium text-destructive">{errors.name.message?.toString()}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Enter team description"
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <p className="text-sm font-medium text-destructive">{errors.description.message?.toString()}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Team Type</Label>
            <Select
              onValueChange={(value) => {
                const event = { target: { value, name: "type" } };
                register("type").onChange(event);
              }}
              value={team?.type || "development"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select team type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="qa">QA</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm font-medium text-destructive">{errors.type.message?.toString()}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="leadId">Team Lead</Label>
            <Select
              onValueChange={(value) => {
                const event = { target: { value, name: "leadId" } };
                register("leadId").onChange(event);
              }}
              value={team?.leadId || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select team lead" />
              </SelectTrigger>
              <SelectContent>
                {mockUsers.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.leadId && (
              <p className="text-sm font-medium text-destructive">{errors.leadId.message?.toString()}</p>
            )}
          </div>

          {error && <p className="text-sm font-medium text-destructive">{error}</p>}

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === "edit" ? "Saving..." : "Creating..."}
                </>
              ) : mode === "edit" ? (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Team
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}