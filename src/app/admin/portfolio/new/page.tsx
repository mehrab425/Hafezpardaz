import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PortfolioForm } from "../PortfolioForm";

export default async function NewPortfolioPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="افزودن پروژه جدید" />
        <main className="flex-1 overflow-y-auto p-6">
          <PortfolioForm />
        </main>
      </div>
    </div>
  );
}
