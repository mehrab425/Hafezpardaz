"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/admin/FileUpload";
import { Loader2, Save } from "lucide-react";

interface GalleryData {
  id?: number;
  title: string;
  description?: string | null;
  filePath: string;
  alt?: string | null;
  sortOrder: number;
}

const inputClass =
  "w-full bg-[#242424] border border-white/10 rounded-xl py-2.5 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#C6FF34]/50 transition-colors text-sm";

export function GalleryForm({ initialData }: { initialData?: GalleryData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    filePath: initialData?.filePath ?? "",
    alt: initialData?.alt ?? "",
    sortOrder: initialData?.sortOrder ?? 0,
  });

  function set(field: string, value: string | number) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.filePath) { setError("لطفاً یک تصویر آپلود کنید"); return; }
    setLoading(true); setError("");

    const url = initialData?.id ? `/api/gallery/${initialData.id}` : "/api/gallery";
    const method = initialData?.id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, sortOrder: Number(form.sortOrder) }),
    });
    const data = await res.json();
    setLoading(false);

    if (!data.success) { setError(data.message ?? "خطایی رخ داد"); }
    else { router.push("/admin/gallery"); router.refresh(); }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm">{error}</div>}

      <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6 space-y-4">
        <h2 className="text-white font-bold">اطلاعات تصویر</h2>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">عنوان *</label>
          <input value={form.title} onChange={e => set("title", e.target.value)} required className={inputClass} placeholder="عنوان تصویر" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">متن جایگزین (alt)</label>
          <input value={form.alt} onChange={e => set("alt", e.target.value)} className={inputClass} placeholder="توضیح مختصر برای screen reader" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">توضیحات</label>
          <textarea value={form.description} onChange={e => set("description", e.target.value)} rows={3} className={inputClass} placeholder="توضیحات اختیاری..." />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">ترتیب نمایش</label>
          <input type="number" value={form.sortOrder} onChange={e => set("sortOrder", e.target.value)} className={inputClass} />
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6">
        <h2 className="text-white font-bold mb-4">فایل تصویر *</h2>
        <FileUpload
          value={form.filePath}
          onChange={url => set("filePath", url)}
          onClear={() => set("filePath", "")}
          label="تصویر گالری"
        />
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#C6FF34] text-black font-bold px-6 py-2.5 rounded-xl hover:bg-[#b8f025] transition-colors disabled:opacity-50">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {initialData?.id ? "ذخیره تغییرات" : "افزودن تصویر"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-colors text-sm">
          انصراف
        </button>
      </div>
    </form>
  );
}
