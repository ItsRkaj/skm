'use client';

import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { getAvatars } from '@/modules/apiClient';
import { avatarUrl } from '@/modules/apiTypes';
import { CircleUser } from 'lucide-react';
import { useState, useEffect } from 'react';
import { buttonVariants, Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarImage } from './ui/avatar';

export default function AuthMenu() {
  const { isLoggedIn } = useUser();
  return isLoggedIn ? <ProfileMenu /> : <LoginButton />;
}

export function LoginButton() {
  return (
    <Link href="/login" className={buttonVariants({ variant: 'default' })}>
      Login
    </Link>
  );
}

export function ProfileMenu() {
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { signOut, user } = useUser();

  useEffect(() => {
    const fetchAvatarUrl = async () => {
      if (user?.profile?.avatar_url) {
        const avatar = (await getAvatars(user.profile.avatar_url)) as avatarUrl;
        setAvatar(avatar.signedUrl);
      }
    };

    void fetchAvatarUrl();
  }, [user]);

  async function handleSignOut() {
    await signOut();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          {avatar ? (
            <Avatar>
              {!isLoaded && (
                <Skeleton className="w-[100px] h-[100px] rounded-full bg-white" />
              )}
              <AvatarImage
                src={avatar}
                onLoad={() => setIsLoaded(true)}
                className={`${isLoaded ? 'block' : 'none'}`}
              />
            </Avatar>
          ) : (
            <CircleUser className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Mitt konto</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account">Min profil</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a onClick={() => void handleSignOut()}>Logga ut</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
