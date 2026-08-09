"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Zap } from "lucide-react";
import { HpsLogo } from "@/components/shared/HpsLogo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "خانه" },
  {
    href: "/services",
    label: "خدمات",
    children: [
      { href: "/services#web-design", label: "طراحی سایت و اپ" },
      { href: "/services#seo", label: "سئو و محتوا" },
      { href: "/services#network", label: "شبکه" },
      { href: "/services#server", label: "سرور" },
      { href: "/services#security", label: "امنیت" },
      { href: "/services#internet", label: "اینترنت اسیاتک" },
    ],
  },
  { href: "/portfolio", label: "نمونه‌کارها" },
  { href: "/order", label: "سفارش پروژه" },
  { href: "/blog", label: "بلاگ" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-background/95 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_40px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* CTA Button (left in RTL = end) */}
            <Link href="/order">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary hidden md:flex items-center gap-2 text-sm"
              >
                <Zap size={16} />
                ثبت سفارش
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <div ref={dropdownRef} className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.href} className="relative">
                  {link.children ? (
                    <button
                      onMouseEnter={() => setActiveDropdown(link.href)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        pathname.startsWith(link.href) && link.href !== "/"
                          ? "text-accent bg-accent/10"
                          : "text-text-secondary hover:text-white hover:bg-white/[0.06]"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-200",
                          activeDropdown === link.href ? "rotate-180" : ""
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        pathname === link.href ||
                          (link.href !== "/" && pathname.startsWith(link.href))
                          ? "text-accent bg-accent/10"
                          : "text-text-secondary hover:text-white hover:bg-white/[0.06]"
                      )}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {link.children && (
                    <AnimatePresence>
                      {activeDropdown === link.href && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          onMouseEnter={() => setActiveDropdown(link.href)}
                          onMouseLeave={() => setActiveDropdown(null)}
                          className="absolute top-full right-0 mt-2 w-48 glass-card p-2 shadow-glass"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm text-text-secondary hover:text-white hover:bg-white/[0.06] rounded-lg transition-all duration-200"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex flex-col leading-none">
                <span className="text-base font-black text-white tracking-tight group-hover:text-accent transition-colors duration-300">
                  حافظ پرداز
                </span>
                <span className="text-[11px] text-accent font-medium tracking-wider">
                  سپهر
                </span>
              </div>
              <HpsLogo className="h-14 w-auto text-white group-hover:text-accent transition-colors duration-300" />
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center glass-card rounded-xl"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={18} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-2xl"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative h-full flex flex-col pt-24 pb-8 px-6 overflow-y-auto">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block py-4 text-xl font-semibold border-b border-white/[0.06] transition-colors duration-200",
                        pathname === link.href ? "text-accent" : "text-white hover:text-accent"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <Link href="/order" onClick={() => setMobileOpen(false)}>
                  <div className="btn-primary w-full text-center text-base">
                    ثبت سفارش پروژه
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
