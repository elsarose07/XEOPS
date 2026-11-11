"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  LOGO_SPOKE_BOTTOM_LEFT,
  LOGO_SPOKE_TOP_RIGHT,
  XEOPS_WORDMARK,
} from "@/components/brand/xeops-paths";

const PLACEHOLDER_MODULES = [
  {
    slot: "01",
    label: "HERO CANVAS",
    note: "Primary visual thesis and headline placement.",
  },
  {
    slot: "02",
    label: "INTELLIGENT CORE",
    note: "Interactive showcase and capability modules.",
  },
  {
    slot: "03",
    label: "NEXT ACTION",
    note: "Contact, inquiry, or smart onboarding flow.",
  },
] as const;

export function HomePlaceholder() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-dvh w-full bg-black text-white flex flex-col"
    >
      {/* Minimal Header */}
      <header className="w-full border-b border-white/10 px-6 py-5 sm:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <svg
              viewBox="137 157 685 322"
              className="h-5 w-auto"
              aria-hidden="true"
            >
              <path d={LOGO_SPOKE_BOTTOM_LEFT.d} fill="#FFFFFF" />
              <path d={LOGO_SPOKE_TOP_RIGHT.d} fill="#FFFFFF" />
            </svg>
            <span className="font-mono text-xs tracking-[0.28em] text-white/85 uppercase">
              XEOPS
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="hidden font-mono text-[11px] tracking-[0.22em] text-white/40 uppercase sm:inline">
              /home · Placeholder
            </span>
            <Link
              href="/"
              className="rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.2em] text-white/80 uppercase transition-colors hover:border-white/50 hover:text-white"
            >
              Replay Intro
            </Link>
          </div>
        </div>
      </header>

      {/* Placeholder Main Stage */}
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between px-6 py-16 sm:px-10 sm:py-24">
        <section className="flex flex-col items-start gap-6">
          <p className="font-mono text-[11px] tracking-[0.28em] text-white/45 uppercase">
            XEOPS // Home Stage
          </p>

          <svg
            viewBox={XEOPS_WORDMARK.viewBox}
            className="w-[min(70vw,360px)] h-auto"
            role="img"
            aria-label="XEOPS"
          >
            {XEOPS_WORDMARK.glyphs.map((glyph) => (
              <path
                key={glyph.id}
                d={glyph.d}
                fill="#FFFFFF"
                fillRule="evenodd"
              />
            ))}
          </svg>

          <h1 className="max-w-xl text-2xl font-light tracking-tight text-white/90 sm:text-3xl">
            Placeholder homepage ready for the next visual section.
          </h1>
          <p className="max-w-lg text-sm leading-relaxed text-white/50">
            The opening sequence dissolved cleanly into <code className="font-mono text-white/75">/home</code>.
            Replace these wireframe slots step by step as we design each section of the XEOPS site.
          </p>
        </section>

        {/* Placeholder Section Grid */}
        <section
          aria-label="Upcoming sections"
          className="mt-16 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 md:grid-cols-3"
        >
          {PLACEHOLDER_MODULES.map((item) => (
            <div
              key={item.slot}
              className="flex flex-col justify-between gap-8 border border-white/10 bg-white/[0.02] p-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.24em] text-white/40">
                  {item.slot}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
              </div>
              <div className="space-y-2">
                <h2 className="font-mono text-xs tracking-[0.22em] text-white/85 uppercase">
                  {item.label}
                </h2>
                <p className="text-sm text-white/45">{item.note}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </motion.div>
  );
}
