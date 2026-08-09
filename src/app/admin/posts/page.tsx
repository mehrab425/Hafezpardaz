import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import Link from "next/link";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";
import { PostActions } from "./PostActions";

export default async function PostsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="مقالات" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400 text-sm">{posts.length} مقاله</p>
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-2 bg-[#C6FF34] text-black font-bold px-4 py-2 rounded-xl text-sm hover:bg-[#b8f025] transition-colors"
            >
              <Plus className="w-4 h-4" />
              مقاله جدید
            </Link>
          </div>

          <div className="bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">عنوان</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">دسته‌بندی</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">نویسنده</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">وضعیت</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-500">
                        هیچ مقاله‌ای یافت نشد
                      </td>
                    </tr>
                  ) : (
                    posts.map((post) => (
                      <tr key={post.id} className="border-b border-white/5 hover:bg-white/2">
                        <td className="py-3 px-4">
                          <p className="text-white font-medium truncate max-w-[200px]">{post.title}</p>
                          <p className="text-gray-500 text-xs">{post.slug}</p>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{post.category}</td>
                        <td className="py-3 px-4 text-gray-300">{post.author}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${
                              post.published
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                            }`}
                          >
                            {post.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            {post.published ? "منتشر" : "پیش‌نویس"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/posts/${post.id}`}
                              className="text-gray-400 hover:text-[#C6FF34] transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </Link>
                            <PostActions id={post.id} />
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
