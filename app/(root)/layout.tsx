import type { ReactNode } from "react";
import { Navbar } from "@/app/components/Navbar";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
