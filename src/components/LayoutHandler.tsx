'use client';

import { useUser } from '@/context/UserContext';
import { DashboardNavbar } from './dashboard-navbar';
import { Navbar } from './navbar';

export default function LayoutHandler({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  return user ? (
    <DashboardNavbar>{children}</DashboardNavbar>
  ) : (
    <>
      <Navbar />
      <main className="px-4 py-4 md:px-6 md:py-6">{children}</main>
    </>
  );
}
