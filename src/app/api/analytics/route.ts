import { prisma } from "@/lib/prisma";
import { ok, requireAdmin } from "@/lib/api-helpers";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [
    totalVisitors,
    recentPageViews,
    orders,
    products,
    posts,
    videos,
    openChats,
  ] = await Promise.all([
    prisma.analytics.count({ where: { event: "pageview" } }),
    prisma.analytics.count({
      where: { event: "pageview", createdAt: { gte: thirtyDaysAgo } },
    }),
    prisma.order.count(),
    prisma.product.count(),
    prisma.post.count(),
    prisma.video.count(),
    prisma.supportChat.count({ where: { status: "OPEN" } }),
  ]);

  return ok({
    totalVisitors,
    recentPageViews,
    orders,
    products,
    posts,
    videos,
    openChats,
  });
}

