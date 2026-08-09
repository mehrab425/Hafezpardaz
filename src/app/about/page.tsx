"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { FinalCTA } from "@/components/home/FinalCTA";
import { teamMembers, technologies, stats } from "@/data";
import { Target, Eye, Heart, Award, Zap } from "lucide-react";

const timeline = [
  { year: "۱۳۹۹", title: "تأسیس شرکت", desc: "آغاز فعالیت در ستارخان تهران با تیم متخصص" },
  { year: "۱۴۰۰", title: "اولین پروژه‌های بزرگ", desc: "طراحی سایت برای مشتریان متنوع" },
  { year: "۱۴۰۱", title: "گسترش خدمات", desc: "افزودن خدمات شبکه، سرور و تعمیرات" },
  { year: "۱۴۰۲", title: "نمایندگی اسیاتک", desc: "اخذ نمایندگی رسمی اینترنت اسیاتک" },
  { year: "۱۴۰۳", title: "۱۰۰+ پروژه موفق", desc: "تحویل بیش از صد پروژه با رضایت مشتریان" },
  { year: "۱۴۰۴", title: "۱۶۰ پروژه موفق", desc: "رشد مستمر با تیم ۱۰ نفره متخصص" },
];

const whyUs = [
  { icon: Target, title: "تیم متخصص با مدارک معتبر", desc: "اعضای تیم ما دارای گواهینامه‌های فنی معتبر هستند. کار شما به دست افراد آموزش‌دیده و باتجربه سپرده می‌شود." },
  { icon: Heart, title: "خدمات یکپارچه زیر یک سقف", desc: "از طراحی سایت و تولید محتوا تا شبکه، سرور و پشتیبانی — همه نیازهای IT با یک تیم واحد." },
  { icon: Award, title: "کیفیت تضمین‌شده و پشتیبانی واقعی", desc: "ضمانت کیفیت پس از تحویل. رابطه ما با مشتری به پایان پروژه ختم نمی‌شود." },
  { icon: Zap, title: "شفافیت و قیمت منصفانه", desc: "بدون هزینه‌های پنهان. قبل از شروع، دقیقاً مشخص می‌کنیم چه خدماتی با چه هزینه‌ای ارائه می‌شود." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-hero-gradient pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-tag mb-6 inline-flex">درباره ما</span>
              <h1 className="heading-xl text-white mb-6">
                خدمات یکپارچه IT{" "}
                <span className="accent-gradient-text">زیر یک سقف</span>
              </h1>
              <p className="text-text-secondary text-xl leading-9">
                شرکت حافظ پرداز، مستقر در ستارخان تهران، یک مجموعه تخصصی در حوزه فناوری اطلاعات است که با هدف ارائه خدمات یکپارچه دیجیتال به کسب‌وکارها فعالیت می‌کند. ما با تکیه بر تیمی از متخصصان مجرب و دارای مدارک معتبر فنی، طیف کاملی از خدمات شامل طراحی و توسعه وب‌سایت، تولید محتوا، نصب و راه‌اندازی شبکه و سرور، اسمبل و تعمیرات سخت‌افزار، و نمایندگی رسمی اینترنت اسیاتک را زیر یک سقف ارائه می‌دهیم.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((s, i) => (
                <div key={i} className="glass-card p-6 text-center">
                  <div className="text-4xl font-black text-accent mb-1">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-text-secondary text-sm">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-8 translate-x-8" />
              <Target size={32} className="text-accent mb-4" />
              <h2 className="text-white font-black text-2xl mb-4">ماموریت ما</h2>
              <p className="text-text-secondary leading-8">
                ارائه خدمات یکپارچه فناوری اطلاعات با کیفیت تضمین‌شده و قیمت منصفانه. هدف ما این است که مشتریان برای تمام نیازهای IT خود — از طراحی سایت تا شبکه و سرور — تنها به یک تیم متخصص اعتماد کنند.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-8 translate-x-8" />
              <Eye size={32} className="text-accent mb-4" />
              <h2 className="text-white font-black text-2xl mb-4">چشم‌انداز ما</h2>
              <p className="text-text-secondary leading-8">
                شناخته‌شدن به‌عنوان معتمدترین شرکت خدمات IT در ستارخان تهران؛ جایی که کسب‌وکارها برای تمام نیازهای دیجیتال خود یک مرجع واحد دارند و با اطمینان کامل به ما تکیه می‌کنند.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader tag="تاریخچه" title="سفر ما به" titleHighlight="امروز" />
          <div className="mt-16 relative">
            <div className="absolute right-[calc(50%-1px)] top-0 bottom-0 w-0.5 bg-white/[0.06] hidden md:block" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "text-left" : "text-right"}`}>
                    <div className="glass-card p-6 inline-block max-w-sm">
                      <div className="text-accent text-sm font-bold mb-1">{item.year}</div>
                      <div className="text-white font-bold text-lg mb-1">{item.title}</div>
                      <div className="text-text-secondary text-sm">{item.desc}</div>
                    </div>
                  </div>
                  <div className="relative z-10 hidden md:block">
                    <div className="w-4 h-4 rounded-full bg-accent border-4 border-background shadow-glow-sm" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader tag="تیم ما" title="افرادی که" titleHighlight="پشت صحنه‌اند" />
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card p-6 text-center group hover:border-white/15 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent/30 flex items-center justify-center text-accent font-black text-2xl mx-auto mb-4 group-hover:border-accent/60 transition-all duration-300">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-white font-bold mb-1">{member.name}</h3>
                <div className="text-accent text-xs font-semibold mb-3">{member.role}</div>
                <p className="text-text-secondary text-sm leading-6 mb-4">{member.bio}</p>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {member.skills.map((skill) => (
                    <span key={skill} className="text-[10px] text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader tag="چرا ما؟" title="چه چیزی ما را" titleHighlight="متفاوت می‌کند" />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card p-8 flex gap-6 group hover:border-accent/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/15 transition-all duration-300">
                  <item.icon size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-7">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-background-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader tag="تکنولوژی‌ها" title="ابزارهای" titleHighlight="ما" centered />
        </div>
        <div className="mt-12 relative">
          <div className="flex gap-4 animate-ticker w-max">
            {[...technologies, ...technologies].map((tech, i) => (
              <span
                key={i}
                className="glass-card px-5 py-2.5 text-sm text-text-secondary font-medium whitespace-nowrap hover:text-accent hover:border-accent/30 transition-all duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
