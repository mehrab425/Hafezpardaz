import { prisma } from "@/lib/prisma";
import { ok, err, requireAdmin, paginate, jStr, jParse } from "@/lib/api-helpers";
import { productSchema } from "@/lib/validations";

function serializeProduct<T extends { images: string }>(p: T) {
  return { ...p, images: jParse(p.images, []) };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const { skip, limit } = paginate(searchParams);
  const category = searchParams.get("category") ?? undefined;
  const all = searchParams.get("all");

  const where = {
    ...(all ? {} : { published: true }),
    ...(category ? { category } : {}),
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return ok({ products: products.map(serializeProduct), total });
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const body = await req.json().catch(() => null);
  if (!body) return err("Invalid JSON");

  const parsed = productSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message);

  const { images, ...rest } = parsed.data;
  const product = await prisma.product.create({ data: { ...rest, images: jStr(images) } });
  return ok(serializeProduct(product), 201);
}
