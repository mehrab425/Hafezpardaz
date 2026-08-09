import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="relative text-center px-6">
        <div className="text-[120px] font-black text-white/5 leading-none select-none mb-4">۴۰۴</div>
        <h1 className="text-4xl font-black text-white mb-4">صفحه پیدا نشد</h1>
        <p className="text-text-secondary text-lg mb-8">
          صفحه‌ای که به دنبالش بودید وجود ندارد یا جابجا شده است.
        </p>
        <Link href="/" className="btn-primary inline-flex items-center gap-2">
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );
}
