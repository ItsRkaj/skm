'use client';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import Avatar from './avatar';
import { signOutUser } from '@/modules/apiClient';
import { useRouter } from 'next/navigation';

export default function AccountForm({ user }: Readonly<{ user: User | null }>) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatar_url] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select(`first_name, nickname, avatar_url`)
          .eq('id', user?.id)
          .single();

        if (error) {
          console.log(error);
        }

        if (data) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setFullname(data.first_name);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setUsername(data.nickname);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setAvatar_url(data.avatar_url);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } else {
        console.error('User ID is undefined');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  async function handleSignOut() {
    const result = await signOutUser();

    if (result && result.message === 'Sign out successful') {
      console.log(result.message);
      void router.push('/');
    } else {
      console.log('Sign out failed');
    }
  }

  useEffect(() => {
    void getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from('users').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) {
        console.log(error);
      }
      alert('Profile updated!');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert('Error updating the data!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <Avatar
        uid={user?.id ?? null}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatar_url(url);
          void updateProfile({ fullname, username, website, avatar_url: url });
        }}
      />
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={user?.email} disabled />
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={fullname ?? ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username ?? ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="url"
          value={website ?? ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={() =>
            updateProfile({ fullname, username, website, avatar_url })
          }
          disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button
          className="button block"
          type="button"
          onClick={() => {
            void handleSignOut();
          }}>
          Sign out
        </button>
      </div>
    </div>
  );
}
