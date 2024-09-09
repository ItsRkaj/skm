import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { email, password } = await request.json();

    const supabase = createClient();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return NextResponse.json({ message: 'Sign up failed' }, { status: 401 });
    }

    return NextResponse.json(
      { message: 'Sign up successful' },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
