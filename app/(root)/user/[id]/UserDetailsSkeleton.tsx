import { Skeleton } from '@/components/ui/skeleton';
import StartupCardSkeleton from '@/components/StartupCardSkeleton';

export default function UserDetailsSkeleton() {
  return (
    <section className="profile_container">
      <div className="profile_card">
        <div className="profile_title">
          <Skeleton className="h-8 rounded w-3/4 mx-auto " />
        </div>
        <Skeleton className="bg-slate-200 w-50 h-75 rounded-full mx-auto" />
        <Skeleton className="bg-slate-200 w-full h-8 rounded mx-auto mt-7" />
        <Skeleton className="bg-slate-200 h-4 rounded w-2/3 mx-auto mt-4" />
      </div>
      <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
        <Skeleton className="h-8 mb-2.5 rounded w-1/4" />
        <div className="card_grid-sm">
          <StartupCardSkeleton />
        </div>
      </div>
    </section>
  );
}
