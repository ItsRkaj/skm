'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LucideIcon } from 'lucide-react';
import { SheetClose } from './ui/sheet';

interface Link {
  key: number;
  href: string;
  label: string;
  icon: LucideIcon;
}

const links: Link[] = [
  { key: 0, href: '/', label: 'Hem', icon: Home },
  { key: 1, href: '/marshals', label: 'Marskalkar', icon: Home },
  { key: 2, href: '/about', label: 'Om oss', icon: Home },
  { key: 3, href: '/contact', label: 'Kontakta oss', icon: Home },
];

const linksSignedIn: Link[] = [
  { key: 0, href: '/', label: 'Hem', icon: Home },
  { key: 1, href: '/marshals', label: 'Marskalkar', icon: Home },
  { key: 2, href: '/about', label: 'Om oss', icon: Home },
  { key: 3, href: '/contact', label: 'Kontakta oss', icon: Home },
  { key: 3, href: '/contact', label: 'Kontakta oss', icon: Home },
  { key: 3, href: '/contact', label: 'Kontakta oss', icon: Home },
  { key: 3, href: '/contact', label: 'Kontakta oss', icon: Home },
  { key: 3, href: '/contact', label: 'Kontakta oss', icon: Home },
  { key: 3, href: '/contact', label: 'Kontakta oss', icon: Home },
];

export function NavigationLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            pathname === link.href
              ? 'bg-muted text-primary'
              : 'text-muted-foreground'
          } hover:text-primary`}>
          <link.icon className="h-4 w-4" />
          {link.label}
        </Link>
      ))}
    </>
  );
}

export function NavigationLinksMobile() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <SheetClose key={link.key} asChild>
          <Link
            key={link.label}
            href={link.href}
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
              pathname === link.href
                ? 'bg-muted text-primary'
                : 'text-muted-foreground'
            } hover:text-foreground`}>
            <link.icon className="h-5 w-5" />
            {link.label}
          </Link>
        </SheetClose>
      ))}
    </>
  );
}

export function NavigationLinksHomePage() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={`transition-colors ${
            pathname === link.href ? 'text-foreground' : 'text-muted-foreground'
          } hover:text-foreground`}>
          {link.label}
        </Link>
      ))}
    </>
  );
}
