import { type Session as AuthSession } from 'next-auth';
import { type JWT as AuthJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  export interface Session extends AuthSession {
    id: string;
  }
  interface JWT extends AuthJWT {
    id: string;
  }
}
