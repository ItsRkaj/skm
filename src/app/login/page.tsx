'use client';

import { useState } from 'react';
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
import { useToast } from '@/hooks/use-toast';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useUser();
  const { toast } = useToast();

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      return await login({ email, password });
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const success = await handleLogin({ email, password });
      if (success) {
        toast({
          description: 'Du är inloggad!',
        });
      } else {
        setError('Något gick fel. Kontrollera dina uppgifter.');
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
