import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ServiceForm } from "../ServiceForm";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id: parseInt(id) } });
  if (!service) notFound();

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="ویرایش خدمت" />
        <main className="flex-1 overflow-y-auto p-6">
          <ServiceForm initialData={service} />
        </main>
      </div>
    </div>
  );
}
