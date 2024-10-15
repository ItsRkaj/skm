import { Suspense } from 'react';
import EventInformation from '@/components/events-page/EventInformation';
import { revalidatePath } from 'next/cache';
import { Loader2 } from 'lucide-react';

// Revalidate the cache every 5 minutes
export const revalidate = 0;

/* eslint-disable */
const updateEvent = async () => {
  'use server';
  revalidatePath('/events/[id]', 'page');
};
/* eslint-enable */

interface EventDataProps {
  id: string;
}

const EventData: React.FC<EventDataProps> = async ({ id }) => {
  const { getEvent } = await import('@/modules/apiClient');
  const event = await getEvent(id);

  if (!event) {
    return (
      <h1 className="text-3xl font-bold mb-4">Kunde inte hitta eventet :(</h1>
    );
  }

  const {
    title,
    location,
    invitation_type,
    start_time,
    end_time,
    description,
    registration_link,
    organizer,
    price,
    registration_deadline,
  } = event.event;

  const startDate = new Date(start_time);
  const endDate = new Date(end_time);
  const regDeadline = registration_deadline
    ? new Date(registration_deadline)
    : null;

  return (
    <EventInformation
      title={title}
      location={location}
      invitation_type={invitation_type}
      startDate={startDate}
      endDate={endDate}
      description={description}
      registration_link={registration_link}
      organizer={organizer}
      price={price}
      registration_deadline={regDeadline}
      attendees={event.attendees ?? []}
      event_id={id}
      updateEvent={updateEvent}
    />
  );
};

export default function Event({ params }: { params: { id: string } }) {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
          </div>
        }>
        <EventData id={params.id} />
      </Suspense>
    </>
  );
}
