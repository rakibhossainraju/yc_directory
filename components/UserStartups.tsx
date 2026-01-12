import StartupCard from '@/components/StartupCard';
import { StartupTypeCard } from '@/app/(root)/page';
import { getStartupsByUserId } from '@lib/queries';

const UserStartups = async ({ userId }: { userId: string }) => {
  const startups = await getStartupsByUserId(userId);
  return (
    <>
      {startups.map((startup) => (
        <StartupCard key={startup._id} startup={startup as StartupTypeCard} />
      ))}
    </>
  );
};
export default UserStartups;
