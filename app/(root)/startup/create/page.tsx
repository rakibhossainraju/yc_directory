import React from "react";
import StartupForm from "@/components/StartupForm";

export const experimental_ppr = true;

const Page = async () => {
  return (
    <>
      <section className="pink_container pattern !min-h-[230px]">
        <h1 className="heading">Submit Your Startup</h1>
        <h1 className="heading">{Math.floor(Math.random() * 99) + 1}</h1>
      </section>
      <StartupForm />
    </>
  );
};
export default Page;
