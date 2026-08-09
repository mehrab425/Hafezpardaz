"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Clock, ArrowLeft, Zap, BookOpen } from "lucide-react";
import { blogPosts } from "@/data";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FinalCTA } from "@/components/home/FinalCTA";

const categories = ["همه", "توسعه وب", "سئو", "طراحی", "فروشگاه", "سرور", "برندینگ"];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("همه");

  const filtered = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.includes(search) || post.excerpt.includes(search);
    const matchesCategory =
      activeCategory === "همه" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featured = blogPosts.filter((p) => p.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-hero-gradient pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-tag mb-6 inline-flex"><Zap size={14} />بلاگ</span>
            <h1 className="heading-xl text-white mb-6">
              دانش <span className="accent-gradient-text">رایگان</span> برای رشد دیجیتال شما
            </h1>
            <p className="text-text-secondary text-xl leading-9 max-w-2xl mx-auto mb-8">
              جدیدترین مقالات، راهنماها و ترندهای دنیای دیجیتال
            </p>
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="جستجو در مقالات..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full glass-card px-5 py-4 pl-12 text-white placeholder:text-text-muted outline-none focus:border-accent/40 transition-all duration-300 rounded-2xl text-right"
                dir="rtl"
              />
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featured.length > 0 && !search && activeCategory === "همه" && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeader tag="برگزیده‌ها" title="مقالات" titleHighlight="ویژه" centered={false} />
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              {featured.slice(0, 2).map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="glass-card overflow-hidden group hover:border-white/15 transition-all duration-500 hover:-translate-y-1">
                      {/* Image placeholder */}
                      <div className="h-48 bg-gradient-to-br from-accent/10 to-background relative overflow-hidden">
                        <div className="absolute inset-0 grid-bg opacity-30" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookOpen size={48} className="text-white/10" />
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30">
                            {post.category}
                          </span>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="text-xs font-bold bg-accent text-background px-3 py-1 rounded-full">
                            ویژه
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h2 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-200">
                          {post.title}
                        </h2>
                        <p className="text-text-secondary text-sm leading-6 line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-text-muted text-xs">
                          <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-accent text-background"
                    : "glass-card text-text-secondary hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="glass-card overflow-hidden group hover:border-white/15 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    <div className="h-40 bg-gradient-to-br from-white/5 to-background relative">
                      <div className="absolute inset-0 grid-bg opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen size={36} className="text-white/10" />
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/10 text-text-secondary">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-white font-bold mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-200">
                        {post.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-6 line-clamp-2 mb-4 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-text-muted text-xs border-t border-white/[0.06] pt-4">
                        <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                        <span className="flex items-center gap-1 text-accent font-medium">
                          بخوانید <ArrowLeft size={11} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-text-secondary">
              مقاله‌ای یافت نشد.
            </div>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
