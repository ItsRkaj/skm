import EventsClient from '@/components/events-page/EventsClient';
import { removeEvent } from '@/modules/apiClient';
import { getEvents } from '@/modules/apiClient';
import { revalidatePath } from 'next/cache';

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

  return <EventsClient events={events} deleteEvent={deleteEvent} />;
}
