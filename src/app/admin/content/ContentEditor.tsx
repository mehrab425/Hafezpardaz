"use client";

import { useState } from "react";
import { Loader2, Save, CheckCircle } from "lucide-react";

interface ContentItem {
  id: number;
  key: string;
  value: string;
  type: string;
  label: string;
}

export function ContentEditor({ initialItems }: { initialItems: ContentItem[] }) {
  const [items, setItems] = useState<ContentItem[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleChange(key: string, value: string) {
    setItems((prev) => prev.map((item) => (item.key === key ? { ...item, value } : item)));
  }

  async function handleSave() {
    setLoading(true);
    setSaved(false);

    await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items.map(({ key, value, type, label }) => ({ key, value, type, label }))),
    });

    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const inputClass =
    "w-full bg-[#242424] border border-white/10 rounded-xl py-2.5 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#C6FF34]/50 transition-colors text-sm";

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray-400 text-sm">{items.length} مورد قابل ویرایش</p>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 bg-[#C6FF34] text-black font-bold px-5 py-2 rounded-xl hover:bg-[#b8f025] transition-colors disabled:opacity-50 text-sm"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "ذخیره شد!" : "ذخیره همه"}
        </button>
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-xl divide-y divide-white/5">
        {items.map((item) => (
          <div key={item.key} className="p-5">
            <label className="block text-sm text-white font-medium mb-1">{item.label}</label>
            <p className="text-gray-500 text-xs mb-2" dir="ltr">{item.key}</p>
            {item.value.length > 100 || item.type === "HTML" ? (
              <textarea
                value={item.value}
                onChange={(e) => handleChange(item.key, e.target.value)}
                rows={4}
                className={inputClass}
              />
            ) : (
              <input
                type="text"
                value={item.value}
                onChange={(e) => handleChange(item.key, e.target.value)}
                className={inputClass}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
