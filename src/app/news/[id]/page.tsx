'use client';
import Image from 'next/image';
import {
  AvatarIcon,
  CalendarIcon,
  ThickArrowLeftIcon,
} from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

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
];
const NewsDetail = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const news = newsData.find((item) => item.id === Number(params.id));

  if (!news) {
    return (
      <div>
        <button
          className="flex items-center hover:text-[hsl(var(--primary))]"
          onClick={() => router.back()}>
          <ThickArrowLeftIcon />
          Tillbaka
        </button>
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

  return (
    <div className="container mx-auto py-8">
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
  );
};

export default NewsDetail;
