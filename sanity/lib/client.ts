import { createClient, type QueryParams } from 'next-sanity';

import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// 👇 add this function
export async function clientFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 24 * (60 * 60), // default revalidation time in seconds
  tags = [],
}: {
  query: QueryString;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return await client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  });
}
