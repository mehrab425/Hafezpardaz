"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Loader2, Save } from "lucide-react";

interface PostData {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image?: string | null;
  tags: string[] | unknown;
  featured: boolean;
  published: boolean;
  readTime?: string | null;
}

export function PostForm({ initialData }: { initialData?: PostData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    slug: initialData?.slug ?? "",
    title: initialData?.title ?? "",
    excerpt: initialData?.excerpt ?? "",
    content: initialData?.content ?? "",
    category: initialData?.category ?? "",
    author: initialData?.author ?? "",
    image: initialData?.image ?? "",
    tags: Array.isArray(initialData?.tags) ? (initialData.tags as string[]).join(", ") : "",
    featured: initialData?.featured ?? false,
    published: initialData?.published ?? false,
    readTime: initialData?.readTime ?? "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    const url = initialData?.id ? `/api/posts/${initialData.id}` : "/api/posts";
    const method = initialData?.id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);

    if (!data.success) {
      setError(data.message ?? "خطایی رخ داد");
    } else {
      router.push("/admin/posts");
      router.refresh();
    }
  }

  const inputClass =
    "w-full bg-[#242424] border border-white/10 rounded-xl py-2.5 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#C6FF34]/50 transition-colors text-sm";

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6 space-y-4">
        <h2 className="text-white font-bold mb-4">اطلاعات اصلی</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">عنوان *</label>
            <input name="title" value={form.title} onChange={handleChange} required className={inputClass} placeholder="عنوان مقاله" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">اسلاگ *</label>
            <input name="slug" value={form.slug} onChange={handleChange} required className={inputClass} placeholder="my-post-slug" dir="ltr" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">دسته‌بندی *</label>
            <input name="category" value={form.category} onChange={handleChange} required className={inputClass} placeholder="طراحی وب" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">نویسنده *</label>
            <input name="author" value={form.author} onChange={handleChange} required className={inputClass} placeholder="نام نویسنده" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">زمان مطالعه</label>
            <input name="readTime" value={form.readTime} onChange={handleChange} className={inputClass} placeholder="۵ دقیقه" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">برچسب‌ها (با کاما جدا کنید)</label>
            <input name="tags" value={form.tags} onChange={handleChange} className={inputClass} placeholder="سئو, طراحی, وب" />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">خلاصه *</label>
          <textarea name="excerpt" value={form.excerpt} onChange={handleChange} required rows={2} className={inputClass} placeholder="خلاصه مقاله..." />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">محتوا *</label>
          <textarea name="content" value={form.content} onChange={handleChange} required rows={10} className={inputClass} placeholder="محتوای کامل مقاله..." />
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6 space-y-4">
        <h2 className="text-white font-bold mb-4">تصویر شاخص</h2>
        <ImageUpload
          value={form.image}
          onChange={(url) => setForm((p) => ({ ...p, image: url }))}
          onClear={() => setForm((p) => ({ ...p, image: "" }))}
        />
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6">
        <h2 className="text-white font-bold mb-4">تنظیمات انتشار</h2>
        <div className="flex flex-col gap-3">
          {[
            { name: "published", label: "منتشر شود" },
            { name: "featured", label: "مقاله ویژه" },
          ].map((toggle) => (
            <label key={toggle.name} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name={toggle.name}
                checked={form[toggle.name as "published" | "featured"]}
                onChange={handleChange}
                className="w-4 h-4 accent-[#C6FF34]"
              />
              <span className="text-gray-300 text-sm">{toggle.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-[#C6FF34] text-black font-bold px-6 py-2.5 rounded-xl hover:bg-[#b8f025] transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {initialData?.id ? "ذخیره تغییرات" : "ایجاد مقاله"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-colors text-sm"
        >
          انصراف
        </button>
      </div>
    </form>
  );
}
