import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function err(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) return err("Unauthorized", 401);
  return null;
}

export function paginate(searchParams: URLSearchParams) {
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "20"));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

// SQLite stores JSON fields as plain strings — these helpers handle the conversion
export function jStr(val: unknown): string {
  if (val === undefined || val === null) return "null";
  return JSON.stringify(val);
}

export function jParse<T>(val: string | null | undefined, fallback: T): T {
  if (val === null || val === undefined) return fallback;
  try { return JSON.parse(val) as T; } catch { return fallback; }
}
