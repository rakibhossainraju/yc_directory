import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        'bg-linear-150 from-primary/15 via-primary/25 to-primary/35 bg-size-[200%] animate-pulse rounded-md',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
