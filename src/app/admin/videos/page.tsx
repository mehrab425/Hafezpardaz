import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import Link from "next/link";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";
import { VideoActions } from "./VideoActions";

export default async function VideosPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const videos = await prisma.video.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="ویدیوها" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400 text-sm">{videos.length} ویدیو</p>
            <Link
              href="/admin/videos/new"
              className="flex items-center gap-2 bg-[#C6FF34] text-black font-bold px-4 py-2 rounded-xl text-sm hover:bg-[#b8f025] transition-colors"
            >
              <Plus className="w-4 h-4" />
              ویدیو جدید
            </Link>
          </div>
          <div className="bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">عنوان</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">دسته‌بندی</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">وضعیت</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.length === 0 ? (
                    <tr><td colSpan={4} className="py-12 text-center text-gray-500">هیچ ویدیویی یافت نشد</td></tr>
                  ) : (
                    videos.map((video) => (
                      <tr key={video.id} className="border-b border-white/5 hover:bg-white/2">
                        <td className="py-3 px-4">
                          <p className="text-white font-medium">{video.title}</p>
                          <p className="text-gray-500 text-xs">{video.slug}</p>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{video.category ?? "—"}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${video.published ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-gray-500/10 text-gray-400 border-gray-500/20"}`}>
                            {video.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            {video.published ? "منتشر" : "مخفی"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Link href={`/admin/videos/${video.id}`} className="text-gray-400 hover:text-[#C6FF34]">
                              <Pencil className="w-4 h-4" />
                            </Link>
                            <VideoActions id={video.id} />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
