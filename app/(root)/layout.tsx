import { type ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';

export const experimental_ppr = true;

export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
