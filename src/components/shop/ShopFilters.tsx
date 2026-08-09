"use client";

import Link from "next/link";

export function ShopFilters({ categories, activeCategory }: { categories: string[]; activeCategory?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/shop"
        className={`px-4 py-2 rounded-xl text-sm transition-all ${!activeCategory ? "bg-[#C6FF34] text-black font-bold" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"}`}
      >
        همه
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/shop?category=${encodeURIComponent(cat)}`}
          className={`px-4 py-2 rounded-xl text-sm transition-all ${activeCategory === cat ? "bg-[#C6FF34] text-black font-bold" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"}`}
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}
