import SearchForm from '@/components/SearchForm';
import StartupCard from '@/components/StartupCard';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';
import { Startup, Author } from '@/sanity/types';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { Suspense } from 'react';
import StartupCardSkeleton from '@/components/StartupCardSkeleton';

export type StartupTypeCard = Omit<Startup, 'author'> & { author?: Author };

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query ?? null;

  return (
    <>
      <section className="pink_container pattern">
        <h1 className="heading rounded-sm">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>
        <SearchForm query={query ?? ''} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : 'Recent Pitches'}
        </p>
        <ul className="mt-7 card_grid">
          <Suspense fallback={<StartupCardSkeleton count={6} />}>
            <StartUpCards query={query} />
          </Suspense>
        </ul>
        <Suspense>
          <SanityLive />
        </Suspense>
      </section>
    </>
  );
}

async function StartUpCards({ query }: { query: string | null }) {
  const startups = (
    await sanityFetch({
      query: STARTUPS_QUERY,
      params: { search: query },
    })
  ).data as StartupTypeCard[];

  return (
    <>
      {startups.map((startup, index) => (
        <StartupCard key={(startup._id + index).toString()} startup={startup} />
      ))}
    </>
  );
}
