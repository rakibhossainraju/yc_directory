'use server';
import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import {
  STARTUP_DETAIL_QUERY,
  STARTUP_VIEWS_QUERY,
  STARTUPS_BY_AUTHOR_ID_QUERY,
  STARTUPS_BY_SLUG_QUERY,
  STARTUPS_QUERY,
} from '@/sanity/lib/queries';
import { client, clientFetch } from '@/sanity/lib/client';
import { StartupTypeCard } from '@/app/(root)/page';

export async function getStartupDetailsById(id: string) {
  'use cache';
  const tag = 'startup-details-' + id;
  cacheTag(tag);
  cacheLife('days');
  return await clientFetch({
    query: STARTUP_DETAIL_QUERY,
    params: { id },
    tags: [tag],
  });
}

export async function getStartupsByQuery(query: string | null) {
  'use cache';
  const tag = `startups-${query ?? 'all'}`;
  cacheTag(tag);
  cacheLife('days');
  await new Promise((resolve) => setTimeout(resolve, 10000));
  return (await clientFetch({
    query: STARTUPS_QUERY,
    params: { search: query },
    tags: [tag],
  })) as unknown as StartupTypeCard[];
}

export async function getStartupsByUserId(userId: string) {
  'use cache';
  const tag = 'user-startups-' + userId;
  cacheTag(tag);
  cacheLife('days');

  return await client.fetch(STARTUPS_BY_AUTHOR_ID_QUERY, {
    id: userId,
    tags: [tag],
  });
}

export async function getStartupsBySlugQuery(slug = 'editor-picks') {
  'use cache';
  const tag = 'startups-' + slug;
  cacheTag(tag);
  cacheLife('weeks');

  return await client.fetch(STARTUPS_BY_SLUG_QUERY, {
    slug: 'editor-picks',
    tags: [tag],
  });
}

export async function getStartupTotalViewCount(startupId: string) {
  return (
    (await client
      .withConfig({
        useCdn: false,
      })
      .fetch(STARTUP_VIEWS_QUERY, { id: startupId })) ?? 0
  );
}
