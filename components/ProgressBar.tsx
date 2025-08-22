'use client';

// import { Progress } from '@/components/ui/progress';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();
    handleStop();

    return () => {
      handleStart();
    };
  }, [pathname, searchParams]);

  return <></>;
}
