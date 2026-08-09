import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostForm } from "../PostForm";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
  if (!post) notFound();

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="ویرایش مقاله" />
        <main className="flex-1 overflow-y-auto p-6">
          <PostForm initialData={post} />
        </main>
      </div>
    </div>
  );
}
