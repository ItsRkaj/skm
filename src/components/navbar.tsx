import Link from 'next/link';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import AuthMenu from './AuthMenu';
import {
  NavigationLinksHomePage,
  NavigationLinksMobile,
} from './NavigationLinks';

export function Navbar() {
  return (
    <header className="container mx-auto sticky z-50 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base">
          Systrarna KM
        </Link>
        <NavigationLinksHomePage />
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold">
              Systrarna KM
            </Link>
            <NavigationLinksMobile />
          </nav>
        </SheetContent>
      </Sheet>
      <div className="block md:hidden">Systrarna KM</div>
      <div className="flex items-center gap-4 ml-auto md:gap-2 lg:gap-4">
        <ModeToggle />
        <AuthMenu />
      </div>
    </header>
  );
}
