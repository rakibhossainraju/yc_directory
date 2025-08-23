import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { isSessionInValid } from '@/lib/server-utils';

const Page = async () => {
  const session = await auth();
  if (isSessionInValid(session)) {
    redirect('/');
  }
  const id = session!.id!;
  const user = session!.user!;

  return (
    <>
      <div>{user.name}</div>
    </>
  );
};
export default Page;
