import { prisma } from "@/lib/prisma";
import { ok, err, requireAdmin, jParse } from "@/lib/api-helpers";
import { orderStatusSchema } from "@/lib/validations";

function serializeOrder<T extends { projectType: string | null; features: string | null }>(o: T) {
  return {
    ...o,
    projectType: jParse(o.projectType, null),
    features: jParse(o.features, null),
  };
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id: parseInt(id) },
    include: { items: { include: { product: true } } },
  });
  if (!order) return err("Order not found", 404);
  return ok(serializeOrder(order));
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body) return err("Invalid JSON");

  const parsed = orderStatusSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message);

  const order = await prisma.order
    .update({ where: { id: parseInt(id) }, data: { status: parsed.data.status } })
    .catch(() => null);

  if (!order) return err("Order not found", 404);
  return ok(serializeOrder(order));
}
