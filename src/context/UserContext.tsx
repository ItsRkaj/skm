'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUser, logInUser, signOutUser } from '@/modules/apiClient';
import { useRouter } from 'next/navigation';
import { UserResponse } from '@supabase/supabase-js';

interface UserContextType {
  isLoggedIn: boolean;
  user: UserResponse | undefined;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserResponse | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      setIsLoggedIn(user !== undefined && user !== null);
      setUser(user);
    }
    if (isLoggedIn) {
      void fetchUser();
    } else {
      setUser(undefined);
    }
  }, [isLoggedIn]);

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
        setIsLoggedIn(true);
        void router.push('/account');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const signOut = async () => {
    await signOutUser();
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, user, login, signOut }}>
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
