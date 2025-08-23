import React from 'react';
import { STARTUPS_BY_AUTHOR_ID_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import StartupCard from '@/components/StartupCard';
import { StartupTypeCard } from '@/app/(root)/page';

const UserStartups = async ({ userId }: { userId: string }) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_ID_QUERY, {
    id: userId,
  });
  return (
    <>
      {startups.map((startup) => (
        <StartupCard key={startup._id} startup={startup as StartupTypeCard} />
      ))}
    </>
  );
};
export default UserStartups;
