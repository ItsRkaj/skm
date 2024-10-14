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

interface UserContextType {
  isLoggedIn: boolean;
  user: UserProfile | undefined;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      try {
        const user = await getUser();
        setIsLoggedIn(!!user);
        setUser(user);
      } catch (error) {
        console.error('Failed to fetch user session:', error);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchUser();
  }, []);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      const result = await logInUser({ email, password });
      if (result?.message === 'Login successful') {
        setIsLoggedIn(true);
        setUser(await getUser());
        router.push('/account');
      }
    } catch (error) {
      console.error('Login error:', error);
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
