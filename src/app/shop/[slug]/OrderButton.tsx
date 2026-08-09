"use client";

import { useState } from "react";
import { ShoppingCart, Loader2, CheckCircle, X } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
}

export function OrderButton({ product, disabled }: { product: Product; disabled?: boolean }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ customerName: "", email: "", phone: "", notes: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        totalAmount: product.price,
        items: [{ productId: product.id, quantity: 1, price: product.price }],
      }),
    });

    setLoading(false);
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setOpen(false); setForm({ customerName: "", email: "", phone: "", notes: "" }); }, 3000);
  }

  const inputClass = "w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-2.5 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#C6FF34]/50 transition-colors text-sm";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={disabled}
        className="flex items-center justify-center gap-2 bg-[#C6FF34] text-black font-bold py-3 px-8 rounded-xl hover:bg-[#b8f025] transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
      >
        <ShoppingCart className="w-5 h-5" />
        ثبت سفارش
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <div className="relative bg-[#1e1e1e] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <button onClick={() => setOpen(false)} className="absolute top-4 left-4 text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            {success ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h3 className="text-white font-bold text-lg mb-2">سفارش ثبت شد!</h3>
                <p className="text-gray-400 text-sm">به زودی با شما تماس خواهیم گرفت.</p>
              </div>
            ) : (
              <>
                <h3 className="text-white font-bold text-lg mb-1">ثبت سفارش</h3>
                <p className="text-gray-400 text-sm mb-5">{product.title}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">نام و نام خانوادگی *</label>
                    <input name="customerName" value={form.customerName} onChange={handleChange} required className={inputClass} placeholder="نام کامل" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">ایمیل *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="example@email.com" dir="ltr" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">شماره تماس *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} required className={inputClass} placeholder="09xxxxxxxxx" dir="ltr" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">توضیحات (اختیاری)</label>
                    <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} className={inputClass} placeholder="نیازهای خاص یا سؤالات..." />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[#C6FF34] font-bold">{product.price.toLocaleString("fa-IR")} تومان</span>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 bg-[#C6FF34] text-black font-bold px-6 py-2.5 rounded-xl hover:bg-[#b8f025] transition-colors disabled:opacity-50"
                    >
                      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                      تأیید سفارش
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
