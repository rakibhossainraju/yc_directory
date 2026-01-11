import { Suspense } from 'react';
import { StartupDetails } from '@/app/(root)/startup/[id]/StartupDetails';
import { StartupDetailsSkeleton } from '@/app/(root)/startup/[id]/StartupDetailsSkeleton';

export type StartupParamType = Promise<{ id: string }>;

const StartupDetailsPage = async ({ params }: { params: StartupParamType }) => {
  return (
    <Suspense fallback={<StartupDetailsSkeleton />}>
      <StartupDetails params={params} />
    </Suspense>
  );
};

export default StartupDetailsPage;
