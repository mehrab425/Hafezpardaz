import { prisma } from "@/lib/prisma";
import { ok, err, requireAdmin } from "@/lib/api-helpers";
import { settingSchema } from "@/lib/validations";

export async function GET() {
  const settings = await prisma.setting.findMany({ orderBy: { key: "asc" } });
  return ok(settings);
}

export async function PUT(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const body = await req.json().catch(() => null);
  if (!body) return err("Invalid JSON");

  const items = Array.isArray(body) ? body : [body];
  const results = await Promise.all(
    items.map(async (item: unknown) => {
      const parsed = settingSchema.safeParse(item);
      if (!parsed.success) return null;
      return prisma.setting.upsert({
        where: { key: parsed.data.key },
        update: { value: parsed.data.value, label: parsed.data.label, type: parsed.data.type },
        create: parsed.data,
      });
    })
  );
  return ok(results.filter(Boolean));
}
