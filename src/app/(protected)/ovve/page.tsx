import type { Metadata } from 'next';
import { Suspense } from 'react';
import { DataTable } from './data-table';
import { revalidatePath } from 'next/cache';
import PersonalBanner from '@/components/ovve-page/PersonalBanner';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ovve-lista | Systrarna KM',
  description: 'Systrarna KMs topplista',
};

// Don't cache the leaderboard
export const revalidate = 0;

/* eslint-disable */
const updateLeaderboard = async () => {
  'use server';
  revalidatePath('/leaderboard');
};
/* eslint-enable */

async function LeaderboardData() {
  const { getLeaderboard } = await import('@/modules/apiClient');
  const { columns } = await import('./columns');
  const leaderboard = await getLeaderboard();

  return (
    <>
      <PersonalBanner
        updateLeaderboard={updateLeaderboard}
        leaderboard={leaderboard ?? []}
      />
      <DataTable columns={columns} data={leaderboard ?? []} />
    </>
  );
}

export default function Ovve() {
  return (
    <div>
      <h1 className="text-4xl lg:text-5xl font-semibold text-center">
        Ovve-lista
      </h1>
      <div className="container mx-auto py-10">
        <Suspense
          fallback={
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-8 w-8 animate-spin" />
            </div>
          }>
          <LeaderboardData />
        </Suspense>
      </div>
    </div>
  );
}
