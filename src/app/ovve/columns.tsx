'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

// Person type used throughout the code
type Person = {
  avatar: string;
  name: string;
  nickname: string;
};

// This type is used to define the shape of the data
export type LeaderboardEntry = {
  person: Person;
  total_patches: number;
  sewn_patches: number;
  not_sewn_patches: number;
  medals: number;
  pins: number;
};

// The header used for sortable columns
interface SortableHeaderProps {
  text: string;
  toggleSorting: (desc: boolean) => void;
  isSorted: boolean | string;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  text,
  toggleSorting,
  isSorted,
}) => {
  return (
    <div className="flex flex-row justify-center relative">
      <Button variant="ghost" onClick={() => toggleSorting(true)}>
        {text}
        <ArrowDown className={`${isSorted ? '' : 'hidden'} ml-2 h-4 w-4`} />
      </Button>
    </div>
  );
};

export const columns: ColumnDef<LeaderboardEntry>[] = [
  {
    id: 'placement',
    header: () => <div className="text-center">Plats</div>,
    cell: (props) => {
      const placement = (props as any).placement;
      return (
        <div className="text-2xl text-center">
          {placement === 1 ? (
            '🥇'
          ) : placement === 2 ? (
            '🥈'
          ) : placement === 3 ? (
            '🥉'
          ) : (
            <div className="text-base">{placement}</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'person',
    header: 'Namn',
    cell: ({ row }) => {
      const person = row.getValue('person') as Person;

      return (
        // ADD PROFILE LINK HERE
        <Link href={'/'} className="flex flex-row gap-2">
          <Avatar>
            <AvatarImage src={person.avatar} />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-foreground">{person.name}</span>
            <span className="text-muted-foreground">{person.nickname}</span>
          </div>
        </Link>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      return (row.getValue(columnId) as Person).name
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: 'total_patches',
    header: ({ column }) => {
      return (
        <SortableHeader
          text="Märken"
          toggleSorting={column.toggleSorting}
          isSorted={column.getIsSorted()}
        />
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('total_patches')}</div>
    ),
  },
  {
    accessorKey: 'sewn_patches',
    header: ({ column }) => {
      return (
        <SortableHeader
          text="Fastsydda märken"
          toggleSorting={column.toggleSorting}
          isSorted={column.getIsSorted()}
        />
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('sewn_patches')}</div>
    ),
  },
  {
    accessorKey: 'not_sewn_patches',
    header: ({ column }) => {
      return (
        <SortableHeader
          text="Ej Fastsydda Märken"
          toggleSorting={column.toggleSorting}
          isSorted={column.getIsSorted()}
        />
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('not_sewn_patches')}</div>
    ),
  },
  {
    accessorKey: 'medals',
    header: ({ column }) => {
      return (
        <SortableHeader
          text="Medaljer"
          toggleSorting={column.toggleSorting}
          isSorted={column.getIsSorted()}
        />
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('medals')}</div>
    ),
  },
  {
    accessorKey: 'pins',
    header: ({ column }) => {
      return (
        <SortableHeader
          text="Pins"
          toggleSorting={column.toggleSorting}
          isSorted={column.getIsSorted()}
        />
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('pins')}</div>
    ),
  },
];