"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { stats } from "@/data";

export function StatsSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background-secondary" />
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="relative glass-card glass-card-hover p-8 flex flex-col items-center text-center group cursor-default"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-accent/0 group-hover:bg-accent/[0.03] transition-all duration-500" />

              {/* Top accent line */}
              <div className="absolute top-0 right-8 left-8 h-px bg-gradient-to-r from-transparent via-accent/0 group-hover:via-accent/40 to-transparent transition-all duration-500" />

              <div className="text-5xl md:text-6xl font-black text-white mb-2 tabular-nums">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  duration={2000}
                />
              </div>
              <div className="text-text-secondary text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
