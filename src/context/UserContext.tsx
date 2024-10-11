'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUser, logInUser, signOutUser } from '@/modules/apiClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

interface UserContextType {
  isLoggedIn: boolean;
  user: User | undefined;
  loading: boolean; // Add loading state
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const user = await getUser();

      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(undefined);
      }

      setLoading(false);
    }

    fetchUser();
  }, []);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const result = await logInUser({ email, password });
      if (result?.message === 'Login successful') {
        console.log('YUU');
        setIsLoggedIn(true);
        router.push('/account');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const signOut = async () => {
    await signOutUser();
    setIsLoggedIn(false);
    setUser(undefined);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, user, loading, login, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
