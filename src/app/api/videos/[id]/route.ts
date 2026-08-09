import { prisma } from "@/lib/prisma";
import { ok, err, requireAdmin } from "@/lib/api-helpers";
import { videoSchema } from "@/lib/validations";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = await prisma.video.findUnique({ where: { id: parseInt(id) } });
  if (!video) return err("Video not found", 404);
  return ok(video);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body) return err("Invalid JSON");

  const parsed = videoSchema.partial().safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message);

  const video = await prisma.video
    .update({ where: { id: parseInt(id) }, data: parsed.data })
    .catch(() => null);

  if (!video) return err("Video not found", 404);
  return ok(video);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  await prisma.video.delete({ where: { id: parseInt(id) } }).catch(() => null);
  return ok({ deleted: true });
}
