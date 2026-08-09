import type { Metadata } from "next";
import { AdminSessionProvider } from "@/components/admin/AdminSessionProvider";

export const metadata: Metadata = {
  title: { default: "پنل مدیریت", template: "%s | پنل مدیریت" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminSessionProvider>
      <div className="min-h-screen bg-[#0f0f0f] text-white font-vazir">
        {children}
      </div>
    </AdminSessionProvider>
  );
}
