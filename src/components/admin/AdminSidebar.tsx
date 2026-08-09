"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, FileText, ShoppingBag, ShoppingCart,
  Video, Settings, MessageCircle, BarChart2, LogOut, ChevronRight,
  Image, Briefcase, Layers, SlidersHorizontal,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "داشبورد", icon: LayoutDashboard },
  { href: "/admin/orders", label: "سفارش‌ها", icon: ShoppingCart },
  { href: "/admin/products", label: "محصولات", icon: ShoppingBag },
  { href: "/admin/posts", label: "مقالات", icon: FileText },
  { href: "/admin/videos", label: "ویدیوها", icon: Video },
  { href: "/admin/gallery", label: "گالری", icon: Image },
  { href: "/admin/services", label: "خدمات", icon: Briefcase },
  { href: "/admin/portfolio", label: "نمونه‌کارها", icon: Layers },
  { href: "/admin/content", label: "محتوای سایت", icon: Settings },
  { href: "/admin/settings", label: "تنظیمات", icon: SlidersHorizontal },
  { href: "/admin/chat", label: "پشتیبانی", icon: MessageCircle },
  { href: "/admin/analytics", label: "آمار", icon: BarChart2 },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#151515] border-l border-white/5 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#C6FF34] rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-sm">ح</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm">حافظ پرداز سپهر</p>
            <p className="text-gray-500 text-xs">پنل مدیریت</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group ${
                isActive
                  ? "bg-[#C6FF34]/10 text-[#C6FF34]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight className="w-3 h-3" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all mb-1"
        >
          <ChevronRight className="w-4 h-4" />
          <span>مشاهده سایت</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>خروج</span>
        </button>
      </div>
    </aside>
  );
}
