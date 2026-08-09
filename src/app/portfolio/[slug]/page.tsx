import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { portfolioProjects } from "@/data";
import { FinalCTA } from "@/components/home/FinalCTA";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);
  if (!project) {
    notFound();
    return null;
  }

  const related = portfolioProjects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-text-muted text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">خانه</Link>
            <span>/</span>
            <Link href="/portfolio" className="hover:text-white transition-colors">نمونه‌کارها</Link>
            <span>/</span>
            <span className="text-white">{project.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-tag mb-6 inline-block">{project.category}</span>
              <h1 className="heading-lg text-white mb-6">{project.title}</h1>
              <p className="text-text-secondary text-lg leading-8 mb-8">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech) => (
                  <span key={tech} className="text-sm text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-lg font-medium">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <Link href="/order">
                  <div className="btn-primary flex items-center gap-2">
                    سفارش مشابه
                    <ExternalLink size={16} />
                  </div>
                </Link>
              </div>
            </div>

            {/* Project visual */}
            <div className="glass-card p-8 relative overflow-hidden min-h-[300px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
              <div className="absolute inset-0 grid-bg opacity-40" />
              <span className="relative text-[120px] font-black text-white/10 select-none">{project.title.charAt(0)}</span>
              <div className="absolute top-4 right-4">
                <span className="bg-accent/20 text-accent text-xs font-bold px-3 py-1 rounded-full border border-accent/30">
                  {project.year}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="heading-md text-white mb-12 text-center">نتایج پروژه</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.results.map((r, i) => (
              <div key={i} className="glass-card p-8 text-center">
                <div className="text-5xl font-black text-accent mb-3">{r.value}</div>
                <div className="text-text-secondary font-medium">{r.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-12">
            <div>
              <h2 className="heading-md text-white mb-6">درباره پروژه</h2>
              <p className="text-text-secondary text-lg leading-9">{project.description}</p>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-white font-bold text-xl mb-6">مشخصات پروژه</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-text-muted text-xs uppercase tracking-wider mb-2">کارفرما</div>
                  <div className="text-white font-medium">{project.client}</div>
                </div>
                <div>
                  <div className="text-text-muted text-xs uppercase tracking-wider mb-2">سال</div>
                  <div className="text-white font-medium">{project.year}</div>
                </div>
                <div>
                  <div className="text-text-muted text-xs uppercase tracking-wider mb-2">دسته‌بندی</div>
                  <div className="text-white font-medium">{project.category}</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold text-xl mb-6">تکنولوژی‌های استفاده‌شده</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <div key={tech} className="glass-card px-4 py-2 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-accent" />
                    <span className="text-white text-sm font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="heading-md text-white">پروژه‌های مشابه</h2>
            <Link href="/portfolio" className="btn-secondary flex items-center gap-2 text-sm">
              <ArrowRight size={14} />
              همه پروژه‌ها
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link key={p.id} href={`/portfolio/${p.slug}`}>
                <div className="glass-card p-6 hover:border-white/15 transition-all duration-300 hover:-translate-y-1">
                  <div className="h-32 bg-gradient-to-br from-accent/10 to-background rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-4xl font-black text-white/20">{p.title.charAt(0)}</span>
                  </div>
                  <span className="text-accent text-xs font-bold">{p.category}</span>
                  <h4 className="text-white font-bold mt-1 line-clamp-2">{p.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
