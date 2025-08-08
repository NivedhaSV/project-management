"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientSchema } from "@/lib/schema";
import { useToast } from "@/components/ui/use-toast";
import { Edit, PlusCircle, Loader2 } from "lucide-react";

interface ClientDialogProps {
  mode: "create" | "edit";
  client?: any;
  onClientUpdated?: (client: any) => void;
  trigger: React.ReactNode;
}

export function ClientDialog({
  mode,
  client,
  onClientUpdated,
  trigger,
}: ClientDialogProps) {
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
    resolver: zodResolver(ClientSchema),
    defaultValues: client || {
      name: "",
      description: "",
      email: "",
      website: "",
      industry: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Pass the form data to the parent component
      onClientUpdated?.(data);
      setOpen(false);
      toast({
        title: mode === "edit" ? "Client Updated" : "Client Created",
        description: mode === "edit" ? "Client has been updated successfully." : "Client has been created successfully.",
      });
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast({
        title: "Error",
        description: "Failed to save client. Please try again.",
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
          <DialogTitle>{mode === "edit" ? "Edit Client" : "Create Client"}</DialogTitle>
          <DialogDescription>
            {mode === "edit" ? "Update the client details below." : "Fill in the client details below."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter client name"
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
              placeholder="Enter client description"
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <p className="text-sm font-medium text-destructive">{errors.description.message?.toString()}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter client email"
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-sm font-medium text-destructive">{errors.email.message?.toString()}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              {...register("website")}
              placeholder="Enter client website"
              aria-invalid={!!errors.website}
            />
            {errors.website && (
              <p className="text-sm font-medium text-destructive">{errors.website.message?.toString()}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              {...register("industry")}
              placeholder="Enter client industry"
              aria-invalid={!!errors.industry}
            />
            {errors.industry && (
              <p className="text-sm font-medium text-destructive">{errors.industry.message?.toString()}</p>
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
                  Create Client
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}