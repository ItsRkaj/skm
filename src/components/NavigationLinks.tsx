'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Contact,
  Home,
  Info,
  LucideIcon,
  Newspaper,
  PartyPopper,
  Quote,
  Shirt,
  User,
  Users,
} from 'lucide-react';
import { SheetClose } from './ui/sheet';
import { useUser } from '@/context/UserContext';

interface LinkItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const publicLinks: LinkItem[] = [
  { href: '/', label: 'Hem', icon: Home },
  { href: '/marshals', label: 'Marskalkar', icon: Users },
  { href: '/about', label: 'Om oss', icon: Info },
  { href: '/contact', label: 'Kontakta oss', icon: Contact },
];

const privateLinks: LinkItem[] = [
  ...publicLinks,
  { href: '/ovve', label: 'Ovve', icon: Shirt },
  { href: '/events', label: 'Evenemang', icon: PartyPopper },
  { href: '/add-news', label: 'Skapa nyhet', icon: Newspaper },
  { href: '/add-marshal', label: 'Skapa marskalk', icon: User },
  { href: '/quotes', label: 'Citat', icon: Quote },
];

const getLinkClasses = (
  pathname: string,
  href: string,
  activeClasses: string,
  inactiveClasses: string,
) => (pathname === href ? activeClasses : inactiveClasses);

function NavigationList({
  links,
  className,
}: {
  links: LinkItem[];
  className: string;
}) {
  const pathname = usePathname();
  return (
    <>
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          className={`${className} ${getLinkClasses(pathname, href, 'bg-muted text-primary', 'text-muted-foreground')}`}>
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </>
  );
}

export function NavigationLinks() {
  const { isLoggedIn } = useUser();
  const links = isLoggedIn ? privateLinks : publicLinks;
  return (
    <NavigationList
      links={links}
      className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
    />
  );
}

export function NavigationLinksMobile() {
  const { isLoggedIn } = useUser();
  const pathname = usePathname();
  const links = isLoggedIn ? privateLinks : publicLinks;
  return (
    <>
      {links.map(({ href, label, icon: Icon }) => (
        <SheetClose key={label} asChild>
          <Link
            href={href}
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2
              ${getLinkClasses(
                pathname,
                href,
                'bg-muted text-primary',
                'text-muted-foreground',
              )} hover:text-foreground`}>
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        </SheetClose>
      ))}
    </>
  );
}

export function NavigationLinksHomePage() {
  const { isLoggedIn } = useUser();
  const pathname = usePathname();
  const links = isLoggedIn ? privateLinks : publicLinks;
  return (
    <>
      {links.map(({ href, label }) => (
        <Link
          key={label}
          href={href}
          className={`transition-colors ${getLinkClasses(pathname, href, 'text-foreground', 'text-muted-foreground')} hover:text-foreground`}>
          {label}
        </Link>
      ))}
    </>
  );
}
