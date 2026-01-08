import React from 'react';

const Page = () => {
  return (
    <div>
      {Array.from({ length: 1000 }).map((_, i) => (
        <h1 key={i} className="font-bold text-3xl">
          Hello World {i}
        </h1>
      ))}
    </div>
  );
};
export default Page;
