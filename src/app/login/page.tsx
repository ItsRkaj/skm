'use client';

import { useState } from 'react';
import { logInUser, signUpUser } from '@/modules/apiClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Clear any previous errors
    setError(null);

    try {
      const result = await logInUser({ email, password });
      if (result?.message === 'Login successful') {
        // Redirect or handle successful login
        window.location.href = '/account'; // Example redirection
      } else {
        // Handle failed login
        setError('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred');
    }
  };

  const handleSubmitSignup = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    // Clear any previous errors
    setError(null);

    try {
      const result = await signUpUser({ email, password });
      if (result?.message === 'Sign up successful') {
        // Redirect or handle successful login
        window.location.href = '/'; // Example redirection
      } else {
        // Handle failed login
        setError('Sign up failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <>
      <p>Log in</p>
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
        <button type="submit">Log in</button>
      </form>

      <p>Sign up</p>
      {/*eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
      <form onSubmit={handleSubmitSignup}>
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
        <button type="submit">Sign up</button>
      </form>
    </>
  );
}
