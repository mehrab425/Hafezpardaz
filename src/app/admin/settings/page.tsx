"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";

interface Setting {
  id?: number;
  key: string;
  value: string;
  label: string;
  type: "TEXT" | "JSON" | "HTML" | "IMAGE" | "BOOLEAN";
}

const TYPE_OPTIONS = ["TEXT", "JSON", "HTML", "IMAGE", "BOOLEAN"] as const;

const inputClass =
  "w-full bg-[#242424] border border-white/10 rounded-xl py-2 px-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#C6FF34]/50 transition-colors text-sm";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setSettings(d.data);
      })
      .finally(() => setLoading(false));
  }, []);

  function update(index: number, field: keyof Setting, value: string) {
    setSettings((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  function addRow() {
    setSettings((prev) => [...prev, { key: "", value: "", label: "", type: "TEXT" }]);
  }

  function removeRow(index: number) {
    setSettings((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaving(true); setError(""); setSaved(false);
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings }),
    });
    const data = await res.json();
    setSaving(false);
    if (!data.success) { setError(data.message ?? "خطایی رخ داد"); }
    else { setSaved(true); setTimeout(() => setSaved(false), 2500); }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="تنظیمات سایت" />
        <main className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-40 text-gray-500">
              <Loader2 className="w-5 h-5 animate-spin ml-2" /> در حال بارگذاری...
            </div>
          ) : (
            <div className="max-w-4xl space-y-4">
              {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm">{error}</div>}
              {saved && <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-green-400 text-sm">تنظیمات با موفقیت ذخیره شد.</div>}

              <div className="bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500 text-xs">
                      <th className="text-right py-3 px-4 w-40">کلید (key)</th>
                      <th className="text-right py-3 px-4">برچسب</th>
                      <th className="text-right py-3 px-4">مقدار</th>
                      <th className="text-right py-3 px-4 w-32">نوع</th>
                      <th className="py-3 px-4 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {settings.length === 0 ? (
                      <tr><td colSpan={5} className="text-center py-10 text-gray-600">هنوز تنظیماتی اضافه نشده</td></tr>
                    ) : settings.map((s, i) => (
                      <tr key={i} className="border-b border-white/5">
                        <td className="py-2 px-4">
                          <input value={s.key} onChange={e => update(i, "key", e.target.value)} className={inputClass} placeholder="site_name" dir="ltr" />
                        </td>
                        <td className="py-2 px-4">
                          <input value={s.label} onChange={e => update(i, "label", e.target.value)} className={inputClass} placeholder="نام سایت" />
                        </td>
                        <td className="py-2 px-4">
                          {s.type === "HTML" || s.type === "JSON" ? (
                            <textarea value={s.value} onChange={e => update(i, "value", e.target.value)} rows={2} className={inputClass} dir={s.type === "JSON" ? "ltr" : "rtl"} />
                          ) : (
                            <input value={s.value} onChange={e => update(i, "value", e.target.value)} className={inputClass} dir={s.type === "IMAGE" ? "ltr" : "rtl"} />
                          )}
                        </td>
                        <td className="py-2 px-4">
                          <select value={s.type} onChange={e => update(i, "type", e.target.value)} className={inputClass}>
                            {TYPE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </td>
                        <td className="py-2 px-4">
                          <button onClick={() => removeRow(i)} className="p-1.5 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between">
                <button onClick={addRow} className="flex items-center gap-2 px-4 py-2 border border-white/10 text-gray-300 rounded-xl hover:text-white hover:border-white/30 transition-colors text-sm">
                  <Plus className="w-4 h-4" /> افزودن تنظیم جدید
                </button>
                <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-[#C6FF34] text-black font-bold px-6 py-2.5 rounded-xl hover:bg-[#b8f025] transition-colors disabled:opacity-50">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  ذخیره تنظیمات
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
