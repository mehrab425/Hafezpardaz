"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

export function VideoActions({ id }: { id: number }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await fetch(`/api/videos/${id}`, { method: "DELETE" });
    setLoading(false);
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-gray-400 hover:text-red-400 transition-colors">
        <Trash2 className="w-4 h-4" />
      </button>
      <ConfirmDialog open={open} title="حذف ویدیو" message="آیا مطمئن هستید؟" loading={loading} onConfirm={handleDelete} onCancel={() => setOpen(false)} />
    </>
  );
}
