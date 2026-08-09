import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ContentEditor } from "./ContentEditor";

export default async function ContentPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const items = await prisma.siteContent.findMany({ orderBy: { key: "asc" } });

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="محتوای سایت" />
        <main className="flex-1 overflow-y-auto p-6">
          <ContentEditor initialItems={items} />
        </main>
      </div>
    </div>
  );
}
