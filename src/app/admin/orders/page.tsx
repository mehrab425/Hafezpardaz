import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge";
import Link from "next/link";
import { Eye } from "lucide-react";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const { status, search } = await searchParams;

  const where = {
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            { customerName: { contains: search } },
            { email: { contains: search } },
            { phone: { contains: search } },
          ],
        }
      : {}),
  };

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const statuses = ["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="سفارش‌ها" />
        <main className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/orders"
              className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${!status ? "bg-[#C6FF34] text-black font-bold" : "bg-white/5 text-gray-400 hover:text-white"}`}
            >
              همه
            </Link>
            {statuses.map((s) => (
              <Link
                key={s}
                href={`/admin/orders?status=${s}`}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${status === s ? "bg-[#C6FF34] text-black font-bold" : "bg-white/5 text-gray-400 hover:text-white"}`}
              >
                <OrderStatusBadge status={s} />
              </Link>
            ))}
          </div>

          <div className="bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">#</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">مشتری</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">تلفن</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">مبلغ</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">وضعیت</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">تاریخ</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-gray-500">هیچ سفارشی یافت نشد</td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/2">
                        <td className="py-3 px-4 text-gray-500">#{order.id}</td>
                        <td className="py-3 px-4">
                          <p className="text-white">{order.customerName}</p>
                          <p className="text-gray-500 text-xs">{order.email}</p>
                        </td>
                        <td className="py-3 px-4 text-gray-300" dir="ltr">{order.phone}</td>
                        <td className="py-3 px-4 text-[#C6FF34]">
                          {Number(order.totalAmount).toLocaleString("fa-IR")} تومان
                        </td>
                        <td className="py-3 px-4"><OrderStatusBadge status={order.status} /></td>
                        <td className="py-3 px-4 text-gray-400 text-xs">
                          {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                        </td>
                        <td className="py-3 px-4">
                          <Link href={`/admin/orders/${order.id}`} className="text-gray-400 hover:text-[#C6FF34]">
                            <Eye className="w-4 h-4" />
                          </Link>
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
