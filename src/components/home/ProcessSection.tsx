"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Palette, Code2, TestTube, Rocket } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { processSteps } from "@/data";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  MessageSquare, Palette, Code2, TestTube, Rocket,
};

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-background-secondary" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          tag="فرآیند کاری"
          title="چگونه پروژه شما را"
          titleHighlight="به نتیجه می‌رسانیم"
          description="فرآیند شفاف، ساختارمند و قابل پیگیری از اولین جلسه تا تحویل نهایی"
        />

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Connecting line */}
          <div className="absolute top-12 right-12 left-12 h-0.5 bg-white/[0.06] hidden lg:block">
            <motion.div
              style={{ width: lineWidth }}
              className="h-full bg-gradient-to-l from-accent to-accent/20"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {processSteps.map((step, i) => {
              const Icon = iconMap[step.icon] || Rocket;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step circle */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative w-24 h-24 rounded-full glass-card flex flex-col items-center justify-center mb-6 z-10 group cursor-default border border-white/10 hover:border-accent/30 transition-all duration-300"
                  >
                    <div className="absolute inset-0 rounded-full bg-accent/0 group-hover:bg-accent/5 transition-all duration-300" />
                    <Icon size={24} className="text-accent mb-1" />
                    <span className="text-text-muted text-xs font-bold">{step.step}</span>
                  </motion.div>

                  <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-6 mb-3">{step.description}</p>
                  <span className="text-xs text-accent font-semibold bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
                    {step.duration}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
