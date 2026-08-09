import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { VideoForm } from "../VideoForm";

export default async function NewVideoPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="ویدیو جدید" />
        <main className="flex-1 overflow-y-auto p-6"><VideoForm /></main>
      </div>
    </div>
  );
}
