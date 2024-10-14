import { paths, components } from '@/generated/api';

export type MarshalsRequest =
  paths['/api/marshals']['get']['responses']['200']['content']['application/json'];

export type Marshal = components['schemas']['Marshal'];

export type News = components['schemas']['News'];

export type LeaderboardEntry = components['schemas']['LeaderboardEntry'];

export type Event = components['schemas']['Event'];

export type Attendee = {
  user_id: string;
  first_name: string;
  last_name: string;
  nickname?: string;
  avatar_url?: string;
};

export type EventWithAttendees = {
  event: Event;
  attendees?: Attendee[];
};

export type Quote = components['schemas']['Quote'];

export type QuoteInsert = { quotetext: string; author: string };

export type UserProfile = components['schemas']['UserProfile'];

export type NewsInsert = {
  title: string;
  text: string;
  author: string;
  date: string;
};

export type marshalsInsert = {
  name: string;
  phone: string;
  email: string;
  location: string;
};

export type avatarUrl = {
  signedUrl: string;
};

export type avatarUrlPath = avatarUrl & { path: string };
