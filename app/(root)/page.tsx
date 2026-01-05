import { cacheLife, cacheTag } from 'next/cache';
import SearchForm from '@/components/SearchForm';
import StartupCard from '@/components/StartupCard';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';
import { Author, Startup } from '@/sanity/types';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { Suspense } from 'react';
import StartupCardSkeleton from '@/components/StartupCardSkeleton';
import SearchFormSkeleton from '@/components/SearchFormSkeleton';

export type StartupTypeCard = Omit<Startup, 'author'> & { author?: Author };
export type SearchParamsType = Promise<{ query?: string }>;

export default async function Home({ searchParams }: { searchParams: SearchParamsType }) {
  return (
    <>
      <section className="pink_container pattern">
        <h1 className="heading rounded-sm">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>
        <Suspense fallback={<SearchFormSkeleton />}>
          <SearchForm searchParams={searchParams} />
        </Suspense>
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          <Suspense fallback={null}>
            <SearchResultsHeader searchParams={searchParams} />
          </Suspense>
        </p>
        <ul className="mt-7 card_grid">
          <Suspense fallback={<StartupCardSkeleton count={6} />}>
            <StartupCards searchParams={searchParams} />
          </Suspense>
        </ul>
        <Suspense>
          <SanityLive />
        </Suspense>
      </section>
    </>
  );
}
async function SearchResultsHeader({ searchParams }: { searchParams: SearchParamsType }) {
  const query = (await searchParams).query ?? null;
  return <>{query ? `Search results for "${query}"` : 'Recent Pitches'}</>;
}

async function getStartupsCount(query: string | null) {
  'use cache';
  cacheTag('startups-' + (query ?? 'all'));
  cacheLife('days');
  return (
    await sanityFetch({
      query: STARTUPS_QUERY,
      params: { search: query },
    })
  ).data as StartupTypeCard[];
}

async function StartupCards({ searchParams }: { searchParams: SearchParamsType }) {
  const query = (await searchParams).query ?? null;
  const startups = await getStartupsCount(query);

  return (
    <>
      {startups.map((startup, index) => (
        <StartupCard key={(startup._id + index).toString()} startup={startup} />
      ))}
    </>
  );
}
