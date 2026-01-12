import { Suspense, ViewTransition } from 'react';
import Image from 'next/image';
import UserStartups from '@/components/UserStartups';
import { getUserDetailsById } from '@/lib/queries';
import { notFound } from 'next/navigation';
interface PropsType {
  userId: string;
}

export async function UserDetails({ userId }: PropsType) {
  const user = await getUserDetailsById(userId);
  if (!user) return notFound();
  const id = user._id;

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">{user.name}</h3>
          </div>
          <Image
            src={user.image}
            alt={user.name + ' Avatar'}
            width={200}
            height={300}
            className="profile_image fade-in"
          />
          <p className="text-30-extrabold mt-7 text-center">@{user.username}</p>
          <p className="mt-1 text-center text-14-normal">{user.bio}</p>
        </div>
        <div className="flex-1  flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold fade-in">All Startups</p>
          <ul className="card_grid-sm">
            {user.startup_refs?.length && (
              <ViewTransition>
                <UserStartups userId={id} />
              </ViewTransition>
            )}
          </ul>
        </div>
      </section>
    </>
  );
}
