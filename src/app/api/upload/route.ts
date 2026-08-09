import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/api-helpers";
import { NextResponse } from "next/server";

const ALLOWED_TYPES = new Set([
  "image/jpeg", "image/jpg", "image/png", "image/webp",
  "image/gif", "image/svg+xml",
]);
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

function getUploadDir(): string {
  const raw = process.env.UPLOAD_DIR ?? "./storage/uploads";
  return path.resolve(process.cwd(), raw);
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const formData = await req.formData().catch(() => null);
  if (!formData) return NextResponse.json({ success: false, message: "Invalid form data" }, { status: 400 });

  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ success: false, message: "فقط تصاویر مجاز هستند (JPG, PNG, WebP, GIF, SVG)" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ success: false, message: "حجم فایل نباید بیشتر از ۵ مگابایت باشد" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const uploadDir = getUploadDir();
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);

  return NextResponse.json({
    success: true,
    url: `/api/files/${filename}`,
    publicId: filename,
  });
}
