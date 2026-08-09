"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/admin/FileUpload";
import { Loader2, Save } from "lucide-react";

interface ServiceData {
  id?: number;
  title: string;
  description: string;
  price?: number | null;
  image?: string | null;
  icon?: string | null;
  active: boolean;
  sortOrder: number;
}

const inputClass =
  "w-full bg-[#242424] border border-white/10 rounded-xl py-2.5 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#C6FF34]/50 transition-colors text-sm";

export function ServiceForm({ initialData }: { initialData?: ServiceData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    price: initialData?.price?.toString() ?? "",
    image: initialData?.image ?? "",
    icon: initialData?.icon ?? "",
    active: initialData?.active ?? true,
    sortOrder: initialData?.sortOrder ?? 0,
  });

  function set(field: string, value: string | number | boolean) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");

    const payload = {
      ...form,
      price: form.price ? parseFloat(form.price) : null,
      image: form.image || null,
      icon: form.icon || null,
      sortOrder: Number(form.sortOrder),
    };

    const url = initialData?.id ? `/api/services/${initialData.id}` : "/api/services";
    const method = initialData?.id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setLoading(false);

    if (!data.success) { setError(data.message ?? "خطایی رخ داد"); }
    else { router.push("/admin/services"); router.refresh(); }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm">{error}</div>}

      <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6 space-y-4">
        <h2 className="text-white font-bold">اطلاعات خدمت</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">عنوان *</label>
            <input value={form.title} onChange={e => set("title", e.target.value)} required className={inputClass} placeholder="عنوان خدمت" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">قیمت (تومان)</label>
            <input type="number" value={form.price} onChange={e => set("price", e.target.value)} className={inputClass} placeholder="مثلاً ۵۰۰۰۰۰" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">آیکن (نام از lucide-react)</label>
            <input value={form.icon} onChange={e => set("icon", e.target.value)} className={inputClass} placeholder="Monitor, ShoppingCart, ..." dir="ltr" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">ترتیب نمایش</label>
            <input type="number" value={form.sortOrder} onChange={e => set("sortOrder", e.target.value)} className={inputClass} />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">توضیحات *</label>
          <textarea value={form.description} onChange={e => set("description", e.target.value)} required rows={4} className={inputClass} placeholder="توضیحات کامل خدمت..." />
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.active} onChange={e => set("active", e.target.checked)} className="w-4 h-4 accent-[#C6FF34]" />
          <span className="text-gray-300 text-sm">فعال (نمایش در سایت)</span>
        </label>
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6">
        <h2 className="text-white font-bold mb-4">تصویر شاخص</h2>
        <FileUpload value={form.image} onChange={url => set("image", url)} onClear={() => set("image", "")} label="تصویر خدمت" />
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#C6FF34] text-black font-bold px-6 py-2.5 rounded-xl hover:bg-[#b8f025] transition-colors disabled:opacity-50">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {initialData?.id ? "ذخیره تغییرات" : "افزودن خدمت"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-colors text-sm">
          انصراف
        </button>
      </div>
    </form>
  );
}
