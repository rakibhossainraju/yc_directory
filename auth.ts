import NextAuth from 'next-auth';
import GitHub from '@auth/core/providers/github';
import { AUTHOR_BY_GITHUB_ID_QUERY } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write-client';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user: { email, image, name }, profile }) {
      const { id, login, bio } = profile!;
      const existingUser = await writeClient.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
        id: id,
      });
      if (!existingUser) {
        await writeClient.create({
          _type: 'author',
          id,
          email,
          image,
          name,
          username: login,
          bio: bio || '',
          startup_refs: [],
        });
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await writeClient.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile.id,
        });
        token.id = user?._id;
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
