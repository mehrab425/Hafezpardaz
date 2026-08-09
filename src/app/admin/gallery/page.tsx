import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { GalleryActions } from "./GalleryActions";

export default async function GalleryPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const items = await prisma.gallery.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="گالری تصاویر" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400 text-sm">{items.length} تصویر</p>
            <Link href="/admin/gallery/new">
              <button className="flex items-center gap-2 bg-[#C6FF34] text-black font-bold px-4 py-2 rounded-xl hover:bg-[#b8f025] transition-colors text-sm">
                <Plus className="w-4 h-4" /> افزودن تصویر
              </button>
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">هنوز تصویری اضافه نشده</p>
              <Link href="/admin/gallery/new">
                <button className="flex items-center gap-2 bg-[#C6FF34] text-black font-bold px-4 py-2 rounded-xl hover:bg-[#b8f025] transition-colors text-sm mx-auto">
                  <Plus className="w-4 h-4" /> افزودن اولین تصویر
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {items.map((item) => (
                <div key={item.id} className="group bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden">
                  <div className="relative aspect-square">
                    <Image src={item.filePath} alt={item.alt ?? item.title} fill className="object-cover" unoptimized />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Link href={`/admin/gallery/${item.id}`}>
                        <button className="p-2 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition-colors">
                          <Pencil className="w-4 h-4 text-white" />
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-white text-sm font-medium truncate">{item.title}</p>
                    {item.description && <p className="text-gray-500 text-xs mt-0.5 truncate">{item.description}</p>}
                    <div className="mt-2">
                      <GalleryActions id={item.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
