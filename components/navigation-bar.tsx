"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ActiveTab } from "../types/portfolio";
import { ArrowLeftIcon } from "./ui/icons";
import { SocialLinks } from "./ui/social-links";

const NAV_ITEMS: { id: ActiveTab; label: string; href: string }[] = [
  { id: "about", label: "About", href: "/about" },
  { id: "experience", label: "Experience", href: "/experience" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export const NavigationBar = () => {
  const pathname = usePathname();
  // Extract the first segment from pathname (e.g. "/about" -> "about")
  const activeTabId = pathname.replace("/", "") as ActiveTab;

  const navRef = useRef<HTMLElement>(null);
  const [pillStyle, setPillStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  useEffect(() => {
    if (!navRef.current) return;

    const activeEl = navRef.current.querySelector(
      `[data-tab-id="${activeTabId}"]`,
    ) as HTMLElement;
    if (activeEl) {
      setPillStyle({
        left: activeEl.offsetLeft,
        top: activeEl.offsetTop,
        width: activeEl.offsetWidth,
        height: activeEl.offsetHeight,
        opacity: 1,
      });
    }
  }, [activeTabId]);

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-8 py-4 bg-[#0d0d11]/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Back to Home Button */}
        <Link
          href="/"
          aria-label="Kembali ke tampilan Cover Home"
          className="group flex items-center gap-2 text-xs md:text-sm font-mono uppercase tracking-widest text-neutral-300 hover:text-white transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-white rounded-lg px-2.5 py-1.5"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">
            <ArrowLeftIcon size={14} />
          </span>
          <span>HOME</span>
        </Link>

        {/* Center Pill Segmented Nav */}
        <nav
          ref={navRef}
          aria-label="Navigasi Halaman Portofolio"
          className="relative flex items-center rounded-full bg-[#18181c]/90 border border-white/10 p-1 shadow-xl shadow-black/50"
        >
          {/* Sliding active pill indicator */}
          <span
            className="absolute rounded-full bg-white shadow-md shadow-white/10 transition-all pointer-events-none"
            style={{
              left: pillStyle.left,
              top: pillStyle.top,
              width: pillStyle.width,
              height: pillStyle.height,
              opacity: pillStyle.opacity,
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
              transitionDuration: "500ms",
            }}
            aria-hidden="true"
          />

          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activeTabId;

            return (
              <Link
                key={item.id}
                href={item.href}
                data-tab-id={item.id}
                aria-label={`Lihat bagian ${item.label}`}
                aria-current={isActive ? "page" : undefined}
                className={`relative z-10 flex items-center gap-1.5 rounded-full px-3.5 sm:px-5 py-1.5 text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-white ${
                  isActive
                    ? "text-neutral-900"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Social Links */}
        <div className="hidden md:block">
          <SocialLinks itemClassName="text-neutral-400 hover:text-white transition-colors flex items-center gap-1 text-xs md:text-sm font-normal group" />
        </div>
      </div>
    </header>
  );
};
