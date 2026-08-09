import { prisma } from "@/lib/prisma";
import { ok, err, requireAdmin, jStr, jParse } from "@/lib/api-helpers";
import { productSchema } from "@/lib/validations";

function serializeProduct<T extends { images: string }>(p: T) {
  return { ...p, images: jParse(p.images, []) };
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: isNaN(Number(id)) ? { slug: id } : { id: parseInt(id) },
  });
  if (!product) return err("Product not found", 404);
  return ok(serializeProduct(product));
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body) return err("Invalid JSON");

  const parsed = productSchema.partial().safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message);

  const { images, ...rest } = parsed.data;
  const data = { ...rest, ...(images !== undefined ? { images: jStr(images) } : {}) };

  const product = await prisma.product
    .update({ where: { id: parseInt(id) }, data })
    .catch(() => null);

  if (!product) return err("Product not found", 404);
  return ok(serializeProduct(product));
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  await prisma.product.delete({ where: { id: parseInt(id) } }).catch(() => null);
  return ok({ deleted: true });
}
