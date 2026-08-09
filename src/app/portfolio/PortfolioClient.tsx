"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Zap } from "lucide-react";
import { portfolioProjects } from "@/data";
import { FinalCTA } from "@/components/home/FinalCTA";
import { jParse } from "@/lib/api-helpers";

const staticCategories = ["همه", "شرکتی", "فروشگاهی", "پزشکی", "صنعتی", "آموزشی"];

const categoryColors: Record<string, string> = {
  پزشکی: "#34D399", فروشگاهی: "#818CF8", صنعتی: "#FB923C", آموزشی: "#60A5FA", شرکتی: "#C6FF34",
};
const PRESET_COLORS = ["#C6FF34", "#818CF8", "#34D399", "#FB923C", "#60A5FA", "#F472B6"];

interface DbPortfolio {
  id: number;
  title: string;
  description: string | null;
  image: string | null;
  url: string | null;
  category: string | null;
  tags: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
}

interface Props {
  dbItems: DbPortfolio[];
}

export function PortfolioClient({ dbItems }: Props) {
  const [activeCategory, setActiveCategory] = useState("همه");

  const useDb = dbItems.length > 0;

  const dbCategories = ["همه", ...Array.from(new Set(dbItems.map((p) => p.category).filter(Boolean) as string[]))];
  const categories = useDb ? dbCategories : staticCategories;

  const dbFiltered = activeCategory === "همه" ? dbItems : dbItems.filter((p) => p.category === activeCategory);
  const staticFiltered = activeCategory === "همه" ? portfolioProjects : portfolioProjects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-hero-gradient pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="section-tag mb-6 inline-flex"><Zap size={14} />نمونه‌کارها</span>
            <h1 className="heading-xl text-white mb-6">
              پروژه‌هایی که{" "}<span className="accent-gradient-text">افتخار</span>{" "}داریم
            </h1>
            <p className="text-text-secondary text-xl leading-9 max-w-2xl mx-auto">
              نمونه‌ای از پروژه‌های موفق ما در حوزه طراحی سایت، شبکه و خدمات IT برای مشتریان متنوع.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }} className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <motion.button key={cat} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat ? "bg-accent text-background shadow-glow-sm" : "glass-card text-text-secondary hover:text-white hover:border-white/15"
                }`}>
                {cat}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {useDb ? (
                dbFiltered.map((project, i) => {
                  const tags = jParse<string[]>(project.tags, []);
                  const catColor = categoryColors[project.category ?? ""] || PRESET_COLORS[i % PRESET_COLORS.length];
                  const card = (
                    <motion.div whileHover={{ y: -6 }}
                      className="glass-card overflow-hidden group cursor-pointer hover:border-white/15 transition-all duration-500 hover:shadow-card-hover">
                      <div className="relative h-52 overflow-hidden bg-background-secondary">
                        {project.image ? (
                          <Image src={project.image} alt={project.title} fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                        ) : (
                          <>
                            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${catColor}20 0%, #171717 100%)` }} />
                            <div className="absolute inset-0 grid-bg opacity-40" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-7xl font-black text-white/10 select-none">{project.title.charAt(0)}</span>
                            </div>
                          </>
                        )}
                        {project.category && (
                          <div className="absolute top-4 right-4">
                            <span className="text-xs font-semibold px-3 py-1 rounded-full"
                              style={{ background: `${catColor}20`, color: catColor, border: `1px solid ${catColor}30` }}>
                              {project.category}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="glass-card px-4 py-2 flex items-center gap-2 text-white text-sm font-semibold">
                            <ExternalLink size={14} />مشاهده پروژه
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-white font-bold text-base mb-2 line-clamp-2">{project.title}</h3>
                        {project.description && <p className="text-text-secondary text-sm leading-6 line-clamp-2 mb-4">{project.description}</p>}
                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {tags.slice(0, 4).map((tag) => (
                              <span key={tag} className="text-[10px] text-text-muted bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-md">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                  return (
                    <motion.div key={project.id} initial={{ opacity: 0, y: 30, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                      {project.url
                        ? <a href={project.url} target="_blank" rel="noopener noreferrer">{card}</a>
                        : <div>{card}</div>}
                    </motion.div>
                  );
                })
              ) : (
                staticFiltered.map((project, i) => {
                  const catColor = categoryColors[project.category] || "#C6FF34";
                  return (
                    <motion.div key={project.id} initial={{ opacity: 0, y: 30, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                      <Link href={`/portfolio/${project.slug}`}>
                        <motion.div whileHover={{ y: -6 }}
                          className="glass-card overflow-hidden group cursor-pointer hover:border-white/15 transition-all duration-500 hover:shadow-card-hover">
                          <div className="relative h-52 overflow-hidden bg-background-secondary">
                            {project.image ? (
                              <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                            ) : (
                              <>
                                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${catColor}20 0%, #171717 100%)` }} />
                                <div className="absolute inset-0 grid-bg opacity-40" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-7xl font-black text-white/10 select-none">{project.title.charAt(0)}</span>
                                </div>
                              </>
                            )}
                            <div className="absolute top-4 right-4">
                              <span className="text-xs font-semibold px-3 py-1 rounded-full"
                                style={{ background: `${catColor}20`, color: catColor, border: `1px solid ${catColor}30` }}>
                                {project.category}
                              </span>
                            </div>
                            <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="glass-card px-4 py-2 flex items-center gap-2 text-white text-sm font-semibold">
                                <ExternalLink size={14} />مشاهده پروژه
                              </div>
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="text-white font-bold text-base mb-2 line-clamp-2">{project.title}</h3>
                            <p className="text-text-secondary text-sm leading-6 line-clamp-2 mb-4">{project.description}</p>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                              {project.results.slice(0, 2).map((r, ri) => (
                                <div key={ri} className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06]">
                                  <div className="font-black text-sm" style={{ color: catColor }}>{r.value}</div>
                                  <div className="text-text-muted text-[10px] truncate">{r.metric}</div>
                                </div>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {project.technologies.slice(0, 3).map((tech) => (
                                <span key={tech} className="text-[10px] text-text-muted bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-md">{tech}</span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>

          {((useDb && dbFiltered.length === 0) || (!useDb && staticFiltered.length === 0)) && (
            <div className="text-center py-24 text-text-secondary">پروژه‌ای در این دسته‌بندی یافت نشد.</div>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
