import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminChatPanel } from "./AdminChatPanel";

export default async function AdminChatPage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const { session: activeSession } = await searchParams;

  const rawChats = await prisma.supportChat.findMany({
    include: { messages: { orderBy: { createdAt: "desc" }, take: 1 } },
    orderBy: { updatedAt: "desc" },
    take: 30,
  });

  const chats = rawChats.map((chat) => ({
    ...chat,
    updatedAt: chat.updatedAt.toISOString(),
    createdAt: chat.createdAt.toISOString(),
    messages: chat.messages.map((msg) => ({
      ...msg,
      createdAt: msg.createdAt.toISOString(),
    })),
  }));

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="پشتیبانی چت" />
        <main className="flex-1 overflow-hidden">
          <AdminChatPanel chats={chats} activeSessionId={activeSession} />
        </main>
      </div>
    </div>
  );
}
