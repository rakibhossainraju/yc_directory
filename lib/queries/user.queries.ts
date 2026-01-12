import { cacheLife, cacheTag } from 'next/cache';
import { clientFetch } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';

export interface UserProfile {
  _id: string;
  name: string;
  username: string;
  bio: string;
  image: string;
  startup_refs?: string[];
}

export async function getUserDetailsById(id: string) {
  'use cache: remote';
  const tag = 'user-details-' + id;
  cacheTag(tag);
  cacheLife('days');
  const user = await clientFetch({
    query: AUTHOR_BY_ID_QUERY,
    params: { id },
    tags: [tag],
  });
  return user as UserProfile | null;
}
