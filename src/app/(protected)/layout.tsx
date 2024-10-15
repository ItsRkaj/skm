// app/(protected)/layout.tsx (or wherever your protected routes are)
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  // Fetch the authenticated user from the server
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  // If the user is authenticated, render the protected content
  return <div>{children}</div>;
}
