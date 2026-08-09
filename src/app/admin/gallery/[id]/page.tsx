import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { GalleryForm } from "../GalleryForm";

export default async function EditGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const item = await prisma.gallery.findUnique({ where: { id: parseInt(id) } });
  if (!item) notFound();

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="ویرایش تصویر" />
        <main className="flex-1 overflow-y-auto p-6">
          <GalleryForm initialData={item} />
        </main>
      </div>
    </div>
  );
}
