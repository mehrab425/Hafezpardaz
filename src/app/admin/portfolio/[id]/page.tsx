import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PortfolioForm } from "../PortfolioForm";
import { jParse } from "@/lib/api-helpers";

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const item = await prisma.portfolio.findUnique({ where: { id: parseInt(id) } });
  if (!item) notFound();

  const data = { ...item, tags: jParse<string[]>(item.tags, []) };

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="ویرایش پروژه" />
        <main className="flex-1 overflow-y-auto p-6">
          <PortfolioForm initialData={data} />
        </main>
      </div>
    </div>
  );
}
