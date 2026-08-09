"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/admin/FileUpload";
import { Loader2, Save, X } from "lucide-react";

interface PortfolioData {
  id?: number;
  title: string;
  description?: string | null;
  image?: string | null;
  url?: string | null;
  category?: string | null;
  tags: string[];
  featured: boolean;
  published: boolean;
  sortOrder: number;
}

const inputClass =
  "w-full bg-[#242424] border border-white/10 rounded-xl py-2.5 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#C6FF34]/50 transition-colors text-sm";

export function PortfolioForm({ initialData }: { initialData?: PortfolioData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    image: initialData?.image ?? "",
    url: initialData?.url ?? "",
    category: initialData?.category ?? "",
    tags: initialData?.tags ?? [],
    featured: initialData?.featured ?? false,
    published: initialData?.published ?? true,
    sortOrder: initialData?.sortOrder ?? 0,
  });

  function set(field: string, value: string | number | boolean | string[]) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  function addTag() {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      set("tags", [...form.tags, tag]);
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    set("tags", form.tags.filter((t) => t !== tag));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");

    const payload = {
      ...form,
      image: form.image || null,
      url: form.url || null,
      category: form.category || null,
      description: form.description || null,
      sortOrder: Number(form.sortOrder),
    };

    const url = initialData?.id ? `/api/portfolio-items/${initialData.id}` : "/api/portfolio-items";
    const method = initialData?.id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setLoading(false);

    if (!data.success) { setError(data.message ?? "خطایی رخ داد"); }
    else { router.push("/admin/portfolio"); router.refresh(); }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm">{error}</div>}

      <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6 space-y-4">
        <h2 className="text-white font-bold">اطلاعات پروژه</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">عنوان *</label>
            <input value={form.title} onChange={e => set("title", e.target.value)} required className={inputClass} placeholder="عنوان پروژه" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">دسته‌بندی</label>
            <input value={form.category} onChange={e => set("category", e.target.value)} className={inputClass} placeholder="وب، موبایل، طراحی..." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-1.5">لینک پروژه</label>
            <input value={form.url} onChange={e => set("url", e.target.value)} className={inputClass} placeholder="https://..." dir="ltr" />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">توضیحات</label>
          <textarea value={form.description} onChange={e => set("description", e.target.value)} rows={4} className={inputClass} placeholder="توضیح کوتاهی از پروژه..." />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5">تگ‌ها</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {form.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-[#C6FF34]/10 text-[#C6FF34] rounded-full text-xs">
                {tag}
                <button type="button" onClick={() => removeTag(tag)}><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())} className={inputClass} placeholder="تگ جدید... (Enter)" />
            <button type="button" onClick={addTag} className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white text-sm whitespace-nowrap">افزودن</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">ترتیب نمایش</label>
            <input type="number" value={form.sortOrder} onChange={e => set("sortOrder", e.target.value)} className={inputClass} />
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={e => set("published", e.target.checked)} className="w-4 h-4 accent-[#C6FF34]" />
            <span className="text-gray-300 text-sm">منتشر شده</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={e => set("featured", e.target.checked)} className="w-4 h-4 accent-[#C6FF34]" />
            <span className="text-gray-300 text-sm">ویژه (نمایش در صفحه اصلی)</span>
          </label>
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6">
        <h2 className="text-white font-bold mb-4">تصویر پروژه</h2>
        <FileUpload value={form.image} onChange={url => set("image", url)} onClear={() => set("image", "")} label="تصویر پروژه" />
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#C6FF34] text-black font-bold px-6 py-2.5 rounded-xl hover:bg-[#b8f025] transition-colors disabled:opacity-50">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {initialData?.id ? "ذخیره تغییرات" : "افزودن پروژه"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-colors text-sm">
          انصراف
        </button>
      </div>
    </form>
  );
}
