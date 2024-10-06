import { Suspense } from 'react';
import {
  RocketIcon,
  SewingPinFilledIcon,
  ClockIcon,
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatSwedishDate, formatTime } from '@/utils/dateFormatters';
import AttendeeBanner from '@/components/events-page/AttendeeBanner';

interface EventDataProps {
  id: string;
}

const EventDetail: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => <p className="italic">{`${label}: ${value}`}</p>;

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
  } = event;

  const startDate = new Date(start_time);
  const endDate = new Date(end_time);
  const regDeadline = registration_deadline
    ? new Date(registration_deadline)
    : null;

  return (
    <div className="px-4">
      <div className="flex justify-between mb-12">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className="flex items-center">
            <SewingPinFilledIcon className="mr-1" />
            <p className="italic">{location}</p>
          </div>
          <Badge className="w-fit" variant={'secondary'}>
            {invitation_type}
          </Badge>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <h1 className="text-3xl font-bold">{formatSwedishDate(startDate)}</h1>
          <div className="flex items-center justify-end">
            <ClockIcon className="pr-1" />
            <p className="italic pr-1">
              {formatTime(startDate)} - {formatTime(endDate)}
            </p>
          </div>
        </div>
      </div>
      <p>{description}</p>
      <div className="flex flex-col gap-1 mt-12">
        {registration_link && (
          <p className="italic">
            Anmälningslänk: {registration_link}
            {regDeadline && ` (Stänger ${formatSwedishDate(regDeadline)})`}
          </p>
        )}
        <EventDetail label="Arrangör" value={organizer} />
        {<EventDetail label="Pris" value={`${price} kr`} />}
      </div>
      <div className="flex flex-col w-full items-center gap-3 my-12">
        <div className="flex gap-2 items-center">
          <RocketIcon />
          <p>- personer deltar</p>
          <RocketIcon />
        </div>
        <Button className="w-64 h-16 text-xl font-semibold">Delta</Button>
        {regDeadline && (
          <p className="italic">Senast - {formatSwedishDate(regDeadline)}</p>
        )}
      </div>
      <div className="w-full">
        <h2 className="text-2xl text-center mb-12">Deltagare</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {
            // Here render all the attendees
            <AttendeeBanner name="El cuh" nickname="El cabron" />
          }
        </div>
      </div>
    </div>
  );
};

export default function Event({ params }: { params: { id: string } }) {
  return (
    <>
      <Suspense fallback={<p>Laddar...</p>}>
        <EventData id={params.id} />
      </Suspense>
    </>
  );
}
