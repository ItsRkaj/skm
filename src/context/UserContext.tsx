'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { getUser, logInUser, signOutUser } from '@/modules/apiClient';
import { useRouter } from 'next/navigation';
import { UserProfile } from '@/modules/apiTypes';
import { createClient } from '@/utils/supabase/client';

interface UserContextType {
  isLoggedIn: boolean;
  user: UserProfile | undefined;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          const user = await getUser();
          setIsLoggedIn(!!user);
          setUser(user);
        }
      } catch (error) {
        console.error('Failed to fetch user session:', error);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchUser();
  }, [supabase.auth]);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    setIsLoading(true);

    try {
      const result = await logInUser({ email, password });

      if (result?.message === 'Login successful') {
        setIsLoggedIn(true);

        const userData = await getUser();
        setUser(userData);

        router.push('/account');

        return true;
      } else {
        console.error('Login failed: Invalid credentials or other error.');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      const success = await signOutUser();
      if (success) {
        setIsLoggedIn(false);
        setUser(undefined);
        router.replace('/');
        if (typeof window !== 'undefined') {
          window.onpopstate = function () {
            window.location.href = '/login';
          };
        }
      } else {
        console.error('Sign out failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      user,
      login,
      signOut,
      isLoading,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoggedIn, user, isLoading],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
