'use client';

import { useEffect } from 'react';
import NProgress from 'nprogress';

export default function ProgressBarController() {
  useEffect(() => {
    const start = () => NProgress.start();
    const done = () => NProgress.done();

    // Hard navigations away from this page
    window.addEventListener('beforeunload', start);

    //When this page finishes initial load
    if (document.readyState === 'complete') {
      done();
    } else {
      window.addEventListener('load', done, { once: true });
    }

    return () => {
      window.removeEventListener('beforeunload', start);
      window.removeEventListener('load', done);
    };
  }, []);

  return null;
}
