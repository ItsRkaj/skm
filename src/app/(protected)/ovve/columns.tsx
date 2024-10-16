'use client';

import { ColumnDef, CellContext } from '@tanstack/react-table';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import React, { useState } from 'react';
import { LeaderboardEntry } from '@/modules/apiTypes';

interface ExtendedCellContext extends CellContext<LeaderboardEntry, unknown> {
  placement: number; // Add placement to the context
}

// Person type used throughout the code
export type Person = {
  id: string;
  avatar: string;
  name: string;
  nickname: string | null;
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

// Avatar component
interface AvatarComponentProps {
  avatarUrl: string;
}

const AvatarComponent: React.FC<AvatarComponentProps> = ({ avatarUrl }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <Avatar>
      {!isLoaded && (
        <Skeleton className="w-[100px] h-[100px] rounded-full bg-white" />
      )}
      <AvatarImage
        src={avatarUrl}
        onLoad={() => setIsLoaded(true)}
        className={`${isLoaded ? 'block' : 'none'}`}
      />
    </Avatar>
  );
};

export const columns: ColumnDef<LeaderboardEntry>[] = [
  {
    id: 'placement',
    header: () => <div className="text-center">Plats</div>,
    cell: (props) => {
      const placement = (props as ExtendedCellContext).placement;
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
      const person: Person = row.getValue('person');

      return (
        <div className="flex flex-row gap-2">
          <AvatarComponent avatarUrl={person.avatar} />
          <div className="flex flex-col">
            <span className="text-foreground">{person.name}</span>
            <span className="text-muted-foreground">{person.nickname}</span>
          </div>
        </div>
      );
    },
    filterFn: (row, columnId, filterValue: string) => {
      const person: Person = row.getValue(columnId);
      return person.name.toLowerCase().includes(filterValue.toLowerCase());
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
          text="Sydda märken"
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
          text="Osydda märken"
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
