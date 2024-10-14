import {
  Marshal,
  LeaderboardEntry,
  Event,
  EventWithAttendees,
  Quote,
  QuoteInsert,
  News,
  UserProfile,
  NewsInsert,
  marshalsInsert,
} from '@/modules/apiTypes';
import createClient from 'openapi-fetch';
import type { paths } from '@/generated/api';

const client = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL
    ? process.env.NEXT_PUBLIC_BASE_URL
    : 'http://localhost:3000',
});

export async function getMarshals(): Promise<Marshal[] | undefined> {
  try {
    const response = await client.GET('/api/marshals');
    if (response.response.ok) {
      return response.data;
    } else {
      console.error('Failed to fetch marshals', response.response.status);
      return undefined;
    }
  } catch (e) {
    console.error('Error: ', e);
    return undefined;
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

export async function getQuotes(): Promise<Quote[] | undefined> {
  try {
    const response = await client.GET('/api/quotes');
    if (response.response.ok) {
      return response.data;
    } else {
      console.error('Failed to fetch quotes', response.response.status);
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

export async function removeEvent(id: string): Promise<boolean> {
  try {
    const response = await client.DELETE('/api/events', {
      body: { id },
    });

    if (response.response.ok) {
      return true;
    } else {
      console.error('Failed to delete event', response.response.status);
      return false;
    }
  } catch (e) {
    console.error('Error: ', e);
    return false;
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

export async function putLeaderboard(
  id: string,
  sewnPatches: number,
  notSewnPatches: number,
  medals: number,
  pins: number,
): Promise<boolean> {
  try {
    const response = await client.PUT(`/api/leaderboard`, {
      body: {
        id,
        sewn_patches: sewnPatches,
        not_sewn_patches: notSewnPatches,
        medals,
        pins,
      },
    });

    if (response.response.ok) {
      return true;
    } else {
      console.error('Failed to update leaderboard: ', response.response.status);
      return false;
    }
  } catch (e) {
    console.error('Error updating leaderboard: ', e);
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
    console.error(error);
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

export async function addQuote(newQuote: QuoteInsert) {
  try {
    const response = await client.POST('/api/quotes', { body: newQuote });

    if (response.response.status === 200) {
      return { message: 'Quote added successfully' };
    } else {
      console.error('Unexpected response status:', response.response.status);
      return { message: 'Failed to add quote' };
    }
  } catch (error) {
    console.error('Error adding quote:', error);
  }
}

export async function addNews(newNews: NewsInsert) {
  try {
    const response = await client.POST('/api/news', { body: newNews });

    if (response.response.status === 200) {
      return { message: 'News added successfully' };
    } else {
      console.error('Unexpected response status:', response.response.status);
      return { message: 'Failed to add news' };
    }
  } catch (error) {
    console.error('Error adding news:', error);
  }
}

export async function addMarshal(newmarshal: marshalsInsert) {
  try {
    const response = await client.POST('/api/marshals', { body: newmarshal });
    if (response.response.status === 200) {
      return { message: 'marshal added successfully' };
    } else {
      console.error('Unexpected response status:', response.response.status);
      return { message: 'Failed to add marshals' };
    }
  } catch (error) {
    console.error('Error adding news:', error);
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
    console.error(error);
  }
}

export async function getUser(): Promise<UserProfile | undefined> {
  try {
    const response = await client.GET('/api/user');
    if (response.response.status === 200) {
      return response.data;
    }
    return undefined;
  } catch (e) {
    console.error(e);
  }
}

export async function getNews(): Promise<News[] | undefined> {
  try {
    const response = await client.GET('/api/news');
    if (response.response.ok) {
      return response.data;
    } else {
      console.error('Failed to fetch news', response.response.status);
      return undefined;
    }
  } catch (e) {
    console.error('Error: ', e);
    return undefined;
  }
}
