import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import React from 'react';
import StartupCard from './StartupCard';
import { StartupTypeCard } from '@/app/(root)/page';

const EditorPicks = async () => {
  const result = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {
    slug: 'editor-picks',
  });
  if (!result && !result!.select?.length) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-30-semibold">Editor Picks</p>
      <ul className="mt-7 card_grid-sm">
        {result!.select!.map((post) => (
          <StartupCard key={post._id} startup={post as any as StartupTypeCard} />
        ))}
      </ul>
    </div>
  );
};

export default EditorPicks;
