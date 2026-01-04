import { type ReactNode } from 'react';
import { Link } from '@router/customized';

export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <main className="flex h-lvh bg-primary">
        <aside className="w-[20%] p-4">
          <h1 className="text-30-extrabold !text-black">Sidebar</h1>
          <ul className="mt-7">
            <li className="text-lg font-semibold">
              <Link>Startups</Link>
            </li>
            <li className="text-lg font-semibold">
              <Link>Repot</Link>
            </li>
            <li className="text-lg font-semibold">
              <Link>User Settings</Link>
            </li>
          </ul>
        </aside>
        <aside className="w-[80%] h-full bg-primary-100 roun">{children}</aside>
      </main>
    </>
  );
}
