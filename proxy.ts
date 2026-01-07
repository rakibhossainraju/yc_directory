import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/auth';
import { isSessionInValid } from '@/lib/server-utils';

export async function proxy(req: NextRequest) {
  const session = await auth();
  if (isSessionInValid(session)) {
    const url = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/startup/create'], // e.g., your page route
};
