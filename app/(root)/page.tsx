import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { Startup, Author } from "@/sanity/types";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query ?? "";
  const posts = (
    await sanityFetch({
      query: STARTUPS_QUERY,
      params: { search: query || null },
    })
  ).data as StartupTypeCard[];

  return (
    <>
      <section className="pink_container pattern">
        <h1 className="heading rounded-sm">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results fro "${query}"` : "Recent Pitches"}
        </p>
        <ul className="mt-7 card_grid">
          {posts.map((post, index) => (
            <StartupCard key={(post._id + index).toString()} post={post} />
          ))}
        </ul>
        <SanityLive />
      </section>
    </>
  );
}
