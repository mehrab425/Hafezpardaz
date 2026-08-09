import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatsCard } from "@/components/admin/StatsCard";
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge";
import {
  ShoppingCart, ShoppingBag, FileText, Video,
  Users, MessageCircle, TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [orders, products, posts, videos, visitors, openChats, recentOrders, recentChats] =
    await Promise.all([
      prisma.order.count(),
      prisma.product.count(),
      prisma.post.count(),
      prisma.video.count(),
      prisma.analytics.count({ where: { event: "pageview" } }),
      prisma.supportChat.count({ where: { status: "OPEN" } }),
      prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.supportChat.findMany({
        where: { status: "OPEN" },
        include: { messages: { orderBy: { createdAt: "desc" }, take: 1 } },
        orderBy: { updatedAt: "desc" },
        take: 5,
      }),
    ]);

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="داشبورد" />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <StatsCard label="سفارش‌ها" value={orders} icon={ShoppingCart} color="#C6FF34" />
            <StatsCard label="محصولات" value={products} icon={ShoppingBag} color="#60A5FA" />
            <StatsCard label="مقالات" value={posts} icon={FileText} color="#34D399" />
            <StatsCard label="ویدیوها" value={videos} icon={Video} color="#FB923C" />
            <StatsCard label="بازدیدکنندگان" value={visitors} icon={Users} color="#A78BFA" />
            <StatsCard label="چت‌های باز" value={openChats} icon={MessageCircle} color="#F472B6" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <h2 className="text-white font-bold flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-[#C6FF34]" />
                  آخرین سفارش‌ها
                </h2>
                <Link href="/admin/orders" className="text-xs text-[#C6FF34] hover:underline">
                  مشاهده همه
                </Link>
              </div>
              <div className="divide-y divide-white/5">
                {recentOrders.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">هیچ سفارشی ثبت نشده</p>
                ) : (
                  recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 hover:bg-white/2">
                      <div>
                        <p className="text-white text-sm font-medium">{order.customerName}</p>
                        <p className="text-gray-500 text-xs">{order.email}</p>
                      </div>
                      <div className="text-left flex items-center gap-3">
                        <OrderStatusBadge status={order.status} />
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="text-xs text-gray-400 hover:text-white"
                        >
                          جزئیات
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <h2 className="text-white font-bold flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#C6FF34]" />
                  چت‌های باز
                </h2>
                <Link href="/admin/chat" className="text-xs text-[#C6FF34] hover:underline">
                  مشاهده همه
                </Link>
              </div>
              <div className="divide-y divide-white/5">
                {recentChats.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">هیچ چت فعالی وجود ندارد</p>
                ) : (
                  recentChats.map((chat) => (
                    <div key={chat.id} className="flex items-center justify-between p-4 hover:bg-white/2">
                      <div>
                        <p className="text-white text-sm font-medium">
                          {chat.visitorName ?? "بازدیدکننده ناشناس"}
                        </p>
                        <p className="text-gray-500 text-xs truncate max-w-[200px]">
                          {chat.messages[0]?.content ?? "پیامی ارسال نشده"}
                        </p>
                      </div>
                      <Link
                        href={`/admin/chat?session=${chat.sessionId}`}
                        className="text-xs text-[#C6FF34] hover:underline"
                      >
                        پاسخ
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5">
            <h2 className="text-white font-bold flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-[#C6FF34]" />
              دسترسی سریع
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { href: "/admin/posts/new", label: "مقاله جدید", icon: FileText },
                { href: "/admin/products/new", label: "محصول جدید", icon: ShoppingBag },
                { href: "/admin/videos/new", label: "ویدیو جدید", icon: Video },
                { href: "/admin/content", label: "ویرایش محتوا", icon: Users },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 bg-white/5 hover:bg-[#C6FF34]/10 hover:text-[#C6FF34] rounded-lg p-3 text-gray-300 text-sm transition-all"
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
