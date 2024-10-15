import { revalidatePath } from 'next/cache';
import EventForm from './event-form';

const updateEvents = async () => {
  'use server';
  revalidatePath('/events');
};

export default function AddEvent() {
  return <EventForm updateEvents={updateEvents} />;
}
