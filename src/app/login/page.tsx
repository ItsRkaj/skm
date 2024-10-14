'use client';

import { useState } from 'react';
import { signUpUser } from '@/modules/apiClient';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSignUp] = useState(false);
  const { login } = useUser();

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await login({ email, password });
      return { message: 'Login successful' };
    } catch (error) {
      console.error('Login error:', error);
      return { message: 'Login failed' };
    }
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
    <div className="flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void handleSubmit(e);
        }}
        className="w-full max-w-sm">
        <Card className="p-8 space-y-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Logga in</CardTitle>
            <CardDescription>
              Ange din e-postadress nedan för att logga in på ditt konto.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Lösenord</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* Error message */}
            {error && <p className="text-sm text-red-500">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Logga in
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
