import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export interface PostType {
  _createdAt: string;
  views: number;
  author: { _id: number; name: string };
  title: string;
  description: string;
  image: string;
  category: string;
  _id: number;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query ?? "";
  const posts: PostType[] = [
    {
      _id: 1,
      _createdAt: "2023-10-01T12:00:00Z",
      views: 150,
      author: { _id: 1, name: "Alice Johnson" },
      title: "Pikachu",
      description: "Exploring the future of AI in business.",
      image:
        "https://wallpapers.com/images/featured-full/detective-pikachu-9z3yp3akua2dnmeh.jpg",
      category: "Technology",
    },
  ];

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
      </section>
    </>
  );
}
