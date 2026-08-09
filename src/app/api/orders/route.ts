import { prisma } from "@/lib/prisma";
import { ok, err, requireAdmin, paginate, jStr, jParse } from "@/lib/api-helpers";
import { orderSchema } from "@/lib/validations";

function serializeOrder<T extends { projectType: string | null; features: string | null }>(o: T) {
  return {
    ...o,
    projectType: jParse(o.projectType, null),
    features: jParse(o.features, null),
  };
}

export async function GET(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { searchParams } = new URL(req.url);
  const { skip, limit } = paginate(searchParams);
  const status = searchParams.get("status") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  const where = {
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            { customerName: { contains: search } },
            { email: { contains: search } },
            { phone: { contains: search } },
          ],
        }
      : {}),
  };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { items: { include: { product: { select: { title: true } } } } },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.order.count({ where }),
  ]);

  return ok({ orders: orders.map(serializeOrder), total });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return err("Invalid JSON");

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message);

  const { items, projectType, features, ...orderData } = parsed.data;

  const order = await prisma.order.create({
    data: {
      ...orderData,
      projectType: projectType !== undefined ? jStr(projectType) : undefined,
      features: features !== undefined ? jStr(features) : undefined,
      items:
        items && items.length > 0
          ? {
              create: items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
              })),
            }
          : undefined,
    },
    include: { items: true },
  });

  return ok(serializeOrder(order), 201);
}
