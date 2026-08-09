import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge";
import { OrderStatusUpdate } from "./OrderStatusUpdate";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id: parseInt(id) },
    include: { items: { include: { product: true } } },
  });
  if (!order) notFound();

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title={`سفارش #${order.id}`} />
        <main className="flex-1 overflow-y-auto p-6 space-y-6 max-w-4xl">
          <Link href="/admin/orders" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm">
            <ArrowRight className="w-4 h-4" />
            بازگشت به سفارش‌ها
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5 space-y-3">
              <h2 className="text-white font-bold border-b border-white/5 pb-3">اطلاعات مشتری</h2>
              {[
                { label: "نام", value: order.customerName },
                { label: "ایمیل", value: order.email },
                { label: "تلفن", value: order.phone },
                { label: "شرکت", value: order.company ?? "—" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between text-sm">
                  <span className="text-gray-400">{row.label}</span>
                  <span className="text-white">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5 space-y-3">
              <h2 className="text-white font-bold border-b border-white/5 pb-3">جزئیات سفارش</h2>
              {[
                { label: "مبلغ کل", value: `${Number(order.totalAmount).toLocaleString("fa-IR")} تومان` },
                { label: "تاریخ ثبت", value: new Date(order.createdAt).toLocaleDateString("fa-IR") },
                ...(order.budget ? [{ label: "بودجه", value: order.budget }] : []),
                ...(order.timeline ? [{ label: "زمانبندی", value: order.timeline }] : []),
              ].map((row) => (
                <div key={row.label} className="flex justify-between text-sm">
                  <span className="text-gray-400">{row.label}</span>
                  <span className="text-white">{row.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center text-sm pt-1">
                <span className="text-gray-400">وضعیت</span>
                <OrderStatusBadge status={order.status} />
              </div>
            </div>
          </div>

          {order.description && (
            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5">
              <h2 className="text-white font-bold mb-3">توضیحات</h2>
              <p className="text-gray-300 text-sm leading-relaxed">{order.description}</p>
            </div>
          )}

          {order.notes && (
            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5">
              <h2 className="text-white font-bold mb-3">یادداشت</h2>
              <p className="text-gray-300 text-sm leading-relaxed">{order.notes}</p>
            </div>
          )}

          <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5">
            <h2 className="text-white font-bold mb-4">تغییر وضعیت</h2>
            <OrderStatusUpdate orderId={order.id} currentStatus={order.status} />
          </div>
        </main>
      </div>
    </div>
  );
}
