import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { UserProvider } from '@/context/UserContext';
import { Toaster } from '@/components/ui/toaster';
import LayoutHandler from '@/components/LayoutHandler';

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
  return (
    <html lang="sv" suppressHydrationWarning>
      <body className={inter.className}>
        <UserProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <LayoutHandler>{children}</LayoutHandler>
          </ThemeProvider>
        </UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
