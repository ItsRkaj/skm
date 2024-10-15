'use client';

import {
  RocketIcon,
  SewingPinFilledIcon,
  ClockIcon,
} from '@radix-ui/react-icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatSwedishDate, formatTime } from '@/utils/dateFormatters';
import { useState } from 'react';
import AttendeeBanner from '@/components/events-page/AttendeeBanner';
import { Attendee } from '@/modules/apiTypes';
import { useUser } from '@/context/UserContext';
import { addAttendee, removeAttendee } from '@/modules/apiClient';
import { Loader2 } from 'lucide-react';

interface EventInformationProps {
  title: string;
  location: string;
  invitation_type: string;
  startDate: Date;
  endDate: Date;
  description: string | null | undefined;
  registration_link: string | null | undefined;
  organizer: string;
  price: number;
  registration_deadline: Date | null;
  attendees: Attendee[];
  event_id: string;
  updateEvent: () => Promise<void>;
}

const EventInformation: React.FC<EventInformationProps> = ({
  title,
  location,
  invitation_type,
  startDate,
  endDate,
  description,
  registration_link,
  organizer,
  price,
  registration_deadline,
  attendees,
  event_id,
  updateEvent,
}) => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [registered, setRegistered] = useState(() => {
    return (
      attendees.findIndex((attendee) => attendee.user_id === user?.id) !== -1
    );
  });

  if (!user) {
    return null;
  }

  const handleRegister = async () => {
    setLoading(true);
    let success = false;

    if (registered) {
      success = await removeAttendee(event_id, user.id as string);
    } else {
      success = await addAttendee(event_id, user.id as string);
    }

    if (success) {
      await updateEvent();
      setRegistered((registered) => !registered);
    } else {
      console.error('Failed to update attendee status');
    }
    setLoading(false);
  };

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
            Anmälningslänk:{' '}
            <a className="text-primary" href={registration_link}>
              {registration_link}
            </a>
            {registration_deadline &&
              ` (Stänger ${formatSwedishDate(registration_deadline)})`}
          </p>
        )}
        <p className="italic">Arrangör: {organizer}</p>
        <p className="italic">Pris: {price + ' kr'}</p>
      </div>

      <div className="flex flex-col w-full items-center gap-3 my-12">
        <div className="flex gap-2 items-center">
          <RocketIcon />
          <p>{attendees.length} personer deltar</p>
          <RocketIcon />
        </div>
        {/* eslint-disable-next-line */}
        <Button
          className="w-64 h-16 text-xl font-semibold"
          onClick={() => {
            void handleRegister();
          }}
          disabled={loading}
          variant={registered ? 'destructive' : 'default'}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : registered ? (
            'Ta bort mig'
          ) : (
            'Delta'
          )}
        </Button>
        {registration_deadline && (
          <p className="italic">
            Senast - {formatSwedishDate(registration_deadline)}
          </p>
        )}
      </div>

      <div className="w-full">
        <h2 className="text-2xl text-center mb-12">Deltagare</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {attendees.length > 0
            ? attendees.map((attendee) => (
                <AttendeeBanner
                  key={attendee.first_name + attendee.last_name}
                  name={`${attendee.first_name} ${attendee.last_name}`}
                  nickname={attendee.nickname ?? ''}
                  avatar={attendee.avatar_url ?? ''}
                />
              ))
            : 'Inga deltagare'}
        </div>
      </div>
    </div>
  );
};

export default EventInformation;
