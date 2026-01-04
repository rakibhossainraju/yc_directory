export default function UserDetailsSkeleton() {
  return (
    <section className="profile_container">
      <div className="profile_card">
        <div className="profile_title">
          <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto animate-pulse" />
        </div>
        <div className="w-[200px] h-[300px] bg-gray-300 rounded mx-auto animate-pulse" />
        <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mt-7 animate-pulse" />
        <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto mt-1 animate-pulse" />
      </div>
      <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
        <div className="h-8 bg-gray-300 rounded w-1/4 animate-pulse" />
        <ul className="card_grid-sm">
          <div className="h-48 bg-gray-300 rounded animate-pulse" />
          <div className="h-48 bg-gray-300 rounded animate-pulse" />
          <div className="h-48 bg-gray-300 rounded animate-pulse" />
        </ul>
      </div>
    </section>
  );
}
