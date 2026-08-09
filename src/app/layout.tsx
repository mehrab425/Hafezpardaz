import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ClientLayoutShell } from "@/components/layout/ClientLayoutShell";

export const metadata: Metadata = {
  title: {
    default: "حافظ پرداز سپهر | طراحی سایت حرفه‌ای و خدمات دیجیتال",
    template: "%s | حافظ پرداز سپهر",
  },
  description:
    "آژانس دیجیتال حافظ پرداز سپهر با ۱۴ سال تجربه در طراحی سایت، فروشگاه اینترنتی، UI/UX، سئو، مدیریت سرور و خدمات کامل دیجیتال‌سازی کسب‌وکار.",
  keywords: [
    "طراحی سایت",
    "طراحی وب",
    "طراحی فروشگاه اینترنتی",
    "سئو",
    "UI/UX",
    "مدیریت سرور",
    "حافظ پرداز سپهر",
  ],
  authors: [{ name: "حافظ پرداز سپهر" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    title: "حافظ پرداز سپهر | طراحی سایت حرفه‌ای",
    description: "آژانس دیجیتال پیشرو در ایران",
    siteName: "حافظ پرداز سپهر",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-text-primary font-vazir antialiased overflow-x-hidden">
        <Providers>
          <ClientLayoutShell>{children}</ClientLayoutShell>
        </Providers>
      </body>
    </html>
  );
}
