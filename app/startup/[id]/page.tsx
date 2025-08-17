import { sanityFetch } from "@/sanity/lib/live";
import { STARTUP_DETAIL_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import formateDate from "@/lib/utils";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const startup = (
    await sanityFetch({
      query: STARTUP_DETAIL_QUERY,
      params: { id },
    })
  ).data;

  if (!startup) return notFound();

  return (
    <>
      <section className="pink_container pattern !main-h-[230px]">
        <p className="tag">{formateDate(startup._createdAt)}</p>
        <h1 className="heading">{startup.title}</h1>
        <p className="sub-heading !max-w-5xl">{startup.description}</p>
      </section>
      <section className="section_container">
        <Image
          className="w-full h-auto"
          src={startup.image!}
          alt={startup.title!}
          width={1080}
          height={1080}
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${startup.author!._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={startup.author!.image!}
                alt={startup.author!.name! + " Avatar"}
                width={64}
                height={64}
                className="rounded-full aspect-square  drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{startup.author!.name!}</p>
                <p className="text-20-medium !text-black-300">
                  @{startup.author!.username!}
                </p>
              </div>
            </Link>
            <Link href={`/?query=${startup.category}`}>
              <span className="category-tag cursor-pointer">
                {startup.category}
              </span>
            </Link>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
        </div>
      </section>
    </>
  );
};
export default Page;
