import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    // eslint-disable-next-line
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // eslint-disable-next-line
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            // eslint-disable-next-line
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // refreshing the auth token
  await supabase.auth.getUser();

  return supabaseResponse;
}
