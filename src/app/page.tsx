export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "حافظ پرداز سپهر | طراحی سایت، شبکه، سرور و خدمات IT در تهران",
  description:
    "حافظ پرداز سپهر – شرکت تخصصی IT در ستارخان تهران. طراحی سایت سفارشی، سئو، تولید محتوا، راه‌اندازی شبکه، سرور، امنیت و نمایندگی اینترنت اسیاتک.",
};

export default async function HomePage() {
  const [dbServices, dbPortfolio] = await Promise.all([
    prisma.service.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: { id: true, title: true, description: true, icon: true, active: true },
    }),
    prisma.portfolio.findMany({
      where: { published: true, featured: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 4,
    }),
  ]);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesPreview dbServices={dbServices.length > 0 ? dbServices : undefined} />
      <PortfolioPreview dbPortfolio={dbPortfolio.length > 0 ? dbPortfolio : undefined} />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
