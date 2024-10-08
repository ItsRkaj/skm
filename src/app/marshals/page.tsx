'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Adress</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marshals ? (
              marshals.map((marshal) => (
                <TableRow key={marshal.id}>
                  <TableCell>
                    {' '}
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>{marshal.name}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{marshal.name}</TableCell>
                  <TableCell>{marshal.location}</TableCell>
                  <TableCell>{marshal.phone}</TableCell>
                  <TableCell>{marshal.email}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
