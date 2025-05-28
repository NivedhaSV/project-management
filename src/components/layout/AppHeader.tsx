import Link from 'next/link';
import { UserAvatar } from '@/components/auth/UserAvatar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AppSidebarNav } from './AppSidebarNav'; // Assuming AppSidebarNav can be reused or adapted

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 shadow-sm">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 pt-6 sm:max-w-xs">
            <AppSidebarNav isMobile={true} />
          </SheetContent>
        </Sheet>
      </div>
      
      <div className="flex items-center gap-2">
        <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          {/* You can add an SVG logo here if you have one */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="font-bold text-xl text-foreground">TaskFlow</span>
        </Link>
      </div>

      <div className="ml-auto flex items-center gap-4">
        {/* Future: Search Bar */}
        {/* <Search className="h-5 w-5" /> */}
        <UserAvatar />
      </div>
    </header>
  );
}
