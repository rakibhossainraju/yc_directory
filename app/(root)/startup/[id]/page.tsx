import { cacheTag, cacheLife } from 'next/cache';
import { sanityFetch } from '@/sanity/lib/live';
import { STARTUP_DETAIL_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Suspense } from 'react';
import markdownIt from 'markdown-it';
import formateDate from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import { Link } from '@/lib/custom-router';
import EditorPicks from '@/components/EditorPicks';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type ParamType = Promise<{ id: string }>;

const md = markdownIt();

async function getStartup(id: string) {
  'use cache';
  cacheTag('startup-detail-' + id);
  cacheLife('days');
  await wait();
  return await sanityFetch({
    query: STARTUP_DETAIL_QUERY,
    params: { id },
  });
}
const StartupDetailsPage = async ({ params }: { params: ParamType }) => {
  // const { id } = await params;
  // const startup = (
  //   await sanityFetch({
  //     query: STARTUP_DETAIL_QUERY,
  //     params: { id },
  //   })
  // ).data;

  // if (!startup) return notFound();

  // const parsedContent = md.render(startup.pitch ?? '');

  return (
    <>
      <section className="pink_container pattern !main-h-[230px]">
        <Suspense fallback={<h1>Loading...</h1>}>
          <StartupTitle params={params} />
        </Suspense>
      </section>

      {/*<section className="section_container">*/}
      {/*  <Image*/}
      {/*    className="w-full h-auto max-w-[1200px] max-h-[700px] bg-primary-100 rounded-xl object-cover drop-shadow-lg mx-auto"*/}
      {/*    src={startup.image!}*/}
      {/*    alt={startup.title!}*/}
      {/*    width={1200}*/}
      {/*    height={600}*/}
      {/*  />*/}
      {/*  <div className="space-y-5 mt-10 max-w-4xl mx-auto">*/}
      {/*    <div className="flex-between gap-5">*/}
      {/*      <Link href={`/user/${startup.author!._id}`} className="flex gap-2 items-center mb-3">*/}
      {/*        <Avatar className="size-16">*/}
      {/*          <AvatarImage*/}
      {/*            src={startup.author!.image!}*/}
      {/*            alt={startup.author!.name! + ' Avatar'}*/}
      {/*            className="rounded-full aspect-square  drop-shadow-lg"*/}
      {/*          />*/}
      {/*          <AvatarFallback className="font-bold">*/}
      {/*            {startup.author!.name?.charAt(0)}*/}
      {/*          </AvatarFallback>*/}
      {/*        </Avatar>*/}
      {/*        <div>*/}
      {/*          <p className="text-20-medium">{startup.author!.name!}</p>*/}
      {/*          <p className="text-20-medium !text-black-300">@{startup.author!.username!}</p>*/}
      {/*        </div>*/}
      {/*      </Link>*/}
      {/*      <Link href={`/?query=${startup.category}`}>*/}
      {/*        <span className="category-tag cursor-pointer">{startup.category}</span>*/}
      {/*      </Link>*/}
      {/*    </div>*/}
      {/*    <h3 className="text-30-bold">Pitch Details</h3>*/}
      {/*    {parsedContent ? (*/}
      {/*      <article*/}
      {/*        className="prose max-w-4xl font-work-sans break-all"*/}
      {/*        dangerouslySetInnerHTML={{ __html: parsedContent }}*/}
      {/*      />*/}
      {/*    ) : (*/}
      {/*      <p className="no-result">No details provided</p>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*  <hr className="divider" />*/}
      {/*  <Suspense fallback={null}>*/}
      {/*    <EditorPicks />*/}
      {/*  </Suspense>*/}
      {/*</section>*/}
      {/*<Suspense fallback={<Skeleton className="view_skeleton" />}>*/}
      {/*  <View id={id} />*/}
      {/*</Suspense>*/}
    </>
  );
};
export default StartupDetailsPage;
function wait() {
  return new Promise((resolve) => setTimeout(resolve, 5 * 2000));
}
export async function StartupTitle({ params }: { params: ParamType }) {
  const { id } = await params;
  const startup = (await getStartup(id)).data!;

  return (
    <>
      <p className="tag">{formateDate(startup._createdAt)}</p>
      <h1 className="heading">{startup.title}</h1>
      <p className="sub-heading !max-w-5xl">{startup.description}</p>
    </>
  );
}
