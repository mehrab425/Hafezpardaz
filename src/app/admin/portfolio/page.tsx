import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import { PortfolioActions } from "./PortfolioActions";
import { jParse } from "@/lib/api-helpers";

export default async function PortfolioAdminPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const items = await prisma.portfolio.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="مدیریت نمونه‌کارها" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400 text-sm">{items.length} پروژه</p>
            <Link href="/admin/portfolio/new">
              <button className="flex items-center gap-2 bg-[#C6FF34] text-black font-bold px-4 py-2 rounded-xl hover:bg-[#b8f025] transition-colors text-sm">
                <Plus className="w-4 h-4" /> افزودن پروژه
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.length === 0 ? (
              <p className="col-span-3 text-center py-16 text-gray-500">هنوز پروژه‌ای اضافه نشده</p>
            ) : items.map((item) => {
              const tags = jParse<string[]>(item.tags, []);
              return (
                <div key={item.id} className="bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden">
                  {item.image ? (
                    <div className="relative h-40 bg-white/5">
                      <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="h-40 bg-white/5 flex items-center justify-center text-gray-600 text-sm">بدون تصویر</div>
                  )}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-white font-medium text-sm">{item.title}</h3>
                      {item.category && <p className="text-gray-500 text-xs mt-0.5">{item.category}</p>}
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {tags.map((t) => (
                          <span key={t} className="px-1.5 py-0.5 bg-white/5 text-gray-400 rounded text-xs">{t}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-2 pt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.published ? "bg-green-500/10 text-green-400" : "bg-gray-500/10 text-gray-500"}`}>
                        {item.published ? "منتشر" : "پیش‌نویس"}
                      </span>
                      {item.featured && <span className="px-2 py-0.5 bg-[#C6FF34]/10 text-[#C6FF34] rounded-full text-xs">ویژه</span>}
                    </div>
                    <div className="flex items-center gap-2 border-t border-white/5 pt-3">
                      <Link href={`/admin/portfolio/${item.id}`} className="flex-1">
                        <button className="w-full flex items-center justify-center gap-1.5 py-1.5 border border-white/10 text-gray-400 rounded-lg hover:text-white hover:border-white/30 transition-colors text-xs">
                          <Pencil className="w-3 h-3" /> ویرایش
                        </button>
                      </Link>
                      {item.url && (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-1.5 border border-white/10 text-gray-400 rounded-lg hover:text-white hover:border-white/30 transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <PortfolioActions id={item.id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
