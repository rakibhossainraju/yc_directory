import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const StartupCardSkeleton = ({ count = 4 }: { count?: number }) => {
  return Array.from({ length: count }).map((_, index) => (
    <div
      key={`${index}-skeleton-card`}
      className="bg-white border-[5px] border-black py-6 px-5 rounded-[22px] shadow-200 !hover:bg-white"
    >
      <div className="flex flex-between mb-4.5">
        <Skeleton className="w-[40%] h-6 inline-block" />
        <Skeleton className="w-[20%] h-6 inline-block" />
      </div>
      <div className="flex flex-between mb-5">
        <div className="w-full">
          <Skeleton className="w-[45%] h-6 inline-block mb-1.5" />
          <Skeleton className="w-[65%] h-9.5 inline-block" />
        </div>
        <Skeleton className="w-14 h-14 aspect-square m-0 rounded-full inline-block" />
      </div>
      <Skeleton className="w-full h-[145px] mb-4" />
      <div className="flex flex-between gap-3 w-full">
        <Skeleton className="w-[55%] h-6" />
        <Skeleton className="w-[23%] h-9 rounded-full" />
      </div>
    </div>
  ));
};
export default StartupCardSkeleton;
