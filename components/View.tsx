import React from 'react';
import Ping from '@/components/Ping';
import { after } from 'next/server';
import { getStartupTotalViewCount } from '@lib/queries';
import { incrementStartupViews } from '@lib/actions';

const View = async ({ startupId }: { startupId: string }) => {
  const totalViews = await getStartupTotalViewCount(startupId);
  after(() => incrementStartupViews(startupId, totalViews));

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">{totalViews} views</span>
      </p>
    </div>
  );
};
export default View;
