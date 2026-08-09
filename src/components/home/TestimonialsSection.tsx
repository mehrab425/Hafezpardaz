"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronRight, ChevronLeft } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { testimonials } from "@/data";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoplay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const goTo = (index: number) => {
    setActiveIndex(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAutoplay();
  };

  const prev = () => goTo((activeIndex - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((activeIndex + 1) % testimonials.length);

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/3 blur-[150px] pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          tag="رضایت مشتریان"
          title="آن‌ها از تجربه‌شان"
          titleHighlight="می‌گویند"
          description="بیش از ۱۰۰۰ مشتری راضی، بهترین معرف ما هستند"
        />

        <div className="mt-16 relative">
          {/* Main testimonial */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card gradient-border p-8 md:p-12 relative"
              >
                {/* Quote icon */}
                <div className="absolute top-8 left-8 opacity-10">
                  <Quote size={80} className="text-accent" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                    <Star key={i} size={18} className="text-accent fill-accent" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-white text-xl md:text-2xl leading-10 font-medium mb-8 relative z-10">
                  &ldquo;{testimonials[activeIndex].content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-accent/20 border-2 border-accent/30 flex items-center justify-center text-accent font-bold text-lg">
                    {testimonials[activeIndex].name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-bold">{testimonials[activeIndex].name}</div>
                    <div className="text-text-secondary text-sm">{testimonials[activeIndex].role}</div>
                    <div className="text-accent text-xs font-medium">{testimonials[activeIndex].company}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "bg-accent w-8" : "bg-white/20 w-2 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prev}
                  className="w-11 h-11 glass-card rounded-xl flex items-center justify-center hover:border-accent/30 hover:text-accent transition-all duration-200"
                >
                  <ChevronRight size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={next}
                  className="w-11 h-11 glass-card rounded-xl flex items-center justify-center hover:border-accent/30 hover:text-accent transition-all duration-200"
                >
                  <ChevronLeft size={18} />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Preview cards */}
          <div className="hidden lg:grid grid-cols-4 gap-4 mt-8">
            {testimonials.map((t, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                whileHover={{ y: -2 }}
                className={`glass-card p-4 text-right text-sm transition-all duration-300 ${
                  i === activeIndex
                    ? "border-accent/30 bg-accent/5"
                    : "hover:border-white/15"
                }`}
              >
                <div className="text-white font-semibold text-xs mb-1">{t.name}</div>
                <div className="text-text-muted text-xs truncate">{t.company}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
