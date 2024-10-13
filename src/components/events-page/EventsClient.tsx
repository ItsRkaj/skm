'use client';

import { Event } from '@/modules/apiTypes';
import { formatDate } from '@/utils/dateFormatters';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { TrashIcon } from '@radix-ui/react-icons';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';

interface EventCardProps {
  event: Event;
  removeEvent: (eventId: string) => Promise<boolean>;
}

function EventCard({ event, removeEvent }: EventCardProps) {
  const {
    month,
    day,
    time: startTime,
  } = formatDate(new Date(event.start_time));
  const { time: endTime } = formatDate(new Date(event.end_time));

  const { user } = useUser();
  const { toast } = useToast();

  return (
    <div className="p-4 rounded-lg flex justify-between border border-[hsl(var(--secondary))]">
      <div className="flex gap-4">
        <div className="overflow-y-auto date-box text-center p-2 rounded-md bg-[hsl(var(--primary))]">
          <p className="text-sm">{month}</p>
          <p className="text-2xl font-bold">{day}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
            {event.title}
          </h3>
          <p className="text-sm text-[hsl(var(--primary))] flex items-center gap-1">
            {startTime} - {endTime}
          </p>
          <Badge className="w-fit" variant={'secondary'}>
            {event.invitation_type}
          </Badge>
        </div>
      </div>
      <div className="flex items-center justify-center pr-4 z-50">
        {user?.profile?.role === 1 && (
          <Button
            variant="destructive"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              void (async () => {
                if (await removeEvent(String(event.id))) {
                  toast({
                    description: 'Evenemang borttaget.',
                  });
                } else {
                  toast({
                    description: 'Något gick fel.',
                  });
                }
              })();
            }}>
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

function EventsClient({
  events,
  deleteEvent,
}: {
  events: Event[];
  deleteEvent: (eventId: string) => Promise<boolean>;
}) {
  const { user } = useUser();

  return (
    <div className="container mx-auto py-8 flex flex-col gap-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-serif mb-6">KOMMANDE EVENEMANG</h2>
        {user?.profile?.role === 1 && <Button>Skapa event</Button>}
      </div>
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

export default EventsClient;
