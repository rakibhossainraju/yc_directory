import { type ReactNode, Suspense } from 'react';
import { Navbar } from '@/components/Navbar';

export default function UserLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main>
      <Suspense>{children}</Suspense>
    </main>
  );
}
