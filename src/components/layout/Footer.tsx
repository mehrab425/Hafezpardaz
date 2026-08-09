"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Instagram,
  Phone,
  Mail,
  MapPin,
  Send,
  ArrowLeft,
} from "lucide-react";
import { HpsLogo } from "@/components/shared/HpsLogo";

function BaleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M9 9h2.5a1.5 1.5 0 0 1 0 3H9V9z" />
      <path d="M9 12h3a1.5 1.5 0 0 1 0 3H9v-3z" />
    </svg>
  );
}

const footerLinks = {
  services: [
    { label: "طراحی سایت و اپ", href: "/services#web-design" },
    { label: "سئو و بهینه‌سازی", href: "/services#seo" },
    { label: "شبکه و سرور", href: "/services#network" },
    { label: "امنیت سایبری", href: "/services#security" },
    { label: "تولید محتوا", href: "/services#content" },
    { label: "نمایندگی اسیاتک", href: "/services#internet" },
  ],
  company: [
    { label: "درباره ما", href: "/about" },
    { label: "نمونه‌کارها", href: "/portfolio" },
    { label: "بلاگ", href: "/blog" },
    { label: "تماس با ما", href: "/contact" },
    { label: "سفارش پروژه", href: "/order" },
  ],
  socials: [
    { icon: Instagram, label: "اینستاگرام", href: "https://instagram.com/hafezpardaz105" },
    { icon: BaleIcon, label: "بله", href: "https://ble.ir/HPSsistem" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-background border-t border-white/[0.06] overflow-hidden">
      {/* Gradient accent top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Newsletter CTA */}
        <div className="py-16 border-b border-white/[0.06]">
          <div className="glass-card gradient-border p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="section-tag mb-4 inline-block">خبرنامه</span>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                آخرین اخبار دیجیتال را از دست ندهید
              </h3>
              <p className="text-text-secondary">
                هر هفته آموزش‌ها، ترندها و فرصت‌های ویژه در ایمیل شما
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="ایمیل شما"
                  className="flex-1 md:w-72 bg-white/[0.05] border border-white/[0.10] rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-text-muted outline-none focus:border-accent/40 focus:bg-white/[0.08] transition-all duration-300 text-right"
                  dir="rtl"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center gap-2 whitespace-nowrap"
                >
                  <Send size={16} />
                  عضویت
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <HpsLogo className="h-12 w-auto text-accent group-hover:text-white transition-colors duration-300" />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black text-white">حافظ پرداز</span>
                <span className="text-xs text-accent font-medium">سپهر</span>
              </div>
            </Link>
            <p className="text-text-secondary text-sm leading-7 mb-6">
              شرکت تخصصی IT در ستارخان تهران. طراحی سایت، شبکه، سرور، سئو و تولید محتوا زیر یک سقف.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {footerLinks.socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 glass-card flex items-center justify-center rounded-xl hover:border-accent/30 hover:text-accent transition-all duration-200"
                  aria-label={s.label}
                >
                  <s.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-accent rounded-full" />
              خدمات
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-text-secondary text-sm hover:text-accent transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowLeft size={12} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-accent rounded-full" />
              شرکت
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-text-secondary text-sm hover:text-accent transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowLeft size={12} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-accent rounded-full" />
              تماس
            </h4>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 glass-card flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5">
                    <Phone size={14} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+982166931044" className="text-white font-semibold text-sm hover:text-accent transition-colors duration-200">۰۲۱-۶۶۹۳۱۰۴۴</a>
                    <a href="tel:+982166946983" className="text-white font-semibold text-sm hover:text-accent transition-colors duration-200">۰۲۱-۶۶۹۴۶۹۸۳</a>
                    <a href="tel:+982166426752" className="text-white font-semibold text-sm hover:text-accent transition-colors duration-200">۰۲۱-۶۶۴۲۶۷۵۲</a>
                    <a href="tel:+989122242788" className="text-white font-semibold text-sm hover:text-accent transition-colors duration-200">۰۹۱۲۲-۲۴۲۷۸۸</a>
                    <a href="tel:+989355565386" className="text-white font-semibold text-sm hover:text-accent transition-colors duration-200">۰۹۳۵۵-۵۶۵۳۸۶</a>
                    <a href="tel:+989332242773" className="text-white font-semibold text-sm hover:text-accent transition-colors duration-200">۰۹۳۳۲-۲۴۲۷۷۳</a>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="mailto:hafezpardazsepehr@gmail.com"
                  className="flex items-center gap-3 text-white font-semibold text-sm hover:text-accent transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 glass-card flex items-center justify-center rounded-lg group-hover:border-accent/30 transition-all duration-200">
                    <Mail size={14} />
                  </div>
                  hafezpardazsepehr@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-text-secondary text-sm">
                  <div className="w-8 h-8 glass-card flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5">
                    <MapPin size={14} />
                  </div>
                  ستارخان، تهران
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            © ۱۴۰۴ حافظ پرداز سپهر. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-text-muted text-xs hover:text-white transition-colors duration-200">
              حریم خصوصی
            </Link>
            <Link href="/terms" className="text-text-muted text-xs hover:text-white transition-colors duration-200">
              قوانین استفاده
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
