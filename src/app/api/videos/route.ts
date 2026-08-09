import { prisma } from "@/lib/prisma";
import { ok, err, requireAdmin, paginate } from "@/lib/api-helpers";
import { videoSchema } from "@/lib/validations";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const { skip, limit } = paginate(searchParams);
  const all = searchParams.get("all");

  const where = all ? {} : { published: true };

  const [videos, total] = await Promise.all([
    prisma.video.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      skip,
      take: limit,
    }),
    prisma.video.count({ where }),
  ]);

  return ok({ videos, total });
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const body = await req.json().catch(() => null);
  if (!body) return err("Invalid JSON");

  const parsed = videoSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message);

  const video = await prisma.video.create({ data: parsed.data });
  return ok(video, 201);
}

