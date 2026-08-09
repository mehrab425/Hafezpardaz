import { prisma } from "@/lib/prisma";
import { ok, requireAdmin, paginate } from "@/lib/api-helpers";

export async function GET(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { searchParams } = new URL(req.url);
  const { skip, limit } = paginate(searchParams);
  const status = searchParams.get("status") ?? undefined;

  const [chats, total] = await Promise.all([
    prisma.supportChat.findMany({
      where: status ? { status } : undefined,
      include: { messages: { orderBy: { createdAt: "desc" }, take: 1 } },
      orderBy: { updatedAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.supportChat.count({ where: status ? { status } : undefined }),
  ]);

  return ok({ chats, total });
}

