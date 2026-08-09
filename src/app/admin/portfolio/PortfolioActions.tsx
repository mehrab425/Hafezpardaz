"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

export function PortfolioActions({ id }: { id: number }) {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await fetch(`/api/portfolio-items/${id}`, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  }

  if (confirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-red-400 text-xs">مطمئنی؟</span>
        <button onClick={handleDelete} disabled={loading} className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 disabled:opacity-50">
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />} حذف
        </button>
        <button onClick={() => setConfirm(false)} className="px-2 py-1 border border-white/10 text-gray-400 rounded-lg text-xs hover:text-white">انصراف</button>
      </div>
    );
  }

  return (
    <button onClick={() => setConfirm(true)} className="p-1.5 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}
