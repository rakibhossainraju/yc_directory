import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
// @ts-ignore
import 'easymde/dist/easymde.min.css';
// @ts-ignore
import '../styles/globals.css';
// @ts-ignore
import '../styles/nprogress.css';
import { Toaster } from '@/components/ui/sonner';
import { HandleOnComplete } from '@/lib/custom-router';
import ProgressBarController from '@/components/ProgressBarController';

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
  const isDevelopment = process?.env?.NODE_ENV === 'development';
  return (
    <html data-color-mode="light" lang="en">
      <head>
        {isDevelopment && (
          <script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" />
        )}
      </head>
      <body className={workSans.variable}>
        <ProgressBarController />
        <HandleOnComplete />
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
