"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Loader2, Save } from "lucide-react";

interface VideoData {
  id?: number;
  slug: string;
  title: string;
  description?: string | null;
  cloudinaryId: string;
  thumbnailUrl?: string | null;
  category?: string | null;
  published: boolean;
  sortOrder: number;
}

export function VideoForm({ initialData }: { initialData?: VideoData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnailUrl ?? "");

  const [form, setForm] = useState({
    slug: initialData?.slug ?? "",
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    cloudinaryId: initialData?.cloudinaryId ?? "",
    category: initialData?.category ?? "",
    published: initialData?.published ?? true,
    sortOrder: initialData?.sortOrder ?? 0,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked :
        type === "number" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = { ...form, thumbnailUrl: thumbnail };
    const url = initialData?.id ? `/api/videos/${initialData.id}` : "/api/videos";
    const method = initialData?.id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setLoading(false);

    if (!data.success) setError(data.message ?? "خطایی رخ داد");
    else { router.push("/admin/videos"); router.refresh(); }
  }

  const inputClass = "w-full bg-[#242424] border border-white/10 rounded-xl py-2.5 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#C6FF34]/50 transition-colors text-sm";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm">{error}</div>}

      <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6 space-y-4">
        <h2 className="text-white font-bold">اطلاعات ویدیو</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">عنوان *</label>
            <input name="title" value={form.title} onChange={handleChange} required className={inputClass} placeholder="عنوان ویدیو" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">اسلاگ *</label>
            <input name="slug" value={form.slug} onChange={handleChange} required className={inputClass} placeholder="video-slug" dir="ltr" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Cloudinary ID *</label>
            <input name="cloudinaryId" value={form.cloudinaryId} onChange={handleChange} required className={inputClass} placeholder="hafezpardaz/video123" dir="ltr" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">دسته‌بندی</label>
            <input name="category" value={form.category} onChange={handleChange} className={inputClass} placeholder="آموزشی" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">ترتیب نمایش</label>
            <input name="sortOrder" type="number" value={form.sortOrder} onChange={handleChange} className={inputClass} dir="ltr" />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">توضیحات</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={inputClass} placeholder="توضیحات ویدیو..." />
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" name="published" checked={form.published} onChange={handleChange} className="w-4 h-4 accent-[#C6FF34]" />
          <span className="text-gray-300 text-sm">منتشر شود</span>
        </label>
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6">
        <h2 className="text-white font-bold mb-4">تصویر بند انگشتی</h2>
        <ImageUpload value={thumbnail} onChange={setThumbnail} onClear={() => setThumbnail("")} />
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#C6FF34] text-black font-bold px-6 py-2.5 rounded-xl hover:bg-[#b8f025] transition-colors disabled:opacity-50">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {initialData?.id ? "ذخیره تغییرات" : "ایجاد ویدیو"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:text-white transition-colors text-sm">انصراف</button>
      </div>
    </form>
  );
}
