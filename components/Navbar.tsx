import Image from 'next/image';
import { Suspense } from 'react';
import { auth } from '@/auth';
import { Link } from '@router/customized';
import { NavBarAuthMenu, NevBarMenuSkeleton } from './NavBarAuthMenu';

export const Navbar = async () => {
  const sessionPromise = auth();

  return (
    <header className="px-5 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center min-h-16">
        <Link href="/">
          <Image src="/logo.png" alt="Site Logo" className="max-h-5.25" width={100} height={100} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          <Suspense fallback={<NevBarMenuSkeleton />}>
            <NavBarAuthMenu sessionPromise={sessionPromise} />
          </Suspense>
        </div>
      </nav>
    </header>
  );
};
