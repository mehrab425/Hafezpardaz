"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, User, Briefcase, Settings, DollarSign, Calendar, MessageSquare, Zap, Check } from "lucide-react";

const steps = [
  { id: 1, label: "اطلاعات شخصی", icon: User },
  { id: 2, label: "نوع پروژه", icon: Briefcase },
  { id: 3, label: "ویژگی‌ها", icon: Settings },
  { id: 4, label: "بودجه", icon: DollarSign },
  { id: 5, label: "زمان‌بندی", icon: Calendar },
  { id: 6, label: "توضیحات نهایی", icon: MessageSquare },
];

const projectTypes = [
  "سایت شرکتی", "فروشگاه اینترنتی", "طراحی UI/UX", "سئو",
  "مدیریت سرور", "راه‌اندازی شبکه", "پنل اختصاصی", "ربات اتوماسیون",
];

const features = [
  "طراحی ریسپانسیو", "سیستم مدیریت محتوا", "درگاه پرداخت", "چندزبانه",
  "بلاگ", "فرم تماس", "نقشه گوگل", "چت آنلاین", "سئو پایه",
  "سرعت بهینه", "امنیت SSL", "پنل مدیریت",
];

const budgets = [
  { label: "کمتر از ۱۵ میلیون", value: "lt15" },
  { label: "۱۵ تا ۳۰ میلیون", value: "15-30" },
  { label: "۳۰ تا ۶۰ میلیون", value: "30-60" },
  { label: "بیش از ۶۰ میلیون", value: "gt60" },
];

const timelines = [
  { label: "اورژانسی (کمتر از ۲ هفته)", value: "urgent" },
  { label: "استاندارد (۲-۴ هفته)", value: "standard" },
  { label: "معمولی (۱-۲ ماه)", value: "normal" },
  { label: "بدون محدودیت", value: "flexible" },
];

