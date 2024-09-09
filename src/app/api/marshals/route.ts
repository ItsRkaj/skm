import { Marshal } from '@/modules/apiTypes';

export function GET() {
  const marshals: Marshal[] = [
    {
      name: 'John Doe',
      location: 'Birmingham, UK',
      phone: '+44 123 456 7890',
      email: 'john.doe@gmail.com',
    },
    {
      name: 'Mary Jane',
      location: 'London, UK',
      phone: '+44 123 456 1337',
      email: 'mary.jane@gmail.com',
    },
    {
      name: 'Edward Snowden',
      location: 'Tottenham, UK',
      phone: '+44 123 456 1337',
      email: 'mary.jane@gmail.com',
    },
  ];

  return new Response(JSON.stringify(marshals), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
