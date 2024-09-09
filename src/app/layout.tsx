import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Systrarna KM',
  description: 'Välkommen till Systrarna KM',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <div>
            <Link href="/" className="p-3">
              Home
            </Link>
            <Link href="/marshals" className="p-3">
              Marshals
            </Link>
            <Link href="/login" className="p-3">
              Login
            </Link>
            <ModeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
