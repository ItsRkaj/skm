import {
  Marshal,
  LeaderboardEntry,
  Event,
  EventWithAttendees,
} from '@/modules/apiTypes';
import createClient from 'openapi-fetch';
import type { paths } from '@/generated/api';
import { User } from '@supabase/supabase-js';

const client = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL
    ? process.env.NEXT_PUBLIC_BASE_URL
    : 'http://localhost:3000',
});

export async function getMarshals(): Promise<Marshal[] | undefined> {
  try {
    const response = await client.GET('/api/marshals');
    if (response.response.status === 200) {
      return response.data;
    }
    return undefined;
  } catch (e) {
    console.log(e);
  }
}

export async function getLeaderboard(): Promise<
  LeaderboardEntry[] | undefined
> {
  try {
    const response = await client.GET('/api/leaderboard');
    if (response.response.ok) {
      return response.data;
    } else {
      console.error('Failed to fetch leaderboard: ', response.response.status);
      return undefined;
    }
  } catch (e) {
    console.error('Error: ', e);
    return undefined;
  }
}

export async function getEvents(): Promise<Event[] | undefined> {
  try {
    const response = await client.GET('/api/events');
    if (response.response.ok) {
      return response.data;
    } else {
      console.error('Failed to fetch events', response.response.status);
      return undefined;
    }
  } catch (e) {
    console.error('Error: ', e);
    return undefined;
  }
}

export async function getEvent(
  id: string,
): Promise<EventWithAttendees | undefined> {
  try {
    const response = await client.GET('/api/events/{id}', {
      params: {
        path: { id },
      },
    });

    if (response.response.ok) {
      return response.data;
    } else {
      console.error(
        'Failed to fetch event or event not found',
        response.response.status,
      );
      return undefined;
    }
  } catch (e) {
    console.error('Error: ', e);
    return undefined;
  }
}

export async function addAttendee(
  event_id: string,
  user_id: string,
): Promise<boolean> {
  try {
    const response = await client.POST('/api/events/{id}', {
      params: {
        path: { id: event_id },
      },
      body: {
        user_id: user_id,
      },
    });

    if (!response.response.ok) {
      console.error('Failed to add attendee', response.response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error adding attendee:', error);
    return false;
  }
}

export async function removeAttendee(
  event_id: string,
  user_id: string,
): Promise<boolean> {
  try {
    const response = await client.DELETE('/api/events/{id}', {
      params: {
        path: { id: event_id },
      },
      body: {
        user_id: user_id,
      },
    });

    if (!response.response.ok) {
      console.error('Failed to remove attendee', response.response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error removing attendee:', error);
    return false;
  }
}

export async function logInUser(formData: {
  email: string;
  password: string;
}): Promise<{ message: string } | undefined> {
  try {
    const response = await client.POST('/api/login', { body: formData });

    if (response.response.status === 200) {
      return { message: 'Login successful' };
    } else {
      console.error('Unexpected response status:', response.response.status);
      return { message: 'Login failed' };
    }
  } catch (error) {
    console.log(error);
  }
}

export async function signOutUser(): Promise<{ message: string } | undefined> {
  try {
    const response = await client.POST('/api/signout');

    if (response.response.status === 200) {
      return { message: 'Sign out successful' };
    } else {
      console.error('Unexpected response status:', response.response.status);
      return { message: 'Sign out failed' };
    }
  } catch (error) {
    console.error('Error during sign out:', error);
  }
}

export async function signUpUser(formData: {
  email: string;
  password: string;
}): Promise<{ message: string } | undefined> {
  try {
    const response = await client.POST('/api/signup', { body: formData });

    if (response.response.status === 200) {
      return { message: 'Sign up successful' };
    } else {
      console.error('Unexpected response status:', response.response.status);
      return { message: 'Sign up failed' };
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(): Promise<User | undefined> {
  try {
    const response = await client.GET('/api/user');
    if (response.response.status === 200) {
      return response.data as User;
    }
    return undefined;
  } catch (e) {
    console.log(e);
  }
}
