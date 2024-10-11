import { paths, components } from '@/generated/api';

export type MarshalsRequest =
  paths['/api/marshals']['get']['responses']['200']['content']['application/json'];

export type Marshal = components['schemas']['Marshal'];

export type LeaderboardEntry = components['schemas']['LeaderboardEntry'];

export type Event = components['schemas']['Event'];

export type Attendee = {
  user_id: string;
  first_name: string;
  last_name: string;
  nickname?: string;
};

export type EventWithAttendees = {
  event: Event;
  attendees?: Attendee[];
};
