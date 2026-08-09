"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Loader2, Save } from "lucide-react";
import { Decimal } from "@prisma/client/runtime/library";

interface ProductData {
  id?: number;
  slug: string;
  title: string;
  description: string;
  price: Decimal | number;
  salePrice?: Decimal | number | null;
  category: string;
  image?: string | null;
  inStock: boolean;
  featured: boolean;
  published: boolean;
}

export function ProductForm({ initialData }: { initialData?: ProductData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(initialData?.image ?? "");

  const [form, setForm] = useState({
    slug: initialData?.slug ?? "",
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    price: initialData?.price ? Number(initialData.price) : 0,
    salePrice: initialData?.salePrice ? Number(initialData.salePrice) : "",
    category: initialData?.category ?? "",
    inStock: initialData?.inStock ?? true,
    featured: initialData?.featured ?? false,
    published: initialData?.published ?? true,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = { ...form, image, salePrice: form.salePrice || null };
    const url = initialData?.id ? `/api/products/${initialData.id}` : "/api/products";
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
      router.push("/admin/products");
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
        <h2 className="text-white font-bold mb-2">اطلاعات محصول</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">نام محصول *</label>
            <input name="title" value={form.title} onChange={handleChange} required className={inputClass} placeholder="نام محصول" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">اسلاگ *</label>
            <input name="slug" value={form.slug} onChange={handleChange} required className={inputClass} placeholder="product-slug" dir="ltr" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">دسته‌بندی *</label>
            <input name="category" value={form.category} onChange={handleChange} required className={inputClass} placeholder="دسته‌بندی" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">قیمت (تومان) *</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} required min={0} className={inputClass} placeholder="500000" dir="ltr" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">قیمت با تخفیف (اختیاری)</label>
            <input name="salePrice" type="number" value={form.salePrice} onChange={handleChange} min={0} className={inputClass} placeholder="450000" dir="ltr" />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">توضیحات *</label>
          <textarea name="description" value={form.description} onChange={handleChange} required rows={4} className={inputClass} placeholder="توضیحات محصول..." />
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6">
        <h2 className="text-white font-bold mb-4">تصویر محصول</h2>
        <ImageUpload value={image} onChange={setImage} onClear={() => setImage("")} />
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6">
        <h2 className="text-white font-bold mb-4">تنظیمات</h2>
        <div className="flex flex-col gap-3">
          {[
            { name: "published", label: "نمایش در سایت" },
            { name: "inStock", label: "موجود در انبار" },
            { name: "featured", label: "محصول ویژه" },
          ].map((t) => (
            <label key={t.name} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name={t.name}
                checked={form[t.name as "published" | "inStock" | "featured"]}
                onChange={handleChange}
                className="w-4 h-4 accent-[#C6FF34]"
              />
              <span className="text-gray-300 text-sm">{t.label}</span>
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
          {initialData?.id ? "ذخیره تغییرات" : "ایجاد محصول"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-colors text-sm">
          انصراف
        </button>
      </div>
    </form>
  );
}
