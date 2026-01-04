import { Skeleton } from '@/components/ui/skeleton';

export const StartupDetailsSkeleton = () => {
  return (
    <>
      <section className="pink_container pattern !main-h-[230px]">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="heading">
          <Skeleton className="h-10 w-full fade-in" />
        </div>
        <Skeleton className="h-6 w-full max-w-5xl fade-in mt-4" />
      </section>

      <section className="section_container">
        <Skeleton className="w-full min-h-[350px] max-w-[1200px] max-h-[700px] rounded-xl mx-auto" />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <div className="flex gap-2 items-center mb-3">
              <Skeleton className="size-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-28" />
              </div>
            </div>
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
          <Skeleton className="h-8 w-48" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <Skeleton className="divider" />
      </section>
      <Skeleton className="view_skeleton" />
    </>
  );
};
