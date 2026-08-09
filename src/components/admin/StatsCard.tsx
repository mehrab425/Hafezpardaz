import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color?: string;
  change?: string;
}

export function StatsCard({ label, value, icon: Icon, color = "#C6FF34", change }: StatsCardProps) {
  return (
    <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5 flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-white text-2xl font-bold mt-0.5">{value.toLocaleString("fa-IR")}</p>
        {change && <p className="text-xs text-gray-500 mt-0.5">{change}</p>}
      </div>
    </div>
  );
}
