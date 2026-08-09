import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatsCard } from "@/components/admin/StatsCard";
import { BarChart2, Eye, ShoppingCart, Users, TrendingUp, MessageCircle } from "lucide-react";

export default async function AnalyticsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [
    totalViews,
    last30Days,
    last7Days,
    totalOrders,
    completedOrders,
    openChats,
    topPages,
  ] = await Promise.all([
    prisma.analytics.count({ where: { event: "pageview" } }),
    prisma.analytics.count({ where: { event: "pageview", createdAt: { gte: thirtyDaysAgo } } }),
    prisma.analytics.count({ where: { event: "pageview", createdAt: { gte: sevenDaysAgo } } }),
    prisma.order.count(),
    prisma.order.count({ where: { status: "COMPLETED" } }),
    prisma.supportChat.count({ where: { status: "OPEN" } }),
    prisma.analytics.groupBy({
      by: ["path"],
      _count: { path: true },
      where: { event: "pageview", createdAt: { gte: thirtyDaysAgo } },
      orderBy: { _count: { path: "desc" } },
      take: 10,
    }),
  ]);

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="آمار و تحلیل" />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatsCard label="کل بازدیدها" value={totalViews} icon={Eye} color="#C6FF34" />
            <StatsCard label="بازدید ۳۰ روز اخیر" value={last30Days} icon={TrendingUp} color="#60A5FA" />
            <StatsCard label="بازدید ۷ روز اخیر" value={last7Days} icon={BarChart2} color="#34D399" />
            <StatsCard label="کل سفارش‌ها" value={totalOrders} icon={ShoppingCart} color="#FB923C" />
            <StatsCard label="سفارش‌های تکمیل شده" value={completedOrders} icon={Users} color="#A78BFA" />
            <StatsCard label="چت‌های باز" value={openChats} icon={MessageCircle} color="#F472B6" />
          </div>

          <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#C6FF34]" />
              صفحات پربازدید (۳۰ روز اخیر)
            </h2>
            <div className="space-y-3">
              {topPages.length === 0 ? (
                <p className="text-gray-500 text-sm">داده‌ای موجود نیست</p>
              ) : (
                topPages.map((page, i) => {
                  const max = topPages[0]._count.path;
                  const pct = Math.round((page._count.path / max) * 100);
                  return (
                    <div key={page.path} className="flex items-center gap-3">
                      <span className="text-gray-500 text-xs w-5">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-300 text-sm truncate" dir="ltr">{page.path}</span>
                          <span className="text-gray-400 text-xs mr-2">{page._count.path.toLocaleString("fa-IR")}</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#C6FF34] rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
