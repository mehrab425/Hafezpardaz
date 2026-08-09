"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Monitor, ShoppingCart, Palette, TrendingUp,
  Server, Network, LayoutDashboard, Bot, ArrowLeft
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { services as staticServices } from "@/data";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  Monitor, ShoppingCart, Palette, TrendingUp,
  Server, Network, LayoutDashboard, Bot
};

const PRESET_COLORS = ["#C6FF34", "#818CF8", "#34D399", "#FB923C", "#60A5FA", "#F472B6", "#A78BFA", "#22D3EE"];

interface DbService {
  id: number;
  title: string;
  description: string;
  icon: string | null;
  active: boolean;
}

interface Props {
  dbServices?: DbService[];
}

export function ServicesPreview({ dbServices }: Props) {
  const useDb = dbServices && dbServices.length > 0;

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          tag="خدمات ما"
          title="هر چیزی که کسب‌وکار دیجیتالتان"
          titleHighlight="نیاز دارد"
          description="از ایده تا اجرا؛ تمام خدمات دیجیتال زیر یک سقف با بالاترین استانداردهای کیفی"
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {useDb ? (
            dbServices.map((service, i) => {
              const Icon = iconMap[service.icon ?? ""] || Monitor;
              const color = PRESET_COLORS[i % PRESET_COLORS.length];
              return (
                <motion.div key={service.id}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}>
                  <Link href="/services">
                    <motion.div whileHover={{ y: -6, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="glass-card h-full p-6 group cursor-pointer relative overflow-hidden transition-all duration-500 hover:border-white/15">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                        style={{ background: `radial-gradient(ellipse 80% 80% at 50% 0%, ${color}15 0%, transparent 70%)` }} />
                      <div className="absolute top-0 right-4 left-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                        style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                        <Icon size={22} style={{ color }} />
                      </div>
                      <h3 className="text-white font-bold text-base mb-2">{service.title}</h3>
                      <p className="text-text-secondary text-sm leading-6 mb-4 line-clamp-2">{service.description}</p>
                      <div className="flex items-center gap-1 text-sm font-medium transition-all duration-200" style={{ color }}>
                        بیشتر بدانید<ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })
          ) : (
            staticServices.map((service, i) => {
              const Icon = iconMap[service.icon] || Monitor;
              return (
                <motion.div key={service.id}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}>
                  <Link href={`/services#${service.slug}`}>
                    <motion.div whileHover={{ y: -6, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="glass-card h-full p-6 group cursor-pointer relative overflow-hidden transition-all duration-500 hover:border-white/15"
                      style={{ "--service-color": service.color } as React.CSSProperties}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                        style={{ background: `radial-gradient(ellipse 80% 80% at 50% 0%, ${service.color}15 0%, transparent 70%)` }} />
                      <div className="absolute top-0 right-4 left-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `linear-gradient(90deg, transparent, ${service.color}60, transparent)` }} />
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                        style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}>
                        <Icon size={22} style={{ color: service.color }} />
                      </div>
                      <h3 className="text-white font-bold text-base mb-2">{service.title}</h3>
                      <p className="text-text-secondary text-sm leading-6 mb-4 line-clamp-2">{service.shortDesc}</p>
                      <div className="flex items-center gap-1 text-sm font-medium transition-all duration-200" style={{ color: service.color }}>
                        بیشتر بدانید<ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-10 text-center">
          <Link href="/services">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="btn-secondary inline-flex items-center gap-2">
              مشاهده همه خدمات<ArrowLeft size={16} />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
