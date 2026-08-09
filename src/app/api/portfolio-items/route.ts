import { prisma } from "@/lib/prisma";
import { ok, err, requireAdmin, paginate, jStr, jParse } from "@/lib/api-helpers";
import { portfolioItemSchema } from "@/lib/validations";

function serialize<T extends { tags: string }>(p: T) {
  return { ...p, tags: jParse(p.tags, []) };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const { skip, limit } = paginate(searchParams);
  const all = searchParams.get("all");

  const where = all ? {} : { published: true };
  const [items, total] = await Promise.all([
    prisma.portfolio.findMany({ where, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }], skip, take: limit }),
    prisma.portfolio.count({ where }),
  ]);
  return ok({ items: items.map(serialize), total });
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const body = await req.json().catch(() => null);
  if (!body) return err("Invalid JSON");

  const parsed = portfolioItemSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message);

  const { tags, ...rest } = parsed.data;
  const item = await prisma.portfolio.create({ data: { ...rest, tags: jStr(tags) } });
  return ok(serialize(item), 201);
}
