import type { Metadata } from 'next';
import { Suspense } from 'react';
import { DataTable } from './data-table';

export const metadata: Metadata = {
  title: 'Ovve-lista | Systrarna KM',
  description: 'Systrarna KMs topplista',
};

// Revalidate the cache every 5 minutes
export const revalidate = 60 * 5;

// Compontent used for data fetching
async function LeaderboardData() {
  const { getLeaderboard } = await import('@/modules/apiClient');
  const { columns } = await import('./columns');
  const data = await getLeaderboard();
  return <DataTable columns={columns} data={data ?? []} />;
}

export default async function Ovve() {
  return (
    <div>
      <h1 className="text-4xl lg:text-5xl font-semibold text-center">
        Ovve-lista
      </h1>
      <div className="container mx-auto py-10">
        <Suspense fallback={<p>Laddar Ovve-lista...</p>}>
          <LeaderboardData />
        </Suspense>
      </div>
    </div>
  );
}
