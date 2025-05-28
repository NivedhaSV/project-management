"use client";

import Link from 'next/link';
import { AppSidebarNav } from './AppSidebarNav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { LifeBuoy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function AppSidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block fixed h-full">
      <ScrollArea className="h-full w-[260px]">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                 <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
               </svg>
              <span className="font-bold text-xl text-foreground">TaskFlow</span>
            </Link>
            {/* Future: Notification Bell */}
            {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button> */}
          </div>
          <div className="flex-1 py-2">
            <AppSidebarNav className="px-4"/>
          </div>
          <div className="mt-auto p-4">
            <Card>
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-base">Need Help?</CardTitle>
                <CardDescription className="text-xs">
                  Visit our support center or contact us.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button size="sm" className="w-full" variant="outline">
                  <LifeBuoy className="mr-2 h-4 w-4"/> Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
