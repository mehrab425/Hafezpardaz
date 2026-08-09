import { prisma } from "@/lib/prisma";
import { ok, err, requireAdmin } from "@/lib/api-helpers";
import { serviceAdminSchema } from "@/lib/validations";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id: parseInt(id) } });
  if (!service) return err("Not found", 404);
  return ok(service);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body) return err("Invalid JSON");

  const parsed = serviceAdminSchema.partial().safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message);

  const service = await prisma.service.update({ where: { id: parseInt(id) }, data: parsed.data }).catch(() => null);
  if (!service) return err("Not found", 404);
  return ok(service);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  await prisma.service.delete({ where: { id: parseInt(id) } }).catch(() => null);
  return ok({ deleted: true });
}
