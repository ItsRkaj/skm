'use client';
import Image from 'next/image';
import {
  AvatarIcon,
  CalendarIcon,
  ThickArrowLeftIcon,
} from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getNews } from '@/modules/apiClient';
import type { News } from '@/modules/apiTypes';
import { useEffect, useState } from 'react';

const NewsDetail = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const [allnews, setallnews] = useState<News[]>();

  const fetchNews = async () => {
    const newsList: News[] | undefined = await getNews();
    setallnews(newsList);
  };

  useEffect(() => {
    void fetchNews();
  }, []);

  if (allnews) {
    const news = allnews.find((item) => item.id === Number(params.id));

    if (news) {
      return (
        <div className="container mx-auto py-8">
          <div key={news.id}>
            <button
              className="flex items-center hover:text-[hsl(var(--primary))]"
              onClick={() => router.back()}>
              <ThickArrowLeftIcon />
              Tillbaka
            </button>{' '}
            {/* just to avoid button style*/}
            <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
            <Image
              src={'/skmLogo.png'}
              alt={news.title}
              width={800}
              height={400}
              className="w-full h-80 object-cover rounded-lg mb-6"
            />
            <div>
              <p>{news.text}</p>
            </div>
            <div className="mt-6 text-sm ">
              <p className="flex items-center">
                <AvatarIcon className="mr-2" />
                {news.author}
              </p>
              <p className="flex items-center">
                <CalendarIcon className="mr-2" />
                {news.date}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (!news) {
      return (
        <div>
          <Button variant="link" onClick={() => router.back()}>
            <ThickArrowLeftIcon />
            Tillbaka
          </Button>
          <Image
            src={'/skmLogo.png'}
            alt={'skmlogo'}
            width={800}
            height={400}
            className="w-full h-80 object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold mb-4 justify-center">
            News not found
          </h1>
        </div>
      );
    }
  }
};

export default NewsDetail;
