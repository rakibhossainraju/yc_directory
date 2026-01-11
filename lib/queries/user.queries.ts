import { cacheLife, cacheTag } from 'next/cache';
import { clientFetch } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';

export async function getUserDetailsById(id: string) {
  'use cache';
  const tag = 'user-details-' + id;
  cacheTag(tag);
  cacheLife('days');

  return await clientFetch({
    query: AUTHOR_BY_ID_QUERY,
    params: { id },
    tags: [tag],
  });
}
