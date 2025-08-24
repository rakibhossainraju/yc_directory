'use client';

import { useEffect } from 'react';
import NProgress from 'nprogress';

export default function ProgressBarController() {
  useEffect(() => {
    const start = () => NProgress.start();
    const done = () => NProgress.done();

    window.addEventListener('beforeunload', start);
    window.addEventListener('load', done, { once: true });

    return () => {
      window.removeEventListener('beforeunload', start);
      window.removeEventListener('load', done);
    };
  }, []);

  return null;
}
