'use client';

import { useEffect } from 'react';
import NProgress from 'nprogress';

export default function ProgressBarController() {
  useEffect(() => {
    const start = () => NProgress.start();
    const done = () => NProgress.done();

    // Some browsers don’t always emit beforeunload (or it’s too late). This helps:
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') start();
      else done();
    };
    // Hard navigations away from this page
    window.addEventListener('beforeunload', start);
    document.addEventListener('visibilitychange', onVisibilityChange);

    //When this page finishes initial load
    if (document.readyState === 'complete') {
      done();
    } else {
      window.addEventListener('load', done, { once: true });
    }

    return () => {
      window.removeEventListener('beforeunload', start);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('load', done);
    };
  }, []);

  return null;
}
