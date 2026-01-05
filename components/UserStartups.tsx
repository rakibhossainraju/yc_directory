import React from 'react';
import { cacheLife, cacheTag } from 'next/cache';
import { STARTUPS_BY_AUTHOR_ID_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import StartupCard from '@/components/StartupCard';
import { StartupTypeCard } from '@/app/(root)/page';

async function getUserStartups(userId: string) {
  'use cache';
  cacheTag('user-startups-' + userId);
  cacheLife('days');

  return await client.fetch(STARTUPS_BY_AUTHOR_ID_QUERY, {
    id: userId,
  });
}

const UserStartups = async ({ userId }: { userId: string }) => {
  const startups = await getUserStartups(userId);
  return (
    <>
      {startups.map((startup) => (
        <StartupCard key={startup._id} startup={startup as StartupTypeCard} />
      ))}
    </>
  );
};
export default UserStartups;
