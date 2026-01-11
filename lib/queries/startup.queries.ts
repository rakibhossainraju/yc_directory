'use server';
import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { sanityFetch } from '@/sanity/lib/live';
import {
  STARTUPS_QUERY,
  STARTUP_DETAIL_QUERY,
  STARTUPS_BY_AUTHOR_ID_QUERY,
  STARTUPS_BY_SLUG_QUERY,
  STARTUP_VIEWS_QUERY,
} from '@/sanity/lib/queries';
import { clientFetch, client } from '@/sanity/lib/client';
import { StartupTypeCard } from '@/app/(root)/page';

export async function getStartupDetailsById(id: string) {
  'use cache';
  cacheTag('startup-details-' + id);
  cacheLife('days');
  const { data } = await sanityFetch({
    query: STARTUP_DETAIL_QUERY,
    params: { id },
  });
  return data;
}

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

export async function getStartupsByUserId(userId: string) {
  'use cache';
  cacheTag('user-startups-' + userId);
  cacheLife('days');

  return await client.fetch(STARTUPS_BY_AUTHOR_ID_QUERY, {
    id: userId,
  });
}

export async function getStartupsBySlugQuery(slug = 'editor-picks') {
  'use cache';
  cacheTag('startups-' + slug);
  cacheLife('weeks');

  return await client.fetch(STARTUPS_BY_SLUG_QUERY, {
    slug: 'editor-picks',
  });
}

export async function getStartupTotalViewCount(startupId: string) {
  return (
    (await client
      .withConfig({
        useCdn: false,
      })
      .fetch(STARTUP_VIEWS_QUERY, { startupId })) ?? 0
  );
}
