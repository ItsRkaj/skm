'use client';

import { useState } from 'react';
import { signUpUser } from '@/modules/apiClient';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useUser();

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await login({ email, password });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const result = isSignUp
        ? await signUpUser({ email, password })
        : await handleLogin({ email, password });

      if (
        result?.message ===
        (isSignUp ? 'Sign up successful' : 'Login successful')
      ) {
        void router.push(isSignUp ? '/' : '/account');
      } else {
        setError(isSignUp ? 'Sign up failed' : 'Login failed');
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <>
      <button onClick={() => setIsSignUp(false)}>Log in</button>
      <button onClick={() => setIsSignUp(true)}>Sign up</button>

      {/*eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">{isSignUp ? 'Sign up' : 'Log in'}</button>
      </form>
    </>
  );
}
