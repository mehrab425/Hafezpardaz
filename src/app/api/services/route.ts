import { prisma } from "@/lib/prisma";
import { ok, err, requireAdmin, paginate } from "@/lib/api-helpers";
import { serviceAdminSchema } from "@/lib/validations";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const { skip, limit } = paginate(searchParams);
  const activeOnly = searchParams.get("active") === "true";

  const where = activeOnly ? { active: true } : {};
  const [services, total] = await Promise.all([
    prisma.service.findMany({ where, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }], skip, take: limit }),
    prisma.service.count({ where }),
  ]);
  return ok({ services, total });
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const body = await req.json().catch(() => null);
  if (!body) return err("Invalid JSON");

  const parsed = serviceAdminSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message);

  const service = await prisma.service.create({ data: parsed.data });
  return ok(service, 201);
}
