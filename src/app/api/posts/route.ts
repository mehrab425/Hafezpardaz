import { prisma } from "@/lib/prisma";
import { ok, err, requireAdmin, paginate, jStr, jParse } from "@/lib/api-helpers";
import { postSchema } from "@/lib/validations";

function serializePost<T extends { tags: string }>(p: T) {
  return { ...p, tags: jParse(p.tags, []) };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const { skip, limit } = paginate(searchParams);
  const published = searchParams.get("all") ? undefined : true;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: published !== undefined ? { published } : undefined,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.post.count({ where: published !== undefined ? { published } : undefined }),
  ]);

  return ok({ posts: posts.map(serializePost), total });
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const body = await req.json().catch(() => null);
  if (!body) return err("Invalid JSON");

  const parsed = postSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0].message);

  const { tags, ...rest } = parsed.data;
  const post = await prisma.post.create({ data: { ...rest, tags: jStr(tags) } });
  return ok(serializePost(post), 201);
}
