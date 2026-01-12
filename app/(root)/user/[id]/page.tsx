import { ViewTransition } from 'react';
import { UserDetails } from '@/app/(root)/user/[id]/UserDetails';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return [{ id: 'ZBFqyJCMiDLTwdwPrBOK9Y' }];
}

export default async function UserDetailsPage({ params }: PageProps<'/user/[id]'>) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  return (
    <ViewTransition>
      <UserDetails userId={id} />
    </ViewTransition>
  );
}