export default function OrderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    projectType: [] as string[],
    features: [] as string[],
    budget: "", timeline: "",
    description: "", referral: "",
  });

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const toggleArray = (field: "projectType" | "features", value: string) => {
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(value)
        ? f[field].filter((v) => v !== value)
        : [...f[field], value],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg mx-auto px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mx-auto mb-8"
          >
            <Check size={40} className="text-accent" />
          </motion.div>
          <h1 className="heading-md text-white mb-4">سفارش ثبت شد!</h1>
          <p className="text-text-secondary text-lg leading-8 mb-8">
            تیم ما در اسرع وقت با شما تماس خواهد گرفت. معمولاً ظرف ۲ ساعت کاری پاسخ می‌دهیم.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/" className="btn-primary">بازگشت به خانه</Link>
            <Link href="/portfolio" className="btn-secondary">مشاهده نمونه‌کارها</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-hero-gradient pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="section-tag mb-4 inline-flex"><Zap size={14} />ثبت سفارش پروژه</span>
          <h1 className="heading-lg text-white mb-4">بیایید پروژه شما را بسازیم</h1>
          <p className="text-text-secondary text-lg">اطلاعات پروژه را وارد کنید تا تیم ما بهترین راهکار را پیشنهاد دهد</p>
        </motion.div>

        {/* Progress steps */}
        <div className="flex items-center justify-between mb-12 overflow-x-auto pb-2">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;
            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <motion.div
                    animate={{
                      backgroundColor: isCompleted ? "#C6FF34" : isActive ? "rgba(198,255,52,0.1)" : "rgba(255,255,255,0.04)",
                      borderColor: isCompleted ? "#C6FF34" : isActive ? "rgba(198,255,52,0.5)" : "rgba(255,255,255,0.1)",
                    }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300"
                  >
                    {isCompleted ? (
                      <Check size={16} className="text-background" />
                    ) : (
                      <Icon size={16} className={isActive ? "text-accent" : "text-text-muted"} />
                    )}
                  </motion.div>
                  <span className={`text-[10px] whitespace-nowrap font-medium ${isActive ? "text-accent" : "text-text-muted"}`}>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-px mx-2 mb-5">
                    <motion.div
                      animate={{ scaleX: isCompleted ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ originX: "right" }}
                      className="h-full bg-accent"
                    />
                    <div className="h-full bg-white/10 -mt-px" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Form */}
        <div className="glass-card gradient-border p-8 md:p-10">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-white font-bold text-xl mb-6">اطلاعات شخصی</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: "نام و نام خانوادگی", key: "name", type: "text", placeholder: "مثال: علی رضایی" },
                      { label: "نام شرکت / سازمان", key: "company", type: "text", placeholder: "اختیاری" },
                      { label: "ایمیل", key: "email", type: "email", placeholder: "example@email.com" },
                      { label: "شماره تلفن", key: "phone", type: "tel", placeholder: "۰۹۱۲۰۰۰۰۰۰۰" },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="block text-text-secondary text-sm font-medium mb-2">{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={form[field.key as keyof typeof form] as string}
                          onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                          className="w-full bg-white/[0.05] border border-white/[0.10] rounded-xl px-4 py-3 text-white placeholder:text-text-muted outline-none focus:border-accent/40 focus:bg-white/[0.08] transition-all duration-300"
                          dir="rtl"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-white font-bold text-xl mb-6">نوع پروژه</h2>
                  <p className="text-text-secondary text-sm mb-6">می‌توانید چند مورد انتخاب کنید</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {projectTypes.map((type) => (
                      <motion.button
                        key={type}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleArray("projectType", type)}
                        className={`p-4 rounded-xl text-sm font-semibold text-right transition-all duration-200 ${
                          form.projectType.includes(type)
                            ? "bg-accent/10 border border-accent/40 text-accent"
                            : "glass-card text-text-secondary hover:border-white/15 hover:text-white"
                        }`}
                      >
                        {form.projectType.includes(type) && <CheckCircle2 size={14} className="text-accent mb-2" />}
                        {type}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-white font-bold text-xl mb-6">ویژگی‌های مورد نیاز</h2>
                  <p className="text-text-secondary text-sm mb-6">ویژگی‌هایی که می‌خواهید انتخاب کنید</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {features.map((feat) => (
                      <motion.button
                        key={feat}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleArray("features", feat)}
                        className={`p-3 rounded-xl text-sm text-right flex items-center gap-2 transition-all duration-200 ${
                          form.features.includes(feat)
                            ? "bg-accent/10 border border-accent/40 text-accent"
                            : "glass-card text-text-secondary hover:border-white/15 hover:text-white"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-sm border flex-shrink-0 flex items-center justify-center ${form.features.includes(feat) ? "bg-accent border-accent" : "border-white/20"}`}>
                          {form.features.includes(feat) && <Check size={10} className="text-background" />}
                        </div>
                        {feat}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-white font-bold text-xl mb-6">بودجه پروژه</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {budgets.map((b) => (
                      <motion.button
                        key={b.value}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setForm((f) => ({ ...f, budget: b.value }))}
                        className={`p-5 rounded-xl text-right transition-all duration-200 ${
                          form.budget === b.value
                            ? "bg-accent/10 border border-accent/40 text-accent"
                            : "glass-card text-text-secondary hover:border-white/15 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${form.budget === b.value ? "border-accent bg-accent" : "border-white/20"}`}>
                            {form.budget === b.value && <div className="w-2 h-2 rounded-full bg-background" />}
                          </div>
                          <span className="font-semibold">{b.label}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-white font-bold text-xl mb-6">زمان‌بندی</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {timelines.map((t) => (
                      <motion.button
                        key={t.value}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setForm((f) => ({ ...f, timeline: t.value }))}
                        className={`p-5 rounded-xl text-right transition-all duration-200 ${
                          form.timeline === t.value
                            ? "bg-accent/10 border border-accent/40 text-accent"
                            : "glass-card text-text-secondary hover:border-white/15 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${form.timeline === t.value ? "border-accent bg-accent" : "border-white/20"}`}>
                            {form.timeline === t.value && <div className="w-2 h-2 rounded-full bg-background" />}
                          </div>
                          <span className="font-semibold">{t.label}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 6 && (
                <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-white font-bold text-xl mb-6">توضیحات نهایی</h2>
                  <div>
                    <label className="block text-text-secondary text-sm font-medium mb-2">شرح پروژه</label>
                    <textarea
                      rows={5}
                      placeholder="هر جزئیاتی که درباره پروژه می‌خواهید بدانیم، اینجا بنویسید..."
                      value={form.description}
                      onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                      className="w-full bg-white/[0.05] border border-white/[0.10] rounded-xl px-4 py-3 text-white placeholder:text-text-muted outline-none focus:border-accent/40 focus:bg-white/[0.08] transition-all duration-300 resize-none"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <label className="block text-text-secondary text-sm font-medium mb-2">چگونه ما را پیدا کردید؟</label>
                    <input
                      type="text"
                      placeholder="گوگل، اینستاگرام، معرفی دوست، ..."
                      value={form.referral}
                      onChange={(e) => setForm((f) => ({ ...f, referral: e.target.value }))}
                      className="w-full bg-white/[0.05] border border-white/[0.10] rounded-xl px-4 py-3 text-white placeholder:text-text-muted outline-none focus:border-accent/40 focus:bg-white/[0.08] transition-all duration-300"
                      dir="rtl"
                    />
                  </div>

                  {/* Summary */}
                  <div className="glass-card p-5 rounded-xl bg-accent/5 border border-accent/20 space-y-2">
                    <div className="text-accent font-bold text-sm mb-3">خلاصه سفارش</div>
                    {form.projectType.length > 0 && <div className="text-text-secondary text-sm">خدمات: {form.projectType.join("، ")}</div>}
                    {form.budget && <div className="text-text-secondary text-sm">بودجه: {budgets.find(b => b.value === form.budget)?.label}</div>}
                    {form.timeline && <div className="text-text-secondary text-sm">زمان‌بندی: {timelines.find(t => t.value === form.timeline)?.label}</div>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/[0.06]">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 glass-card rounded-xl text-text-secondary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronRight size={16} />
                قبلی
              </motion.button>

              <span className="text-text-muted text-sm">{currentStep} از {steps.length}</span>

              {currentStep < steps.length ? (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                  className="btn-primary flex items-center gap-2"
                >
                  بعدی
                  <ChevronLeft size={16} />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center gap-2"
                >
                  <Zap size={16} />
                  ارسال سفارش
                </motion.button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
