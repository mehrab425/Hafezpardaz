"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { portfolioProjects } from "@/data";
import { jParse } from "@/lib/api-helpers";

const staticFeatured = portfolioProjects.filter((p) => p.featured).slice(0, 4);

const categoryColors: Record<string, string> = {
  پزشکی: "#34D399",
  فروشگاهی: "#818CF8",
  صنعتی: "#FB923C",
  آموزشی: "#60A5FA",
  شرکتی: "#C6FF34",
};
const PRESET_COLORS = ["#C6FF34", "#818CF8", "#34D399", "#FB923C"];

interface DbPortfolio {
  id: number;
  title: string;
  description: string | null;
  image: string | null;
  url: string | null;
  category: string | null;
  tags: string;
  featured: boolean;
}

interface Props {
  dbPortfolio?: DbPortfolio[];
}

export function PortfolioPreview({ dbPortfolio }: Props) {
  const useDb = dbPortfolio && dbPortfolio.length > 0;

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <SectionHeader
            tag="نمونه‌کارها" title="پروژه‌هایی که" titleHighlight="ماندگار شدند"
            description="هر پروژه یک داستان موفقیت؛ از ایده تا نتیجه واقعی" centered={false}
          />
          <Link href="/portfolio" className="hidden md:block">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center gap-2 whitespace-nowrap">
              همه پروژه‌ها<ArrowLeft size={16} />
            </motion.div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]">
          {useDb ? (
            dbPortfolio.slice(0, 4).map((project, i) => {
              const tags = jParse<string[]>(project.tags, []);
              const catColor = categoryColors[project.category ?? ""] || PRESET_COLORS[i % PRESET_COLORS.length];
              const isLarge = i === 0;
              const card = (
                <motion.div whileHover={{ y: -4 }}
                  className="relative glass-card overflow-hidden h-full group cursor-pointer transition-all duration-500 hover:border-white/15">
                  <div className="absolute inset-0 bg-gradient-to-br from-background-secondary to-background" />
                  {project.image ? (
                    <Image src={project.image} alt={project.title} fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" unoptimized />
                  ) : (
                    <>
                      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                        style={{ background: `radial-gradient(ellipse 80% 80% at 30% 30%, ${catColor}40 0%, transparent 70%)` }} />
                      <div className="absolute inset-0 grid-bg opacity-30" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                        <div className="text-8xl font-black text-white">{project.title.charAt(0)}</div>
                      </div>
                    </>
                  )}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      {project.category && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full"
                          style={{ background: `${catColor}20`, color: catColor, border: `1px solid ${catColor}30` }}>
                          {project.category}
                        </span>
                      )}
                      <motion.div initial={{ opacity: 0, scale: 0.8 }} whileHover={{ opacity: 1, scale: 1 }}
                        className="w-8 h-8 glass-card flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <ExternalLink size={14} />
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{project.title}</h3>
                      {project.description && <p className="text-text-secondary text-sm line-clamp-2 mb-3">{project.description}</p>}
                      {isLarge && tags.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                          {tags.slice(0, 3).map((tag) => (
                            <div key={tag} className="glass-card px-3 py-1.5 rounded-xl">
                              <div className="text-text-muted text-xs">{tag}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
              return (
                <motion.div key={project.id}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={isLarge ? "md:col-span-2 md:row-span-1" : ""}>
                  {project.url
                    ? <a href={project.url} target="_blank" rel="noopener noreferrer" className="block h-full">{card}</a>
                    : <div className="h-full">{card}</div>
                  }
                </motion.div>
              );
            })
          ) : (
            (staticFeatured).map((project, i) => {
              const catColor = categoryColors[project.category] || "#C6FF34";
              const isLarge = i === 0;
              return (
                <motion.div key={project.id}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={isLarge ? "md:col-span-2 md:row-span-1" : ""}>
                  <Link href={`/portfolio/${project.slug}`}>
                    <motion.div whileHover={{ y: -4 }}
                      className="relative glass-card overflow-hidden h-full group cursor-pointer transition-all duration-500 hover:border-white/15">
                      <div className="absolute inset-0 bg-gradient-to-br from-background-secondary to-background" />
                      {project.image ? (
                        <Image src={project.image} alt={project.title} fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" unoptimized />
                      ) : (
                        <>
                          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                            style={{ background: `radial-gradient(ellipse 80% 80% at 30% 30%, ${catColor}40 0%, transparent 70%)` }} />
                          <div className="absolute inset-0 grid-bg opacity-30" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                            <div className="text-8xl font-black text-white">{project.title.charAt(0)}</div>
                          </div>
                        </>
                      )}
                      <div className="absolute inset-0 p-6 flex flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <span className="text-xs font-semibold px-3 py-1 rounded-full"
                            style={{ background: `${catColor}20`, color: catColor, border: `1px solid ${catColor}30` }}>
                            {project.category}
                          </span>
                          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileHover={{ opacity: 1, scale: 1 }}
                            className="w-8 h-8 glass-card flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <ExternalLink size={14} />
                          </motion.div>
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{project.title}</h3>
                          <p className="text-text-secondary text-sm line-clamp-2 mb-4">{project.description}</p>
                          {isLarge && (
                            <div className="flex gap-4">
                              {project.results.slice(0, 2).map((r, ri) => (
                                <div key={ri} className="glass-card px-3 py-2 rounded-xl">
                                  <div className="text-accent font-black text-lg">{r.value}</div>
                                  <div className="text-text-muted text-xs">{r.metric}</div>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span key={tech} className="text-[10px] text-text-muted bg-white/[0.05] border border-white/[0.06] px-2 py-0.5 rounded-md">{tech}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>

        <div className="mt-6 md:hidden">
          <Link href="/portfolio"><div className="btn-secondary w-full text-center">مشاهده همه پروژه‌ها</div></Link>
        </div>
      </div>
    </section>
  );
}
