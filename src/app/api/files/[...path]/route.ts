import { readFile, stat } from "fs/promises";
import path from "path";

const MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
  pdf: "application/pdf",
};

function getUploadDir(): string {
  const raw = process.env.UPLOAD_DIR ?? "./storage/uploads";
  return path.resolve(process.cwd(), raw);
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;
  const filename = segments.join("/");

  // Prevent path traversal
  const uploadDir = getUploadDir();
  const resolved = path.resolve(uploadDir, filename);
  if (!resolved.startsWith(uploadDir)) {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    await stat(resolved);
    const file = await readFile(resolved);
    const ext = filename.split(".").pop()?.toLowerCase() ?? "";
    const contentType = MIME[ext] ?? "application/octet-stream";
    return new Response(file, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
}
