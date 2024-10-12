import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('news').select('*');
    if (error) {
      console.error('Error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: error.code ? parseInt(error.code) : 500 },
      );
    }
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error('Unexpected error:', e);
    return NextResponse.json(
      { error: 'Unexpected error occurred' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { title, text, author, date } = await request.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const supabase = createClient();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data, error } = await supabase

      .from('news')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      .insert([{ title, text, author, date }]);

    if (error) {
      console.error('Error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: error.code ? parseInt(error.code) : 500 },
      );
    }
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error('Unexpected error:', e);
    return NextResponse.json(
      { error: 'Unexpected error occurred' },
      { status: 500 },
    );
  }
}
