import Image from 'next/image';
import { Suspense } from 'react';
import { auth } from '@/auth';
import { Link } from '@router/customized';
import { NavBarAuthMenu, NevBarMenuSkeleton } from './NavBarAuthMenu';

export const Navbar = async () => {
  const sessionPromise = auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans min-h-[64px]">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Site Logo"
            className="max-h-[21px]"
            width={100}
            height={100}
          />
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
