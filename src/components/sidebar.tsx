'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const Sidebar = () => {
  const { isLoggedIn } = useUser();
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  if (!isLoggedIn) {
    return null;
  }

  return (
    <aside className="md:w-64 md:max-h-screen bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border rounded-lg  md:fixed flex-shrink-0 flex justify-center items-center ">
      <nav className="p-6">
        <ul className="space-y-6 text-center">
          <li>
            <Link
              href="/account"
              className={`text-lg font-medium ${
                isActive('/account')
                  ? 'text-[hsl(var(--primary))]'
                  : 'hover:text-[hsl(var(--primary))]'
              }`}>
              Min profile
            </Link>
          </li>
          <li>
            <Link
              href="/invite-user"
              className={`text-lg font-medium ${
                isActive('/invite-user')
                  ? 'text-[hsl(var(--primary))]'
                  : 'hover:text-[hsl(var(--primary))]'
              }`}>
              Bjuda in användare
            </Link>
          </li>
          <li>
            <Link
              href="/add-event"
              className={`text-lg font-medium ${
                isActive('/add-event')
                  ? 'text-[hsl(var(--primary))]'
                  : 'hover:text-[hsl(var(--primary))]'
              }`}>
              Skapa ett evenemang
            </Link>
          </li>
          <li>
            <Link
              href="/add-news"
              className={`text-lg font-medium ${
                isActive('/add-news')
                  ? 'text-[hsl(var(--primary))]'
                  : 'hover:text-[hsl(var(--primary))]'
              }`}>
              Lägga till nyheter
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
export default Sidebar;
