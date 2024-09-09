'use client';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import Avatar from './avatar';

export default function AccountForm({ user }: Readonly<{ user: User | null }>) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatar_url] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
      }

      if (data) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setFullname(data.full_name);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setUsername(data.username);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setWebsite(data.website);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setAvatar_url(data.avatar_url);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

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

      const { error } = await supabase.from('profiles').upsert({
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
        <form action="/api/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
