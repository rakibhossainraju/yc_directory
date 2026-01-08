import React from 'react';
import StartupCard from '@/components/StartupCard';
import { StartupTypeCard } from '@/app/(root)/page';
import { getUserStartups } from '@queries';

const UserStartups = async ({ userId }: { userId: string }) => {
  'use cache';
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
