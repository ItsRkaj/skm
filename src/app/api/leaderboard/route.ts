import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('leaderboard')
      .select('*, users!inner (first_name, last_name, avatar_url, nickname)');

    if (error) {
      console.error('Error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: error.code ? parseInt(error.code) : 500 },
      );
    }

    const response = data.map((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { id, users, sewn_patches, not_sewn_patches, medals, pins } = item;

      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        total_patches: sewn_patches + not_sewn_patches,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        sewn_patches,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        not_sewn_patches,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        medals,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        pins,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        person: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          id,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          name:
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (users.first_name as string) +
            ' ' +
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            users.last_name,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
          nickname: users?.nickname,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          avatar: users.avatar_url as string,
        },
      };
    });

    return NextResponse.json(response, { status: 200 });
  } catch (e) {
    console.error('Unexpected error:', e);
    return NextResponse.json(
      { error: 'Unexpected error occurred' },
      { status: 500 },
    );
  }
}

interface RequestBody {
  id: string;
  sewn_patches: number;
  not_sewn_patches: number;
  medals: number;
  pins: number;
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as Partial<RequestBody>;

    if (
      typeof body.id !== 'string' ||
      typeof body.sewn_patches !== 'number' ||
      typeof body.not_sewn_patches !== 'number' ||
      typeof body.medals !== 'number' ||
      typeof body.pins !== 'number'
    ) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 },
      );
    }

    const { id, sewn_patches, not_sewn_patches, medals, pins } =
      body as RequestBody;

    const supabase = createClient();

    const { error } = await supabase
      .from('leaderboard')
      .update({ sewn_patches, not_sewn_patches, medals, pins })
      .eq('id', id);

    if (error) {
      console.error('Error ', error);
      return NextResponse.json(
        { error: error.message },
        { status: error.code ? parseInt(error.code, 10) : 500 },
      );
    }
    return NextResponse.json('Score updated successfully', { status: 200 });
  } catch (e) {
    console.error('Unexpected error: ', e);
    return NextResponse.json(
      { error: 'Unexpected error occurred' },
      { status: 500 },
    );
  }
}
