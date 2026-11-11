"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { NAV_LINKS } from "@/components/xeops/xeops-data";
import { useXeopsModals } from "@/components/xeops/XeopsContext";
import {
  IconArrowRight,
  IconClose,
  IconMenu,
  XeopsMark,
} from "@/components/xeops/XeopsIcons";

function isNavLinkActive(pathname: string, href: string): boolean {
  return (
    pathname === href ||
    (href !== "/home" && pathname.startsWith(href)) ||
    (href === "/product" && pathname.startsWith("/features"))
  );
}

export function XeopsHeader() {
  const pathname = usePathname();
  const { openGetStarted } = useXeopsModals();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-[#090B0B]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Brand Logo */}
        <Link
          href="/home"
          className="flex items-center gap-2.5 text-[#F2F3F3] transition-opacity hover:opacity-90"
          aria-label="Xeops Home"
        >
          <XeopsMark className="h-5 w-auto" />
          <span className="text-[17px] font-semibold tracking-tight text-[#F2F3F3]">
            Xeops
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((item) => {
            const isActive = isNavLinkActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative py-2 text-[13px] font-medium transition-colors ${
                  isActive
                    ? "text-[#F2F3F3]"
                    : "text-[#A3AAAA] hover:text-[#F2F3F3]"
                }`}
              >
                {item.label}
                {isActive ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[#65D9D0] to-[#20C6C2] shadow-[0_0_10px_rgba(32,198,194,0.65)]"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => openGetStarted("pro")}
            className="xeops-btn-primary hidden px-5 py-2 text-[13px] sm:inline-flex"
          >
            Get Started
            <IconArrowRight className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] text-[#F2F3F3] transition-colors hover:border-white/25 md:hidden"
          >
            {mobileOpen ? (
              <IconClose className="h-5 w-5" />
            ) : (
              <IconMenu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/[0.07] bg-[#101313]/95 backdrop-blur-2xl md:hidden"
          >
            <nav
              aria-label="Mobile Navigation"
              className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-5"
            >
              {NAV_LINKS.map((item) => {
                const isActive = isNavLinkActive(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#20C6C2]/10 text-[#F2F3F3]"
                        : "text-[#A3AAAA] hover:bg-white/[0.04] hover:text-[#F2F3F3]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#20C6C2]" />
                    ) : null}
                  </Link>
                );
              })}

              <div className="mt-3 flex flex-col gap-2.5 border-t border-white/[0.07] pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openGetStarted("pro");
                  }}
                  className="xeops-btn-primary w-full px-5 py-2.5 text-sm"
                >
                  Get Started
                  <IconArrowRight className="h-4 w-4" />
                </button>
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="xeops-btn-secondary w-full px-5 py-2.5 text-xs text-[#A3AAAA]"
                >
                  Replay Intro Animation
                </Link>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
