"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";

export function ClientLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="noise-overlay fixed inset-0 z-[1] pointer-events-none opacity-30" />
      <Navbar />
      <main className="relative z-[2]">{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}
