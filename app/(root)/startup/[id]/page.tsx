import { cacheLife, cacheTag } from 'next/cache';
import { Suspense } from 'react';

import { sanityFetch } from '@/sanity/lib/live';
import { STARTUP_DETAIL_QUERY } from '@/sanity/lib/queries';
import { StartupDetails } from '@/app/(root)/startup/[id]/StartupDetails';
import { StartupDetailsSkeleton } from '@/app/(root)/startup/[id]/StartupDetailsSkeleton';

export type StartupParamType = Promise<{ id: string }>;

export async function getStartupDetails(id: string) {
  'use cache';
  cacheTag('startup-details-' + id);
  cacheLife('days');

  const { data } = await sanityFetch({
    query: STARTUP_DETAIL_QUERY,
    params: { id },
  });
  return data;
}

const StartupDetailsPage = async ({ params }: { params: StartupParamType }) => {
  return (
    <Suspense fallback={<StartupDetailsSkeleton />}>
      <StartupDetails params={params} />
    </Suspense>
  );
};

export default StartupDetailsPage;
