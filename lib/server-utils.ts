import "server-only";
import { Session } from "next-auth";

export function isSessionValid(session: Session | null): boolean {
  if (!session || !session.user || !session.expires) return true;
  const expires = new Date(session.expires).getTime();
  return Date.now() >= expires;
}
