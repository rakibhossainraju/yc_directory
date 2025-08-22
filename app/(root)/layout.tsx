import { type ReactNode, Suspense } from 'react';
import { Navbar } from '@/components/Navbar';

export const experimental_ppr = true;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main>
      <Suspense>
        <Navbar />
      </Suspense>
      {children}
    </main>
  );
}
