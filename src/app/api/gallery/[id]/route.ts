import { prisma } from "@/lib/prisma";
import { ok, err, requireAdmin } from "@/lib/api-helpers";
import { gallerySchema } from "@/lib/validations";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.gallery.findUnique({ where: { id: parseInt(id) } });
  if (!item) return err("Not found", 404);
  return ok(item);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body) return err("Invalid JSON");

  const parsed = gallerySchema.partial().safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message);

  const item = await prisma.gallery.update({ where: { id: parseInt(id) }, data: parsed.data }).catch(() => null);
  if (!item) return err("Not found", 404);
  return ok(item);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  await prisma.gallery.delete({ where: { id: parseInt(id) } }).catch(() => null);
  return ok({ deleted: true });
}
