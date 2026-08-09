import { prisma } from "@/lib/prisma";
import { ok, err, requireAdmin, paginate } from "@/lib/api-helpers";
import { gallerySchema } from "@/lib/validations";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const { skip, limit } = paginate(searchParams);

  const [items, total] = await Promise.all([
    prisma.gallery.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }], skip, take: limit }),
    prisma.gallery.count(),
  ]);
  return ok({ items, total });
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const body = await req.json().catch(() => null);
  if (!body) return err("Invalid JSON");

  const parsed = gallerySchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message);

  const item = await prisma.gallery.create({ data: parsed.data });
  return ok(item, 201);
}
