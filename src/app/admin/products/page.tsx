import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";
import { ProductActions } from "./ProductActions";

export default async function ProductsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="محصولات" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400 text-sm">{products.length} محصول</p>
            <Link
              href="/admin/products/new"
              className="flex items-center gap-2 bg-[#C6FF34] text-black font-bold px-4 py-2 rounded-xl text-sm hover:bg-[#b8f025] transition-colors"
            >
              <Plus className="w-4 h-4" />
              محصول جدید
            </Link>
          </div>

          <div className="bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">محصول</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">دسته‌بندی</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">قیمت</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">موجودی</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">وضعیت</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-500">هیچ محصولی یافت نشد</td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id} className="border-b border-white/5 hover:bg-white/2">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            {product.image ? (
                              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 relative">
                                <Image src={product.image} alt={product.title} fill className="object-cover" />
                              </div>
                            ) : (
                              <div className="w-10 h-10 bg-white/5 rounded-lg flex-shrink-0" />
                            )}
                            <div>
                              <p className="text-white font-medium truncate max-w-[150px]">{product.title}</p>
                              <p className="text-gray-500 text-xs">{product.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{product.category}</td>
                        <td className="py-3 px-4 text-[#C6FF34]">
                          {Number(product.price).toLocaleString("fa-IR")} تومان
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-xs ${product.inStock ? "text-green-400" : "text-red-400"}`}>
                            {product.inStock ? "موجود" : "ناموجود"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${
                              product.published
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                            }`}
                          >
                            {product.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            {product.published ? "فعال" : "غیرفعال"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Link href={`/admin/products/${product.id}`} className="text-gray-400 hover:text-[#C6FF34]">
                              <Pencil className="w-4 h-4" />
                            </Link>
                            <ProductActions id={product.id} />
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
