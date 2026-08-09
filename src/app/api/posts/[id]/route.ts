import { prisma } from "@/lib/prisma";
import { ok, err, requireAdmin, jStr, jParse } from "@/lib/api-helpers";
import { postSchema } from "@/lib/validations";

function serializePost<T extends { tags: string }>(p: T) {
  return { ...p, tags: jParse(p.tags, []) };
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
  if (!post) return err("Post not found", 404);
  return ok(serializePost(post));
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body) return err("Invalid JSON");

  const parsed = postSchema.partial().safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message);

  const { tags, ...rest } = parsed.data;
  const data = { ...rest, ...(tags !== undefined ? { tags: jStr(tags) } : {}) };

  const post = await prisma.post
    .update({ where: { id: parseInt(id) }, data })
    .catch(() => null);

  if (!post) return err("Post not found", 404);
  return ok(serializePost(post));
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  await prisma.post.delete({ where: { id: parseInt(id) } }).catch(() => null);
  return ok({ deleted: true });
}
