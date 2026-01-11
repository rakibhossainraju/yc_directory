import { Suspense, ViewTransition } from 'react';
import { UserDetails } from '@/app/(root)/user/[id]/UserDetails';
import UserDetailsSkeleton from '@/app/(root)/user/[id]/UserDetailsSkeleton';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <Suspense fallback={<UserDetailsSkeleton />}>
      <ViewTransition>
        <UserDetails params={params} />
      </ViewTransition>
    </Suspense>
  );
};
export default Page;
