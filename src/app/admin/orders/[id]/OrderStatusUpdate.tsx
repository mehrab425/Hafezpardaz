"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle } from "lucide-react";

const statuses = [
  { value: "PENDING",     label: "در انتظار" },
  { value: "CONFIRMED",   label: "تأیید شده" },
  { value: "IN_PROGRESS", label: "در حال انجام" },
  { value: "COMPLETED",   label: "تکمیل شده" },
  { value: "CANCELLED",   label: "لغو شده" },
];

export function OrderStatusUpdate({ orderId, currentStatus }: { orderId: number; currentStatus: string }) {
  const router = useRouter();
  const [selected, setSelected] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleUpdate() {
    if (selected === currentStatus) return;
    setLoading(true);
    setSuccess(false);

    await fetch(`/api/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: selected }),
    });

    setLoading(false);
    setSuccess(true);
    router.refresh();
    setTimeout(() => setSuccess(false), 2000);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((s) => (
        <button
          key={s.value}
          onClick={() => setSelected(s.value)}
          className={`px-4 py-2 rounded-lg text-sm border transition-all ${
            selected === s.value
              ? "bg-[#C6FF34] text-black border-[#C6FF34] font-bold"
              : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30"
          }`}
        >
          {s.label}
        </button>
      ))}
      <button
        onClick={handleUpdate}
        disabled={loading || selected === currentStatus}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C6FF34] text-black font-bold text-sm hover:bg-[#b8f025] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : success ? <CheckCircle className="w-4 h-4" /> : null}
        ذخیره
      </button>
    </div>
  );
}
