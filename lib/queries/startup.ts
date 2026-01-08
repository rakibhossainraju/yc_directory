import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';

import { STARTUPS_QUERY } from '@/sanity/lib/queries';
import { clientFetch, client } from '@/sanity/lib/client';
import { StartupTypeCard } from '@/app/(root)/page';
import { STARTUPS_BY_AUTHOR_ID_QUERY } from '@/sanity/lib/queries';

export async function getStartupsByQuery(query: string | null) {
  'use cache';
  const tag = `startups-${query ?? 'all'}`;
  cacheTag(tag);
  cacheLife('days');

  return (await clientFetch({
    query: STARTUPS_QUERY,
    params: { search: query },
  })) as unknown as StartupTypeCard[];
}

export async function getUserStartups(userId: string) {
  'use cache';
  cacheTag('user-startups-' + userId);
  cacheLife('days');

  return await client.fetch(STARTUPS_BY_AUTHOR_ID_QUERY, {
    id: userId,
  });
}
