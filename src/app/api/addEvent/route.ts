import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// Define the expected structure of the incoming JSON data
interface EventData {
  title: string;
  description: string;
  location: string;
  organizer: string;
  start_time: string; // If you're using ISO string for dates, otherwise Date
  end_time: string; // If you're using ISO string for dates, otherwise Date
  price: number;
  registration_deadline: string; // If you're using ISO string for dates, otherwise Date
  registration_link: string;
}

export async function POST(request: Request) {
  try {
    // Parse and type the incoming request body
    const {
      title,
      description,
      location,
      organizer,
      start_time,
      end_time,
      price,
      registration_deadline,
      registration_link,
    } = (await request.json()) as EventData; // Type assertion to EventData

    const supabase = createClient();

    // Insert data into the 'events' table with proper typing
    const { error } = await supabase.from('events').insert([
      {
        title,
        description,
        location,
        organizer,
        start_time,
        end_time,
        price,
        registration_deadline,
        registration_link,
      },
    ]);

    if (error) {
      return NextResponse.json(
        { message: 'Error inserting data:' },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { message: 'Data inserted successfully' },
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
