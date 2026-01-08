import { type ReactNode } from 'react';
import { Link } from '@router/customized';

export default async function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  'use cache';
  return (
    <>
      <main className="flex h-lvh bg-primary">
        <aside className="w-[20%] p-4">
          <h1 className="text-30-extrabold !text-black">Sidebar</h1>
          <ul className="mt-7">
            <li className="text-lg font-semibold">
              <Link href="/dashboard/startups">Startups</Link>
            </li>
            <li className="text-lg font-semibold">
              <Link>Repot</Link>
            </li>
            <li className="text-lg font-semibold">
              <Link href="/dashboard/user-settings">User Settings</Link>
            </li>
          </ul>
        </aside>
        <aside className="w-[80%] h-full bg-primary-100 rounded-l-xl rounded-bl-xl p-4 overflow-y-auto">
          {children}
        </aside>
      </main>
    </>
  );
}
