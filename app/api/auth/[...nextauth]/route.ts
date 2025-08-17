import { handlers } from "@/auth";

// Casting to any to bridge NextAuth handler (expects NextRequest) and Next.js 15 route type until upstream types align.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET: any = handlers.GET;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const POST: any = handlers.POST;
