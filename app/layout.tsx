import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import 'easymde/dist/easymde.min.css';
import '../styles/globals.css';
import '../styles/nprogress.css';
import { Toaster } from '@/components/ui/sonner';
import { HandleOnComplete } from '@/lib/custom-router';

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'YC Directory',
  description: 'Pitch, Vote and Grow Your Startup',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-color-mode="light" lang="en">
      <body className={workSans.variable}>
        <HandleOnComplete />
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
