import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { cacheLife, cacheTag } from 'next/cache';
import Image from 'next/image';
import { auth } from '@/auth';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import StartupCardSkeleton from '@/components/StartupCardSkeleton';
import UserStartups from '@/components/UserStartups';

async function getUserDetails(id: string) {
  'use cache';
  cacheTag('user-details-' + id);
  cacheLife('days');

  return await client.fetch(AUTHOR_BY_ID_QUERY, { id });
}

export async function UserDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUserDetails(id);
  if (!user) return notFound();
  const session = await auth();

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">{user.name}</h3>
          </div>
          <Image
            src={user.image!}
            alt={user.name! + ' Avatar'}
            width={200}
            height={300}
            className="profile_image fade-in"
          />
          <p className="text-30-extrabold mt-7 text-center">@{user.username}</p>
          <p className="mt-1 text-center text-14-normal">{user.bio}</p>
        </div>
        <div className="flex-1  flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold fade-in">{session?.id === id ? 'Your' : 'All'} Startups</p>
          <ul className="card_grid-sm">
            {user.startup_refs?.length && (
              <Suspense fallback={<StartupCardSkeleton count={user.startup_refs.length} />}>
                <UserStartups userId={id} />
              </Suspense>
            )}
          </ul>
        </div>
      </section>
    </>
  );
}
