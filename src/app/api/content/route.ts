import { prisma } from "@/lib/prisma";
import { ok, err, requireAdmin } from "@/lib/api-helpers";
import { contentSchema } from "@/lib/validations";

export async function GET() {
  const items = await prisma.siteContent.findMany({ orderBy: { key: "asc" } });
  return ok(items);
}

export async function PUT(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const body = await req.json().catch(() => null);
  if (!body) return err("Invalid JSON");

  // Accept single item or array
  const items = Array.isArray(body) ? body : [body];

  const results = await Promise.all(
    items.map(async (item: unknown) => {
      const parsed = contentSchema.safeParse(item);
      if (!parsed.success) return null;

      return prisma.siteContent.upsert({
        where: { key: parsed.data.key },
        update: { value: parsed.data.value, type: parsed.data.type },
        create: parsed.data,
      });
    })
  );

  return ok(results.filter(Boolean));
}

