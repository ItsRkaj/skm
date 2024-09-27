import { AvatarIcon, CalendarIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Image from 'next/image';

export default function News() {
  const newsData = [
    {
      id: 1,
      title: 'Here is some title',
      text: 'Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text.',
      author: 'Admin1',
      date: 'Sep 20, 2024',
    },
    {
      id: 2,
      title: 'Here is some title',
      text: 'Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text.',
      author: 'Admin2',
      date: 'Sep 20, 2024',
    },
    {
      id: 3,
      title: 'Here is some title',
      text: 'Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text.',
      author: 'Admin3',
      date: 'Sep 20, 2024',
    },
    {
      id: 4,
      title: 'Here is some title',
      text: 'Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text. Here is some text, and more text.',
      author: 'Admin3',
      date: 'Sep 20, 2024',
    },
  ];

  return (
    <div className="w-full py-8 container mx-auto">
      <h2 className="text-2xl font-serif mb-6">NYHETER</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsData.slice(0, 3).map(
          (
            news, // Limit to first 3 items
          ) => (
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
          ),
        )}
      </div>
    </div>
  );
}
