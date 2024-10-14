import { getAvatars } from '@/modules/apiClient';
import { avatarUrlPath } from '@/modules/apiTypes';
import QuickLRU from 'quick-lru';

const cache = new QuickLRU<string, { path: string; signedUrl: string }[]>({
  maxSize: 100,
});

const CACHE_DURATION = 1000 * 60 * 5;
let lastFetchTime = 0;

export default async function fetchSignedAvatars(): Promise<
  { path: string; signedUrl: string }[]
> {
  const now = Date.now();

  const cachedAvatars = cache.get('signedAvatars');

  if (cachedAvatars && now - lastFetchTime < CACHE_DURATION) {
    return cachedAvatars;
  }

  const response = (await getAvatars()) as avatarUrlPath[];

  if (!response) {
    throw new Error('Failed to fetch signed avatars');
  }

  cache.set('signedAvatars', response);
  lastFetchTime = now;

  return response;
}
