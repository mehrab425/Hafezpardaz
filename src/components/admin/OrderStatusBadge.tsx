const statusMap: Record<string, { label: string; className: string }> = {
  PENDING:     { label: "در انتظار",    className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  CONFIRMED:   { label: "تأیید شده",    className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  IN_PROGRESS: { label: "در حال انجام", className: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  COMPLETED:   { label: "تکمیل شده",   className: "bg-green-500/10 text-green-400 border-green-500/20" },
  CANCELLED:   { label: "لغو شده",     className: "bg-red-500/10 text-red-400 border-red-500/20" },
};

export function OrderStatusBadge({ status }: { status: string }) {
  const s = statusMap[status] ?? { label: status, className: "bg-gray-500/10 text-gray-400 border-gray-500/20" };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border font-medium ${s.className}`}>
      {s.label}
    </span>
  );
}
