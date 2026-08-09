"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

function CursorGlow() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    const interactables = document.querySelectorAll("a, button, [data-cursor]");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    document.addEventListener("mousemove", moveCursor);

    const animate = () => {
      curX += (mouseX - curX) * 0.15;
      curY += (mouseY - curY) * 0.15;
      cursor.style.left = curX + "px";
      cursor.style.top = curY + "px";
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor hidden md:block ${isHovering ? "expanded" : ""}`}
    />
  );
}

function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    try {
      navigator.sendBeacon?.(
        "/api/analytics/track",
        JSON.stringify({
          event: "pageview",
          path: pathname,
          referrer: document.referrer,
          sessionId: localStorage.getItem("hps_chat_session") ?? undefined,
        })
      );
    } catch {}
  }, [pathname]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <CursorGlow />
      <AnalyticsTracker />
      {children}
    </SmoothScrollProvider>
  );
}
