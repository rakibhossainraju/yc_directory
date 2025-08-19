import { type ReactNode, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
export const experimental_ppr = true;

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main>
      <Suspense
        fallback={
          <nav>
            <h1>Loading</h1>
          </nav>
        }
      >
        <Navbar />
      </Suspense>
      {children}
    </main>
  );
}
