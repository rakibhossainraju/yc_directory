import { ViewTransition } from 'react';
import { UserDetails } from '@/app/(root)/user/[id]/UserDetails';
import { notFound } from 'next/navigation';
import { getAuthorIdsByStartupCountDesc } from '@lib/queries';

export async function generateStaticParams() {
  const authorIds = await getAuthorIdsByStartupCountDesc();

  if (!authorIds || authorIds.length === 0) return [{ id: '__placeholder__' }];

  return authorIds;
}

export default async function UserDetailsPage({ params }: PageProps<'/user/[id]'>) {
  const { id } = await params;

  if (!id || id === '__placeholder__') {
    return notFound();
  }

  return (
    <ViewTransition>
      <UserDetails userId={id} />
    </ViewTransition>
  );
}
