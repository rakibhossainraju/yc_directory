import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";

export const Navbar = async () => {
  const session = await auth();
  const user = session?.user;
  const isLoggedIn = session !== null && user !== undefined;

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Site Logo" width={100} height={100} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {isLoggedIn ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span>Logout</span>
                </button>
              </form>
              <Link href={`/user/${user.id}`}>
                <span>{user.name}</span>
              </Link>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  "use server";
                  await signIn("git");
                }}
              >
                <button type="submit">
                  <span>Login</span>
                </button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
