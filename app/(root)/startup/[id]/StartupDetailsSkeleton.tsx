import { Skeleton } from '@/components/ui/skeleton';

export const StartupDetailsSkeleton = () => {
  return (
    <>
      <section className="pink_container pattern !main-h-[230px]">
        <div className="tag">
          <Skeleton className="bg-primary/30 h-3 w-24 px-2 my-1 rounded!" />
        </div>
        <div className="heading w-[50%] flex flex-col items-center gap-4 p-4!">
          <Skeleton className="bg-pink-200/50 h-6 w-full rounded!" />
          <Skeleton className="bg-pink-200/50 h-6 w-[70%] px-2 rounded!" />
        </div>
        <Skeleton className="bg-pink-200 h-5 w-[30%] max-w-5xl mt-4 rounded!" />
        <Skeleton className="bg-pink-200 h-5 w-[20%] max-w-5xl mt-4 rounded!" />
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
