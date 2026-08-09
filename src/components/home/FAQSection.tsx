"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { faqs } from "@/data";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-background-secondary" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <SectionHeader
            tag="سوالات متداول"
            title="پاسخ سوالات"
            titleHighlight="شما"
            description="اگر سوال دیگری دارید، تیم پشتیبانی ما همیشه آماده پاسخگویی است."
            centered={false}
          />

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`glass-card overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "border-accent/20 shadow-glow-sm" : "hover:border-white/15"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-right gap-4"
                >
                  <span
                    className={`font-semibold transition-colors duration-200 ${
                      openIndex === i ? "text-white" : "text-text-secondary"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      openIndex === i ? "bg-accent text-background" : "bg-white/[0.05] text-text-secondary"
                    }`}
                  >
                    <Plus size={14} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-6 text-text-secondary text-sm leading-7 border-t border-white/[0.06] pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
