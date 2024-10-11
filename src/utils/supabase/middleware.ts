import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Fetch the user from Supabase session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // List of public routes (those that don't require authentication)
  const publicPaths = [
    '/marshals',
    '/about',
    '/contact',
    '/about',
    '/login',
    '/',
  ];

  // Check if the request is for a protected route
  const isPublicRoute = publicPaths.some(
    (path) => request.nextUrl.pathname === path,
  );

  // If user is not logged in and the route is not public, redirect to login
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
