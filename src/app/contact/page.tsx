"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone, Mail, MapPin, Send, Instagram,
  Clock, Zap, Check
} from "lucide-react";

function BaleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M9 9h2.5a1.5 1.5 0 0 1 0 3H9V9z" />
      <path d="M9 12h3a1.5 1.5 0 0 1 0 3H9v-3z" />
    </svg>
  );
}

const contactInfo = [
  {
    icon: Phone,
    label: "تلفن",
    value: "۰۲۱-۶۶۹۳۱۰۴۴ · ۰۲۱-۶۶۹۴۶۹۸۳ · ۰۲۱-۶۶۴۲۶۷۵۲ · ۰۹۱۲۲-۲۴۲۷۸۸ · ۰۹۳۵۵-۵۶۵۳۸۶ · ۰۹۳۳۲-۲۴۲۷۷۳",
    href: "tel:+982166931044",
  },
  { icon: Mail, label: "ایمیل", value: "hafezpardazsepehr@gmail.com", href: "mailto:hafezpardazsepehr@gmail.com" },
  { icon: MapPin, label: "آدرس", value: "ستارخان، تهران", href: "#" },
  { icon: Clock, label: "ساعت کاری", value: "شنبه تا چهارشنبه: ۹ تا ۱۸", href: "#" },
];

const socials = [
  { Icon: Instagram, label: "اینستاگرام", href: "https://instagram.com/hafezpardaz105", color: "#E1306C" },
  { Icon: BaleIcon, label: "بله", href: "https://ble.ir/HPSsistem", color: "#00A693" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-hero-gradient pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-tag mb-6 inline-flex"><Zap size={14} />تماس با ما</span>
            <h1 className="heading-xl text-white mb-6">
              با ما <span className="accent-gradient-text">صحبت</span> کنید
            </h1>
            <p className="text-text-secondary text-xl leading-9 max-w-2xl mx-auto">
              یک تماس ساده کافی است. تیم متخصص ما در ستارخان تهران آماده پاسخگویی و مشاوره رایگان است.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-10 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mx-auto mb-6">
                    <Check size={36} className="text-accent" />
                  </div>
                  <h2 className="text-white font-bold text-2xl mb-4">پیام ارسال شد!</h2>
                  <p className="text-text-secondary text-lg leading-8">
                    از تماس شما متشکریم. تیم ما ظرف ۲ ساعت کاری با شما تماس خواهد گرفت.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass-card gradient-border p-8"
                >
                  <h2 className="text-white font-bold text-2xl mb-8">ارسال پیام</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { key: "name", label: "نام و نام خانوادگی", type: "text", placeholder: "علی رضایی" },
                        { key: "phone", label: "شماره تلفن", type: "tel", placeholder: "۰۹۱۲۰۰۰۰۰۰۰" },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="block text-text-secondary text-sm font-medium mb-2">{field.label}</label>
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={form[field.key as keyof typeof form]}
                            onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                            required
                            className="w-full bg-white/[0.05] border border-white/[0.10] rounded-xl px-4 py-3 text-white placeholder:text-text-muted outline-none focus:border-accent/40 focus:bg-white/[0.08] transition-all duration-300"
                            dir="rtl"
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-text-secondary text-sm font-medium mb-2">ایمیل</label>
                      <input
                        type="email"
                        placeholder="example@email.com"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        required
                        className="w-full bg-white/[0.05] border border-white/[0.10] rounded-xl px-4 py-3 text-white placeholder:text-text-muted outline-none focus:border-accent/40 focus:bg-white/[0.08] transition-all duration-300"
                        dir="rtl"
                      />
                    </div>

                    <div>
                      <label className="block text-text-secondary text-sm font-medium mb-2">موضوع</label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                        className="w-full bg-white/[0.05] border border-white/[0.10] rounded-xl px-4 py-3 text-white outline-none focus:border-accent/40 transition-all duration-300"
                        dir="rtl"
                      >
                        <option value="" className="bg-background">انتخاب موضوع</option>
                        <option value="web" className="bg-background">طراحی سایت و اپ</option>
                        <option value="network" className="bg-background">شبکه، سرور و امنیت</option>
                        <option value="seo" className="bg-background">سئو و تولید محتوا</option>
                        <option value="other" className="bg-background">سایر خدمات</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-text-secondary text-sm font-medium mb-2">پیام</label>
                      <textarea
                        rows={5}
                        placeholder="پیام خود را اینجا بنویسید..."
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        required
                        className="w-full bg-white/[0.05] border border-white/[0.10] rounded-xl px-4 py-3 text-white placeholder:text-text-muted outline-none focus:border-accent/40 focus:bg-white/[0.08] transition-all duration-300 resize-none"
                        dir="rtl"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="btn-primary w-full flex items-center justify-center gap-2 text-base"
                    >
                      <Send size={18} />
                      ارسال پیام
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-white font-bold text-2xl mb-6">اطلاعات تماس</h2>
                <div className="space-y-4">
                  {contactInfo.map((info, i) => (
                    <motion.a
                      key={i}
                      href={info.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="glass-card p-5 flex items-center gap-4 hover:border-accent/20 hover:-translate-y-0.5 transition-all duration-300 block"
                    >
                      <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                        <info.icon size={20} className="text-accent" />
                      </div>
                      <div>
                        <div className="text-text-muted text-xs mb-0.5">{info.label}</div>
                        <div className="text-white font-medium text-sm">{info.value}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Socials */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-6"
              >
                <h3 className="text-white font-bold mb-5">شبکه‌های اجتماعی</h3>
                <div className="flex gap-3">
                  {socials.map((s, i) => (
                    <motion.a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-12 h-12 flex items-center justify-center bg-white/[0.04] rounded-xl border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.16] transition-all duration-200"
                      style={{ color: s.color }}
                    >
                      <s.Icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Map placeholder */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card h-48 relative overflow-hidden rounded-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-background" />
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={32} className="text-accent mx-auto mb-2" />
                    <span className="text-text-secondary text-sm">ستارخان، تهران</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
