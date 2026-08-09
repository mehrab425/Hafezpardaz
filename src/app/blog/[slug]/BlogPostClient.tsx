"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { Clock, ArrowRight, BookOpen, Calendar, Tag } from "lucide-react";
import { FinalCTA } from "@/components/home/FinalCTA";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  date: string;
  image: string | null;
  tags: string[];
}

interface RelatedPost {
  slug: string;
  title: string;
  category: string;
  readTime: string;
}

export function BlogPostClient({ post, related }: { post: Post; related: RelatedPost[] }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const paragraphs = (post.content || post.excerpt).trim().split("\n\n");

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-accent origin-left z-[100]"
      />

      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 text-text-muted text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">خانه</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">بلاگ</Link>
            <span>/</span>
            <span className="text-white line-clamp-1">{post.title}</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-tag mb-6 inline-block">{post.category}</span>
            <h1 className="heading-lg text-white mb-6 text-balance">{post.title}</h1>
            <p className="text-text-secondary text-xl leading-9 mb-8">{post.excerpt}</p>

            <div className="flex flex-wrap items-center gap-6 text-text-muted text-sm border-b border-white/[0.06] pb-8">
              <span className="flex items-center gap-2"><Clock size={14} />{post.readTime} مطالعه</span>
              <span className="flex items-center gap-2"><Calendar size={14} />{post.date}</span>
              <span className="flex items-center gap-2 text-accent font-medium">{post.author}</span>
              <div className="flex gap-2 mr-auto flex-wrap">
                {post.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 text-xs bg-white/[0.05] border border-white/[0.08] px-2 py-1 rounded-md">
                    <Tag size={10} />{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-16">
        <div className="glass-card h-64 relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-background" />
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen size={72} className="text-white/10" />
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 lg:px-8 mb-20">
        <div className="prose-persian">
          {paragraphs.map((para, i) => {
            if (para.startsWith("## ")) {
              return <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">{para.replace("## ", "")}</h2>;
            }
            if (para.startsWith("**")) {
              return (
                <p key={i} className="text-text-secondary leading-8 mb-6"
                  dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }}
                />
              );
            }
            return <p key={i} className="text-text-secondary leading-8 mb-6">{para}</p>;
          })}
        </div>
      </article>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-16">
        <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-white font-bold mb-1">این مقاله مفید بود؟</div>
            <div className="text-text-secondary text-sm">با دوستانتان به اشتراک بگذارید</div>
          </div>
          <div className="flex gap-3">
            {["اینستاگرام", "تلگرام", "توییتر", "لینکدین"].map((s) => (
              <button key={s} className="glass-card px-4 py-2 text-xs text-text-secondary hover:text-accent hover:border-accent/30 transition-all duration-200">
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="py-16 bg-background-secondary">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-white font-bold text-2xl">مقالات مرتبط</h2>
              <Link href="/blog" className="flex items-center gap-1 text-text-secondary hover:text-accent text-sm transition-colors">
                <ArrowRight size={14} />
                همه مقالات
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`}>
                  <div className="glass-card p-5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1">
                    <span className="text-accent text-xs font-bold block mb-2">{p.category}</span>
                    <h3 className="text-white font-semibold text-sm line-clamp-2 mb-3">{p.title}</h3>
                    <div className="flex items-center gap-1 text-text-muted text-xs">
                      <Clock size={11} />{p.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCTA />
    </>
  );
}
