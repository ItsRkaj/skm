'use client';

import { getMarshals } from '@/modules/apiClient';
import type { Marshal } from '@/modules/apiTypes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';

export default function Marshals() {
  const [marshals, setMarshals] = useState<Marshal[] | undefined>(undefined);

  const fetchMarshals = async () => {
    const marshalList: Marshal[] | undefined = await getMarshals();
    setMarshals(marshalList);
  };

  useEffect(() => {
    void fetchMarshals();
  }, []);

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Marshals
      </h1>
      <ul>
        {marshals?.map((marshal: Marshal) => (
          <li key={marshal.name}>
            <div className="flex items-center mb-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{marshal.name}</AvatarFallback>
              </Avatar>

              <div className="ml-2">
                <h2>Name: {marshal.name}</h2>
                <p>Adress: {marshal.location}</p>
                <p>Phone: {marshal.phone}</p>
                <p>Email: {marshal.email}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
