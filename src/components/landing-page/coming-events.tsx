import { getEvents } from '@/modules/apiClient';
import { Event } from '@/modules/apiTypes';
import { formatDate } from '@/utils/dateFormatters';

function EventCard({ event }: { event: Event }) {
  const { month, day, time } = formatDate(new Date(event.start_time));

  return (
    <div className="event-card p-4 rounded-lg flex items-center gap-4 border-2 border-[hsl(var(--secondary))]">
      <div className="overflow-y-auto date-box text-center p-2 rounded-md bg-[hsl(var(--primary))]">
        <p className="text-sm">{month}</p>
        <p className="text-2xl font-bold">{day}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
          {event.title}
        </h3>
        <p className="text-sm text-[hsl(var(--primary))] flex items-center gap-1">
          <span>Tid</span> {time}
        </p>
      </div>
    </div>
  );
}

export default async function EventsSection() {
  const events = await getEvents();

  return (
    <div className="container mx-auto events-section py-8">
      <h2 className="text-2xl mb-6">Våra kommande events!</h2>
      {events && events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.slice(0, 6).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p>Inga kommande events :</p>
      )}
    </div>
  );
}
