'use client';

import Link from 'next/link';
import { CircleUser, Menu, Package2 } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ModeToggle } from '@/components/mode-toggle';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export function Navbar() {
  const pathname = usePathname();
  const { isLoggedIn } = useUser();

  interface Link {
    key: number;
    href: string;
    label: string;
  }

  const links: Link[] = [
    { key: 0, href: '/', label: 'Hem' },
    { key: 1, href: '/marshals', label: 'Marskalkar' },
    { key: 2, href: '/contact', label: 'Kontakta oss' },
  ];

  return (
    <header className="container mx-auto sticky z-50 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Package2 className="h-6 w-6" /> SKM
          <span className="sr-only">Systrarna KM</span>
        </Link>
        {links.map(({ key, href, label }) => (
          <Link
            key={key}
            href={href}
            className={`transition-colors ${
              pathname === href ? 'text-foreground' : 'text-muted-foreground'
            } hover:text-foreground`}>
            {label}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Systrarna KM</span>
            </Link>
            {links.map(({ key, href, label }) => (
              <SheetClose key={key} asChild>
                <Link
                  href={href}
                  className={`transition-colors ${
                    pathname === href
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  } hover:text-foreground`}>
                  {label}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="block md:hidden">Systrarna KM</div>
      <div className="flex items-center gap-4 ml-auto md:gap-2 lg:gap-4">
        <ModeToggle />
        {isLoggedIn ? <ProfileMenu /> : <LoginButton />}
      </div>
    </header>
  );
}

export function LoginButton() {
  return (
    <Link href="/login" className={buttonVariants({ variant: 'default' })}>
      Login
    </Link>
  );
}

export function ProfileMenu() {
  const router = useRouter();
  const { signOut } = useUser();

  async function handleSignOut() {
    await signOut();
    void router.push('/');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Mitt konto</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account">Min profil</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a onClick={() => void handleSignOut()}>Logga ut</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
