"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Play, Zap, Star } from "lucide-react";

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Larger glowing orbs */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-2 h-2 rounded-full bg-accent/30"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + Math.random() * 60}%`,
            boxShadow: "0 0 10px rgba(198,255,52,0.5)",
          }}
          animate={{
            y: [0, -60 - i * 10, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid-bg opacity-100" />
      {/* Radial fade */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background" style={{
        background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, #171717 100%)"
      }} />
    </div>
  );
}

function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-16 md:mt-0 perspective-1000"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Main dashboard card */}
        <div className="glass-card gradient-border p-6 max-w-lg mx-auto">
          {/* Header bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-accent/70" />
            </div>
            <span className="text-text-muted text-xs">hafezpardaz.ir/dashboard</span>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "بازدید", value: "۴۸,۳۲۱", change: "+۲۴٪" },
              { label: "سفارش", value: "۱,۲۴۰", change: "+۱۸٪" },
              { label: "درآمد", value: "۸۵M", change: "+۳۶٪" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06]"
              >
                <div className="text-text-muted text-[10px] mb-1">{s.label}</div>
                <div className="text-white font-bold text-sm">{s.value}</div>
                <div className="text-accent text-[10px] font-medium">{s.change}</div>
              </motion.div>
            ))}
          </div>

          {/* Chart bar */}
          <div className="mb-4">
            <div className="flex items-end gap-1 h-16">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 72, 88].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 1.4 + i * 0.05, duration: 0.4 }}
                  className="flex-1 rounded-t-sm origin-bottom"
                  style={{
                    height: `${h}%`,
                    background: i === 10 ? "#C6FF34" : "rgba(198,255,52,0.2)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Progress items */}
          <div className="space-y-2">
            {[
              { label: "سئو", progress: 87 },
              { label: "سرعت", progress: 94 },
              { label: "امنیت", progress: 99 },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-text-muted text-[10px] w-10">{item.label}</span>
                <div className="flex-1 h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ delay: 1.8 + i * 0.2, duration: 0.8 }}
                    className="h-full bg-accent rounded-full"
                  />
                </div>
                <span className="text-accent text-[10px] font-bold w-8 text-left">{item.progress}٪</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating badges */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          className="absolute -top-4 -right-4 glass-card accent-glow-border px-4 py-2.5 rounded-xl flex items-center gap-2"
        >
          <div className="glow-dot" />
          <span className="text-white text-xs font-semibold">پروژه فعال</span>
          <span className="text-accent text-xs font-bold">۱۲</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-4 -left-4 glass-card px-4 py-2.5 rounded-xl flex items-center gap-2 border border-white/10"
        >
          <Star size={14} className="text-accent fill-accent" />
          <span className="text-white text-xs font-semibold">رضایت مشتری</span>
          <span className="text-accent text-xs font-bold">۹۸٪</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background elements */}
      <GridBackground />
      <FloatingParticles />

      {/* Radial hero gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none">
        <div className="w-full h-full bg-hero-gradient" />
      </div>

      {/* Glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <motion.div
        style={{ y, opacity }}
        className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="order-2 lg:order-1">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="section-tag">
                <Zap size={14} />
                خدمات IT حرفه‌ای در تهران
              </span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={12} className="text-accent fill-accent" />
                ))}
                <span className="text-text-secondary text-xs mr-1">+۱۶۰ پروژه</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="heading-xl text-white mb-6 text-balance"
            >
              طراحی سایت و خدمات IT{" "}
              <span className="accent-gradient-text">حرفه‌ای</span>
              {" "}
              <br className="hidden md:block" />
              برای رشد کسب‌وکارتان
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-text-secondary text-xl leading-9 mb-10"
            >
              از طراحی سایت تا شبکه، سرور و تولید محتوا؛ همه نیازهای IT کسب‌وکار شما زیر یک سقف
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link href="/order">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center gap-2 text-base"
                >
                  <Zap size={18} />
                  ثبت سفارش
                </motion.div>
              </Link>
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center gap-2 text-base"
                >
                  مشاوره رایگان
                  <ArrowLeft size={18} />
                </motion.div>
              </Link>
              <button className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors duration-200 text-sm">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-accent/30 transition-all duration-200">
                  <Play size={14} className="fill-current mr-0.5" />
                </div>
                مشاهده نمونه‌کار
              </button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap items-center gap-6 mt-10 pt-10 border-t border-white/[0.06]"
            >
              {[
                "طراحی سایت",
                "شبکه و سرور",
                "تولید محتوا",
                "سئو",
                "تعمیرات",
              ].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.05 }}
                  className="text-text-muted text-xs flex items-center gap-1.5"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Dashboard visual */}
          <div className="order-1 lg:order-2">
            <DashboardMockup />
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-text-muted text-xs">اسکرول</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
