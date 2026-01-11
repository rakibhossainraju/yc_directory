import { Session } from 'next-auth';
import { signIn, signOut } from '@/auth';
import { LogOut, BadgePlus, LogIn } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from '@router/customized';

interface NavbarUserMenuProps {
  sessionPromise: Promise<Session | null>;
}

export async function NavBarAuthMenu({ sessionPromise }: NavbarUserMenuProps) {
  const session = await sessionPromise;
  const user = session?.user;
  const isLoggedIn = session !== null && user !== undefined;

  return isLoggedIn ? (
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
      <Link href={`/dashboard`}>
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
  );
}

export const NevBarMenuSkeleton = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-20 h-6 bg-gray-200 rounded animate-pulse max-sm:hidden"></div>
      <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
    </div>
  );
};
