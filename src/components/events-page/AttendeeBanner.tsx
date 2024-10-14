'use client';
import { useState } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';

interface AttendeeBannerProps {
  name: string;
  nickname: string;
}

const AttendeeBanner = ({ name, nickname }: AttendeeBannerProps) => {
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);

  return (
    <Card className="flex flex-row items-center overflow-auto gap-2 p-4">
      <Avatar>
        {!isAvatarLoaded && (
          <Skeleton className="w-[100px] h-[100px] rounded-full bg-white" />
        )}
        <AvatarImage
          src="https://github.com/shadcn.png"
          onLoad={() => setIsAvatarLoaded(true)}
          className={`${isAvatarLoaded ? 'block' : 'hidden'}`}
        />
      </Avatar>
      <div className="flex flex-col">
        <CardTitle>{name}</CardTitle>
        <CardDescription>{nickname}</CardDescription>
      </div>
    </Card>
  );
};

export default AttendeeBanner;
