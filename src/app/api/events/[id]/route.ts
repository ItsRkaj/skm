import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import fetchSignedAvatars from '@/utils/fetchSignedAvatars';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const supabase = createClient();

    const { data: eventData, error: eventError } = await supabase
      .from('events')
      .select('*')
      .eq('id', params.id)
      .single();

    if (eventError) {
      console.error('Error fetching event:', eventError);
      return NextResponse.json(
        { error: eventError.message },
        { status: eventError.code ? parseInt(eventError.code, 10) : 500 },
      );
    }

    if (eventData === null) {
      console.error('No event found with ID:', params.id);
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const { data: attendeesData, error: attendeesError } = await supabase
      .from('event_attendees')
      .select(
        'user_id, users!inner (first_name, last_name, nickname, avatar_url)',
      )
      .eq('event_id', params.id);

    if (attendeesError) {
      console.error('Error fetching attendees:', attendeesError);
      return NextResponse.json(
        { error: attendeesError.message },
        {
          status: attendeesError.code ? parseInt(attendeesError.code, 10) : 500,
        },
      );
    }

    const avatarPaths = attendeesData
      .filter(
        (attendee: { users: { avatar_url: string | null } }) =>
          attendee.users.avatar_url !== null,
      )
      .map(
        (attendee: { users: { avatar_url: string | null } }) =>
          attendee.users.avatar_url!,
      );

    const signedAvatars = await fetchSignedAvatars();

    const avatarUrlMap = new Map<string, string>();
    signedAvatars.forEach((file) => {
      avatarUrlMap.set(file.path, file.signedUrl);
    });

    const transformedAttendees = attendeesData.map(
      (attendee: {
        user_id: string;
        users: {
          first_name: string | null;
          last_name: string | null;
          nickname: string | null;
          avatar_url: string | null;
        };
      }) => ({
        user_id: attendee.user_id,
        first_name: attendee.users.first_name ?? '',
        last_name: attendee.users.last_name ?? '',
        nickname: attendee.users.nickname || undefined,
        avatar_url:
          avatarUrlMap.get(attendee.users.avatar_url!) ||
          attendee.users.avatar_url ||
          '',
      }),
    );

    return NextResponse.json(
      {
        event: eventData,
        attendees: transformedAttendees,
      },
      { status: 200 },
    );
  } catch (e) {
    console.error('Unexpected error:', e);
    return NextResponse.json(
      { error: 'Unexpected error occurred' },
      { status: 500 },
    );
  }
}

interface RequestBody {
  user_id: string;
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const supabase = createClient();
    const { user_id } = (await request.json()) as RequestBody;

    const { data: existingAttendee, error: existingError } = await supabase
      .from('event_attendees')
      .select('*')
      .eq('event_id', params.id)
      .eq('user_id', user_id)
      .single();

    if (existingAttendee) {
      return NextResponse.json(
        { error: 'User is already attending' },
        { status: 400 },
      );
    }

    if (existingError && existingError.code !== 'PGRST116') {
      return NextResponse.json(
        { error: existingError.message },
        { status: 500 },
      );
    }

    const { error } = await supabase.from('event_attendees').insert({
      event_id: Number(params.id),
      user_id,
    });

    if (error) {
      console.error('Error adding attendee:', error);
      return NextResponse.json(
        { error: error.message },
        { status: error.code ? parseInt(error.code, 10) : 500 },
      );
    }

    return NextResponse.json(
      { message: 'User added to event' },
      { status: 200 },
    );
  } catch (e) {
    console.error('Unexpected error:', e);
    return NextResponse.json(
      { error: 'Unexpected error occurred' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const supabase = createClient();
    const { user_id } = (await request.json()) as RequestBody;

    const { data: attendee, error: attendeeError } = await supabase
      .from('event_attendees')
      .select('*')
      .eq('event_id', params.id)
      .eq('user_id', user_id)
      .single();

    if (!attendee) {
      return NextResponse.json(
        { error: 'User is not attending' },
        { status: 404 },
      );
    }

    if (attendeeError) {
      return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 500 },
      );
    }

    const { error } = await supabase
      .from('event_attendees')
      .delete()
      .eq('event_id', params.id)
      .eq('user_id', user_id);

    if (error) {
      console.error('Error removing attendee:', error);
      return NextResponse.json(
        { error: error.message },
        { status: error.code ? parseInt(error.code, 10) : 500 },
      );
    }

    return NextResponse.json(
      { message: 'User removed from event' },
      { status: 200 },
    );
  } catch (e) {
    console.error('Unexpected error:', e);
    return NextResponse.json(
      { error: 'Unexpected error occurred' },
      { status: 500 },
    );
  }
}
