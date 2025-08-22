import Image from 'next/image';
import { auth, signIn, signOut } from '@/auth';
import { LogOut, BadgePlus, LogIn } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from '@router/customized';

export const Navbar = async () => {
  const session = await auth();
  const user = session?.user;
  const isLoggedIn = session !== null && user !== undefined;

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans min-h-[48px]">
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
          {isLoggedIn ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden ">Create</span>
                <BadgePlus className="size-6 sm:hidden text-red-500" />
              </Link>
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
                className="flex items-center"
              >
                <button type="submit">
                  <span className="max-sm:hidden ">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>
              <Link href={`/user`}>
                <Avatar className="size-10">
                  <AvatarImage src={session?.user?.image ?? ''} alt={session?.user?.name ?? ''} />
                  <AvatarFallback>{session?.user?.name?.[0] ?? 'AV'}</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  'use server';
                  await signIn('git');
                }}
                className="flex items-center"
              >
                <button type="submit">
                  <span className="max-sm:hidden ">Login</span>
                  <LogIn className="size-6 sm:hidden text-red-500" />
                </button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
