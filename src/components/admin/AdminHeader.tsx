"use client";

import { useSession } from "next-auth/react";
import { Bell, User } from "lucide-react";

interface AdminHeaderProps {
  title: string;
}

export function AdminHeader({ title }: AdminHeaderProps) {
  const { data: session } = useSession();

  return (
    <header className="bg-[#151515] border-b border-white/5 px-6 py-4 flex items-center justify-between">
      <h1 className="text-lg font-bold text-white">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1.5">
          <div className="w-7 h-7 bg-[#C6FF34]/20 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-[#C6FF34]" />
          </div>
          <span className="text-sm text-gray-300">{session?.user?.name ?? "مدیر"}</span>
        </div>
      </div>
    </header>
  );
}
