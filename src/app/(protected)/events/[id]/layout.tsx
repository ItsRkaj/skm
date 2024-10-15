import { Button } from '@/components/ui/button';
import { ThickArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto py-8">
      <Link href="/events">
        <Button variant="link">
          <ThickArrowLeftIcon />
          Tillbaka
        </Button>
      </Link>
      <main>{children}</main>
    </div>
  );
}
