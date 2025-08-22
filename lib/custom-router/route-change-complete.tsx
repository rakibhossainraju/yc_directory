import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { onComplete } from './events';

export function HandleOnComplete() {
  // Using Suspense to ensure the component is ready before rendering
  // This is a workaround for Next.js's client-side navigation
  // to ensure that the effect runs after the component mounts
  return (
    <Suspense>
      <HandleOnCompleteChild />
    </Suspense>
  );
}

function HandleOnCompleteChild() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => onComplete(), [pathname, searchParams]);
  return null;
}
