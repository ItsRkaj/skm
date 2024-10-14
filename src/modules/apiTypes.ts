import { paths, components } from '@/generated/api';

export type MarshalsRequest =
  paths['/api/marshals']['get']['responses']['200']['content']['application/json'];

export type Marshal = components['schemas']['Marshal'];

export type News = components['schemas']['News'];

export type LeaderboardEntry = components['schemas']['LeaderboardEntry'];

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
