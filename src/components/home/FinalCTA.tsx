"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Phone } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/6 blur-[120px] pointer-events-none animate-pulse-glow" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Tag */}
          <div className="flex justify-center mb-8">
            <span className="section-tag">
              <Zap size={14} />
              آماده شروع هستید؟
            </span>
          </div>

          {/* Headline */}
          <h2 className="heading-xl text-white mb-6">
            پروژه بعدی شما{" "}
            <br className="hidden md:block" />
            <span className="accent-gradient-text">از اینجا شروع می‌شود</span>
          </h2>

          <p className="text-text-secondary text-xl leading-9 max-w-2xl mx-auto mb-12">
            پکیج ویژه طراحی سایت + سئو + پشتیبانی از ۱۵ میلیون تومان | پکیج شبکه با ۴۵٪ تخفیف ویژه. مشاوره رایگان، بدون تعهد اولیه.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/order">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(198,255,52,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center gap-2 text-lg px-10 py-5"
              >
                <Zap size={20} />
                ثبت سفارش پروژه
              </motion.div>
            </Link>

            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center gap-2 text-base"
              >
                <Phone size={18} />
                مشاوره رایگان
              </motion.div>
            </Link>
          </div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-text-muted text-sm mt-8 flex items-center justify-center gap-2"
          >
            <span className="glow-dot w-1.5 h-1.5" />
            بدون تعهد اولیه، مشاوره کاملاً رایگان است
            <span className="glow-dot w-1.5 h-1.5" />
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
