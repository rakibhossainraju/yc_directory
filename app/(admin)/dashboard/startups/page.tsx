import React from 'react';
import UserStartups from '@/components/UserStartups';
import { auth } from '@/auth';
import StartupCardSkeleton from '@/components/StartupCardSkeleton';

const Page = async () => {
  return (
    <section className="px-10 py-4">
      <h1 className="heading mx-auto ">Your Startups</h1>
      <ul className="flex flex-wrap w-full gap-10 mx-auto my-4">
        <React.Suspense fallback={<StartupCardSkeleton />}>
          <Startups />
        </React.Suspense>
      </ul>
    </section>
  );
};
export default Page;

async function Startups() {
  const session = (await auth())!;
  const userId = session.id!;
  return <UserStartups userId={userId} />;
}
