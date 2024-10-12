import EventCard from '@/components/events-page/EventCard';
import { removeEvent } from '@/modules/apiClient';
import { getEvents } from '@/modules/apiClient';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

const deleteEvent = async (eventId: string) => {
  'use server';
  const success = await removeEvent(eventId);
  if (success) {
    revalidatePath('/events/', 'page');
    return true;
  } else {
    return false;
  }
};

export default async function Events() {
  const events = await getEvents();

  if (!events) {
    return <p>Hittade inga evenemang :(</p>;
  }

  return (
    <div className="container mx-auto py-8 flex flex-col gap-8">
      <h2 className="text-2xl font-serif mb-6">KOMMANDE EVENEMANG</h2>
      {events?.map((event) => {
        return (
          <Link key={event.id} href={`/events/${event.id}`}>
            <EventCard event={event} removeEvent={deleteEvent} />
          </Link>
        );
      })}
    </div>
  );
}
