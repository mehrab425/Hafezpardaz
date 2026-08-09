"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Monitor, ShoppingCart, Palette, TrendingUp,
  Server, Network, LayoutDashboard, Bot,
  Wrench, FileText, Shield, Wifi,
  CheckCircle2, ArrowLeft, Clock, Zap
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTA } from "@/components/home/FinalCTA";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  Monitor, ShoppingCart, Palette, TrendingUp,
  Server, Network, LayoutDashboard, Bot,
  Wrench, FileText, Shield, Wifi,
};

const PRESET_COLORS = ["#C6FF34", "#818CF8", "#34D399", "#FB923C", "#60A5FA", "#F472B6", "#A78BFA", "#22D3EE"];

const technologies = [
  { category: "طراحی وب", techs: ["Next.js", "React", "WordPress", "TailwindCSS", "TypeScript"] },
  { category: "شبکه و سرور", techs: ["MikroTik", "Cisco", "Linux", "Windows Server", "Nginx"] },
  { category: "امنیت", techs: ["Fortinet", "Kaspersky", "SSL/TLS", "Firewall", "VPN"] },
  { category: "سئو و محتوا", techs: ["Ahrefs", "Google Search Console", "Canva", "Premiere", "Schema.org"] },
];

interface DbService {
  id: number;
  title: string;
  description: string;
  price: number | null;
  image: string | null;
  icon: string | null;
  active: boolean;
  sortOrder: number;
}

interface StaticService {
  id: string;
  slug: string;
  icon: string;
  title: string;
  shortDesc: string;
  description: string;
  benefits: string[];
  technologies: string[];
  duration: string;
  color: string;
}

interface Props {
  dbServices: DbService[];
  staticServices: StaticService[];
}

export function ServicesClient({ dbServices, staticServices }: Props) {
  const useDb = dbServices.length > 0;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-hero-gradient pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
            <span className="section-tag mb-6 inline-flex"><Zap size={14} />خدمات تخصصی IT</span>
            <h1 className="heading-xl text-white mb-6">
              همه خدمات IT شما{" "}<span className="accent-gradient-text">زیر یک سقف</span>
            </h1>
            <p className="text-text-secondary text-xl leading-9">
              از طراحی سایت و سئو تا شبکه، سرور، امنیت و نمایندگی اینترنت اسیاتک؛ تیم متخصص حافظ پرداز در ستارخان تهران.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-8">
            {useDb ? (
              dbServices.map((service, i) => {
                const Icon = iconMap[service.icon ?? ""] || Monitor;
                const color = PRESET_COLORS[i % PRESET_COLORS.length];
                return (
                  <motion.div key={service.id}
                    initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="glass-card p-8 md:p-10 relative overflow-hidden group hover:border-white/15 transition-all duration-500">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse 60% 60% at 100% 0%, ${color}08 0%, transparent 70%)` }} />
                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                      <div className="md:col-span-2">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                          style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                          <Icon size={28} style={{ color }} />
                        </div>
                        <h2 className="text-white font-black text-2xl mb-3">{service.title}</h2>
                        <p className="text-text-secondary text-sm leading-7">{service.description}</p>
                        <div className="mt-6">
                          <Link href="/order">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
                              style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
                              سفارش این خدمت<ArrowLeft size={14} />
                            </motion.div>
                          </Link>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center gap-4">
                        {service.price && (
                          <div className="glass-card p-4 rounded-xl">
                            <div className="text-text-muted text-xs mb-1">قیمت پایه</div>
                            <div className="font-black text-lg" style={{ color }}>
                              {service.price.toLocaleString("fa-IR")} تومان
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-text-muted text-sm">
                          <Clock size={14} />
                          <span>برای مشاوره رایگان{" "}<Link href="/contact" className="text-white underline underline-offset-4">تماس بگیرید</Link></span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              staticServices.map((service, i) => {
                const Icon = iconMap[service.icon] || Monitor;
                return (
                  <motion.div key={service.id} id={service.slug}
                    initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="glass-card p-8 md:p-10 relative overflow-hidden group hover:border-white/15 transition-all duration-500">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse 60% 60% at 100% 0%, ${service.color}08 0%, transparent 70%)` }} />
                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                      <div className="md:col-span-1">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                          style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}>
                          <Icon size={28} style={{ color: service.color }} />
                        </div>
                        <h2 className="text-white font-black text-2xl mb-3">{service.title}</h2>
                        <p className="text-text-secondary text-sm leading-7 mb-4">{service.description}</p>
                        <div className="flex items-center gap-2 text-text-muted text-sm">
                          <Clock size={14} />
                          <span>مدت زمان: <span className="text-white font-medium">{service.duration}</span></span>
                        </div>
                        <div className="mt-6">
                          <Link href="/order">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
                              style={{ background: `${service.color}15`, border: `1px solid ${service.color}30`, color: service.color }}>
                              سفارش این خدمت<ArrowLeft size={14} />
                            </motion.div>
                          </Link>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider opacity-60">مزایا</h4>
                        <ul className="space-y-3">
                          {service.benefits.map((b, bi) => (
                            <li key={bi} className="flex items-center gap-3 text-text-secondary text-sm">
                              <CheckCircle2 size={16} style={{ color: service.color }} className="flex-shrink-0" />{b}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider opacity-60">تکنولوژی‌ها</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech) => (
                            <span key={tech} className="text-xs font-medium px-3 py-1.5 rounded-lg border"
                              style={{ background: `${service.color}10`, borderColor: `${service.color}25`, color: service.color }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-24 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader tag="تکنولوژی‌ها" title="ابزارهایی که با آن" titleHighlight="کار می‌کنیم"
            description="از جدیدترین فناوری‌های روز برای ساخت محصولات قدرتمند استفاده می‌کنیم" />
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {technologies.map((cat, i) => (
              <motion.div key={cat.category} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass-card p-6">
                <h4 className="text-accent text-xs font-bold uppercase tracking-wider mb-4">{cat.category}</h4>
                <ul className="space-y-2">
                  {cat.techs.map((tech) => (
                    <li key={tech} className="text-text-secondary text-sm flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-accent/50" />{tech}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
      <FinalCTA />
    </>
  );
}
