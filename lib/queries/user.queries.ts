import { cacheLife, cacheTag } from 'next/cache';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';

export async function getUserDetailsById(id: string) {
  'use cache';
  cacheTag('user-details-' + id);
  cacheLife('days');

  return await client.fetch(AUTHOR_BY_ID_QUERY, { id });
}
