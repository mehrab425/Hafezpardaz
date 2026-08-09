import { prisma } from "@/lib/prisma";
import { analyticsSchema } from "@/lib/validations";
import { jStr } from "@/lib/api-helpers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false }, { status: 400 });

  const parsed = analyticsSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });

  prisma.analytics
    .create({
      data: {
        event: parsed.data.event,
        path: parsed.data.path,
        referrer: parsed.data.referrer,
        sessionId: parsed.data.sessionId,
        meta: parsed.data.meta !== undefined ? jStr(parsed.data.meta) : undefined,
      },
    })
    .catch(() => {});

  return NextResponse.json({ ok: true });
}
