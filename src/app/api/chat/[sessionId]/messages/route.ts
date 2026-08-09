import { prisma } from "@/lib/prisma";
import { ok, err } from "@/lib/api-helpers";
import { auth } from "@/lib/auth";
import { chatMessageSchema } from "@/lib/validations";

export async function GET(_: Request, { params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;

  let chat = await prisma.supportChat.findUnique({
    where: { sessionId },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });

  if (!chat) {
    chat = await prisma.supportChat.create({
      data: { sessionId },
      include: { messages: true },
    });
  }

  return ok(chat.messages);
}

export async function POST(req: Request, { params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  const body = await req.json().catch(() => null);
  if (!body) return err("Invalid JSON");

  const parsed = chatMessageSchema.safeParse({ ...body, sessionId });
  if (!parsed.success) return err(parsed.error.issues[0].message);

  // Admin role requires authentication
  if (parsed.data.role === "ADMIN") {
    const session = await auth();
    if (!session?.user) return err("Unauthorized", 401);
  }

  let chat = await prisma.supportChat.findUnique({ where: { sessionId } });

  if (!chat) {
    chat = await prisma.supportChat.create({
      data: {
        sessionId,
        visitorName: parsed.data.visitorName,
        visitorEmail: parsed.data.visitorEmail,
      },
    });
  } else if (parsed.data.visitorName && !chat.visitorName) {
    await prisma.supportChat.update({
      where: { id: chat.id },
      data: { visitorName: parsed.data.visitorName, visitorEmail: parsed.data.visitorEmail },
    });
  }

  const message = await prisma.chatMessage.create({
    data: { chatId: chat.id, content: parsed.data.content, role: parsed.data.role },
  });

  await prisma.supportChat.update({
    where: { id: chat.id },
    data: { lastMessage: parsed.data.content, updatedAt: new Date() },
  });

  return ok(message, 201);
}
