'use client';
import { AvatarIcon, CalendarIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Image from 'next/image';
import { getNews } from '@/modules/apiClient';
import type { News } from '@/modules/apiTypes';
import { useEffect, useState } from 'react';

export default function Allnews() {
  const [allnews, setallnews] = useState<News[] | undefined>(undefined);

  const fetchNews = async () => {
    const newsList: News[] | undefined = await getNews();
    setallnews(newsList);
  };

  useEffect(() => {
    void fetchNews();
  }, []);

  return (
    <div className="w-full py-8 container mx-auto">
      <h2 className="text-2xl font-serif mb-6">NYHETER</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allnews ? (
          allnews.map((news) => (
            <Link key={news.id} href={`/news/${news.id}`} passHref>
              <div className="news-card bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
                <Image
                  src={'/skmLogo.png'}
                  alt={news.title}
                  width={600}
                  height={160}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 bg-[hsl(var(--card))]">
                  <h2 className="text-xl font-bold mb-2">{news.title}</h2>
                  <p className="mb-4">
                    {news.text.split(' ').slice(0, 25).join(' ') +
                      (news.text.split(' ').length > 25 ? '...' : '')}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <p className="flex items-center">
                      <AvatarIcon className="mr-1" />
                      {news.author}
                    </p>
                    <p className="flex items-center">
                      <CalendarIcon className="mr-1" />
                      {news.date}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
