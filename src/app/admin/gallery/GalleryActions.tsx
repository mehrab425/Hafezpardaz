"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

export function GalleryActions({ id }: { id: number }) {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    setLoading(false);
    router.push("/admin/gallery");
    router.refresh();
  }

  if (confirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-red-400 text-sm">مطمئنی؟</span>
        <button onClick={handleDelete} disabled={loading} className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors disabled:opacity-50">
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />} حذف
        </button>
        <button onClick={() => setConfirm(false)} className="px-3 py-1.5 border border-white/10 text-gray-400 rounded-lg text-sm hover:text-white transition-colors">انصراف</button>
      </div>
    );
  }

  return (
    <button onClick={() => setConfirm(true)} className="flex items-center gap-1 px-3 py-1.5 border border-red-500/30 text-red-400 rounded-lg text-sm hover:bg-red-500/10 transition-colors">
      <Trash2 className="w-3 h-3" /> حذف
    </button>
  );
}
