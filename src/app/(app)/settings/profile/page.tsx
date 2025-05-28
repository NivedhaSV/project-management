"use client";

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfileSettingsPage() {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading profile...</p>; // Or a loading spinner
  }
  
  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : user.email[0].toUpperCase();


  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Profile Settings"
        description="Update your personal information and profile picture."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user profile large" />
              <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
            </Avatar>
            <Button variant="outline">Change Picture</Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" defaultValue={user.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue={user.email} disabled />
            <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
          </div>
           {/* Add more profile fields here, e.g., bio, timezone */}
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
