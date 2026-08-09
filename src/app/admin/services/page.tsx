import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { ServiceActions } from "./ServiceActions";

export default async function ServicesAdminPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const services = await prisma.service.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="مدیریت خدمات" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400 text-sm">{services.length} خدمت</p>
            <Link href="/admin/services/new">
              <button className="flex items-center gap-2 bg-[#C6FF34] text-black font-bold px-4 py-2 rounded-xl hover:bg-[#b8f025] transition-colors text-sm">
                <Plus className="w-4 h-4" /> افزودن خدمت
              </button>
            </Link>
          </div>

          <div className="bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-gray-500 text-xs">
                  <th className="text-right py-3 px-4">عنوان</th>
                  <th className="text-right py-3 px-4 hidden md:table-cell">قیمت</th>
                  <th className="text-right py-3 px-4 hidden sm:table-cell">وضعیت</th>
                  <th className="text-right py-3 px-4">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-12 text-gray-500">هنوز خدمتی اضافه نشده</td></tr>
                ) : services.map((s) => (
                  <tr key={s.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {s.image && (
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                            <Image src={s.image} alt={s.title} fill className="object-cover" unoptimized />
                          </div>
                        )}
                        <span className="text-white font-medium">{s.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-400 hidden md:table-cell">
                      {s.price ? `${s.price.toLocaleString("fa-IR")} تومان` : "—"}
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.active ? "bg-green-500/10 text-green-400" : "bg-gray-500/10 text-gray-500"}`}>
                        {s.active ? "فعال" : "غیرفعال"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/services/${s.id}`}>
                          <button className="p-1.5 border border-white/10 text-gray-400 rounded-lg hover:text-white hover:border-white/30 transition-colors">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        </Link>
                        <ServiceActions id={s.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
