import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { VideoForm } from "../VideoForm";

export default async function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/admin/login");
  const { id } = await params;
  const video = await prisma.video.findUnique({ where: { id: parseInt(id) } });
  if (!video) notFound();
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="ویرایش ویدیو" />
        <main className="flex-1 overflow-y-auto p-6"><VideoForm initialData={video} /></main>
      </div>
    </div>
  );
}
