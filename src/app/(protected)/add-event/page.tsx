import { revalidatePath } from 'next/cache';
import EventForm from './event-form';

/* eslint-disable */
const updateEvents = async () => {
  'use server';
  revalidatePath('/events');
};
/* eslint-enable */

export default function AddEvent() {
  return <EventForm updateEvents={updateEvents} />;
}
