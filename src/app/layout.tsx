import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { UserProvider } from '@/context/UserContext';
import { Toaster } from '@/components/ui/toaster';
import { createClient } from '@/utils/supabase/server';
import { DashboardNavbar } from '@/components/dashboard-navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Systrarna KM',
  description: 'Välkommen till Systrarna KM',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="sv" suppressHydrationWarning>
      <body className={inter.className}>
        <UserProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {session ? (
              <DashboardNavbar>{children}</DashboardNavbar>
            ) : (
              <>
                <Navbar />
                <main className="px-4 py-4 md:px-6 md:py-6">{children}</main>
              </>
            )}
          </ThemeProvider>
        </UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
