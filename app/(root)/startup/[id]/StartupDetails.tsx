import { Suspense } from 'react';
import markdownIt from 'markdown-it';
import { redirect } from 'next/navigation';
import formateDate from '@/lib/utils';
import { Link } from '@router/customized';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import EditorPicks from '@/components/EditorPicks';
import View from '@/components/View';
import { getStartupDetails, StartupParamType } from '@/app/(root)/startup/[id]/page';

const md = markdownIt();

export const StartupDetails = async ({ params }: { params: StartupParamType }) => {
  const { id } = await params;
  const startup = await getStartupDetails(id);

  if (!startup) {
    redirect('/404');
  }

  const parsedContent = md.render(startup.pitch ?? '');

  return (
    <>
      <section className="pink_container pattern !main-h-[230px]">
        <p className="tag">{formateDate(startup._createdAt)}</p>
        <div className="heading">
          <h1 className="fade-in">{startup.title}</h1>
        </div>
        <p className="sub-heading !max-w-5xl fade-in">{startup.description}</p>
      </section>

      <section className="section_container">
        <img
          className="w-full h-auto max-w-[1200px] max-h-[700px] bg-primary-100 rounded-xl object-cover drop-shadow-lg mx-auto"
          src={startup.image!}
          alt={startup.title!}
          width={1200}
          height={600}
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${startup.author!._id}`} className="flex gap-2 items-center mb-3">
              <Avatar className="size-16">
                <AvatarImage
                  src={startup.author!.image!}
                  alt={startup.author!.name! + ' Avatar'}
                  className="rounded-full aspect-square  drop-shadow-lg"
                />
                <AvatarFallback className="font-bold">
                  {startup.author!.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-20-medium">{startup.author!.name!}</p>
                <p className="text-20-medium !text-black-300">@{startup.author!.username!}</p>
              </div>
            </Link>
            <Link href={`/public?query=${startup.category}`}>
              <span className="category-tag cursor-pointer">{startup.category}</span>
            </Link>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>
        <hr className="divider" />
        <Suspense fallback={null}>
          <EditorPicks />
        </Suspense>
      </section>
      <Suspense fallback={null}>
        <View id={id} />
      </Suspense>
    </>
  );
};
