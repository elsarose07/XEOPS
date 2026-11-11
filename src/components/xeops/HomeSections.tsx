"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  FAQ_ITEMS,
  INTEGRATIONS,
  PRICING_TIERS,
  SERVICES_LIST,
  TESTIMONIALS,
} from "@/components/xeops/xeops-data";
import { useXeopsModals } from "@/components/xeops/XeopsContext";
import {
  IconArrowRight,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
} from "@/components/xeops/XeopsIcons";

/* ── About & Services Editorial Section (Non-dashboard composition) ─ */
export function AboutServicesSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
        {/* Editorial Thesis */}
        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#20C6C2]">
              <span className="h-px w-5 bg-[#20C6C2]/60" aria-hidden="true" />
              About Xeops
            </p>
            <h2
              id="about-heading"
              className="mt-4 text-3xl font-bold tracking-tight text-[#F2F3F3] sm:text-4xl"
            >
              Architecture built for teams that ship{" "}
              <span className="xeops-gradient-teal">without friction.</span>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[#A3AAAA]">
              Xeops replaces sprawling infrastructure glue with one coherent runtime. Every primitive — compute, routing, identity, and observability — is unified behind a calm interface designed for speed and clarity.
            </p>
            <div className="mt-7">
              <Link
                href="/about"
                className="xeops-btn-secondary px-5 py-2.5 text-[13px]"
              >
                Explore Our Vision
                <IconArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/[0.08] pt-7">
            <div>
              <p className="text-xl font-bold tracking-tight text-[#F2F3F3] sm:text-2xl">
                &lt; 12ms
              </p>
              <p className="mt-1 text-xs text-[#737C7C]">Edge decision time</p>
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight text-[#65D9D0] sm:text-2xl">
                99.99%
              </p>
              <p className="mt-1 text-xs text-[#737C7C]">Verified SLA uptime</p>
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight text-[#C49A58] sm:text-2xl">
                40+
              </p>
              <p className="mt-1 text-xs text-[#737C7C]">Global POP nodes</p>
            </div>
          </div>
        </div>

        {/* Core Services List (Editorial stacked rows rather than uniform boxes) */}
        <div className="lg:col-span-7">
          <div className="divide-y divide-white/[0.08] rounded-[22px] border border-white/[0.08] bg-[#101313]/75 px-6 sm:px-8">
            {SERVICES_LIST.map((service) => (
              <div
                key={service.code}
                className="group flex flex-col gap-3 py-7 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
              >
                <div className="flex items-start gap-5">
                  <span className="mt-1 font-mono text-xs tracking-[0.2em] text-[#737C7C] transition-colors group-hover:text-[#20C6C2]">
                    {service.code}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-[#F2F3F3]">
                      {service.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-[#A3AAAA]">
                      {service.description}
                    </p>
                  </div>
                </div>
                <span className="inline-flex w-fit shrink-0 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[11px] font-medium text-[#A3AAAA] transition-colors group-hover:border-[#20C6C2]/30 group-hover:text-[#65D9D0]">
                  {service.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Integrations Strip ──────────────────────────────────────────── */
export function IntegrationsSection() {
  return (
    <section
      id="integrations"
      aria-labelledby="integrations-heading"
      className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#20C6C2]">
            <span className="h-px w-5 bg-[#20C6C2]/60" aria-hidden="true" />
            Integrations
          </p>
          <h2
            id="integrations-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-[#F2F3F3] sm:text-4xl"
          >
            Connects effortlessly with your stack.
          </h2>
        </div>

        <Link
          href="/features#integrations"
          className="text-sm font-medium text-[#A3AAAA] transition-colors hover:text-[#65D9D0]"
        >
          View full ecosystem →
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {INTEGRATIONS.map((item) => (
          <div
            key={item.name}
            className="xeops-card xeops-card-interactive flex flex-col justify-between gap-4 p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-[#F2F3F3]">
                {item.name}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#20C6C2]">
                {item.latency}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#A3AAAA]">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Pricing Section (Reusable across /home and /pricing) ────────── */
export function PricingSection({ compact = false }: { compact?: boolean }) {
  const [annual, setAnnual] = useState(true);
  const { openGetStarted } = useXeopsModals();

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#20C6C2]">
            <span className="h-px w-5 bg-[#20C6C2]/60" aria-hidden="true" />
            Transparent Pricing
          </p>
          <h2
            id="pricing-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-[#F2F3F3] sm:text-4xl"
          >
            Start simple. Scale globally.
          </h2>
          {!compact ? (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#A3AAAA]">
              Predictable tiering built for independent prototypes and high-throughput enterprise workloads alike.
            </p>
          ) : null}
        </div>

        {/* Billing Cycle Toggle */}
        <div
          role="group"
          aria-label="Billing interval"
          className="inline-flex items-center rounded-full border border-white/[0.08] bg-[#101313] p-1"
        >
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              !annual
                ? "bg-[#202424] text-[#F2F3F3]"
                : "text-[#737C7C] hover:text-[#A3AAAA]"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              annual
                ? "bg-[#202424] text-[#F2F3F3]"
                : "text-[#737C7C] hover:text-[#A3AAAA]"
            }`}
          >
            <span>Annual</span>
            <span className="text-[10px] font-semibold text-[#65D9D0]">-20%</span>
          </button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {PRICING_TIERS.map((tier) => {
          const isPro = Boolean(tier.highlighted);
          const isEnterprise = tier.id === "enterprise";
          const price = annual ? tier.annualPrice : tier.monthlyPrice;

          return (
            <div
              key={tier.id}
              className={`relative flex flex-col justify-between rounded-[22px] border p-7 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 ${
                isPro
                  ? "border-[#20C6C2]/35 bg-gradient-to-b from-[#172222]/90 via-[#141717]/95 to-[#121515]/95 shadow-[0_24px_70px_rgba(0,0,0,0.6),0_0_40px_rgba(32,198,194,0.08)]"
                  : "border-white/[0.08] bg-[#141717]/90 shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-[#F2F3F3]">
                    {tier.name}
                  </h3>
                  {tier.badge ? (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        isEnterprise
                          ? "border border-[#C49A58]/30 bg-[#C49A58]/10 text-[#C49A58]"
                          : "border border-[#20C6C2]/35 bg-[#20C6C2]/15 text-[#65D9D0]"
                      }`}
                    >
                      {tier.badge}
                    </span>
                  ) : null}
                </div>

                <p className="mt-2 text-xs leading-relaxed text-[#A3AAAA]">
                  {tier.tagline}
                </p>

                <div className="mt-6 flex items-baseline gap-1.5 border-b border-white/[0.07] pb-6">
                  <span className="text-4xl font-bold tracking-tight text-[#F2F3F3]">
                    {price}
                  </span>
                  <span className="text-xs text-[#737C7C]">{tier.unit}</span>
                </div>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2.5 text-sm text-[#A3AAAA]"
                    >
                      <IconCheck
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          isPro ? "text-[#20C6C2]" : "text-[#65D9D0]/75"
                        }`}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => openGetStarted(tier.id)}
                  className={
                    isPro
                      ? "xeops-btn-primary w-full px-5 py-3 text-sm"
                      : "xeops-btn-secondary w-full px-5 py-3 text-sm"
                  }
                >
                  {tier.ctaLabel}
                  <IconArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Testimonials Carousel (Matches Mockup Exact Layout) ─────────── */
export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const current = TESTIMONIALS[index] ?? TESTIMONIALS[0];

  const handlePrev = () =>
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const handleNext = () =>
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Left Copy */}
        <div className="lg:col-span-5">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#20C6C2]">
            <span className="h-px w-6 bg-[#20C6C2]/65" aria-hidden="true" />
            Trusted by Thousands
          </p>
          <h2
            id="testimonials-heading"
            className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#F2F3F3] sm:text-4xl"
          >
            Loved by creators, businesses and teams.
          </h2>
        </div>

        {/* Right Carousel Card + Arrows */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-4">
            <div className="xeops-card flex-1 p-6 sm:p-7">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-start gap-5 sm:flex-row sm:items-center"
                >
                  {/* Stylised clean portrait badge */}
                  <div
                    aria-hidden="true"
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border text-sm font-semibold tracking-wider text-[#F2F3F3] ${
                      current.accentHue === "amber"
                        ? "border-[#C49A58]/40 bg-gradient-to-br from-[#2B2318] to-[#131515]"
                        : current.accentHue === "teal"
                        ? "border-[#20C6C2]/40 bg-gradient-to-br from-[#162828] to-[#121515]"
                        : "border-white/20 bg-gradient-to-br from-[#202424] to-[#121515]"
                    }`}
                  >
                    {current.initials}
                  </div>

                  <div>
                    <blockquote className="text-[15px] leading-relaxed text-[#F2F3F3]">
                      {current.quote}
                    </blockquote>
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-[#F2F3F3]">
                        {current.author}
                      </p>
                      <p className="text-[11px] text-[#737C7C]">
                        {current.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop Controls Right Side */}
            <div className="hidden flex-col items-center gap-3 sm:flex">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-[#141717] text-[#A3AAAA] transition-colors hover:border-white/25 hover:text-[#F2F3F3]"
                >
                  <IconChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-[#141717] text-[#A3AAAA] transition-colors hover:border-white/25 hover:text-[#F2F3F3]"
                >
                  <IconChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Controls + Shared Pagination Dots */}
          <div className="mt-4 flex items-center justify-between sm:justify-end">
            <div className="flex items-center gap-2 sm:hidden">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-[#141717] text-[#A3AAAA]"
              >
                <IconChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-[#141717] text-[#A3AAAA]"
              >
                <IconChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-1.5" role="tablist" aria-label="Testimonial slides">
              {TESTIMONIALS.map((item, i) => {
                const active = i === index;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`View quote from ${item.author}`}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      active
                        ? "w-5 bg-[#20C6C2]"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Minimal FAQ Accordion ───────────────────────────────────────── */
export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#20C6C2]">
          FAQ
        </p>
        <h2
          id="faq-heading"
          className="mt-3 text-3xl font-bold tracking-tight text-[#F2F3F3] sm:text-4xl"
        >
          Common questions, direct answers.
        </h2>
      </div>

      <div className="mt-10 space-y-3">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="rounded-2xl border border-white/[0.08] bg-[#141717]/80 transition-colors hover:border-white/[0.14]"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-sm font-medium text-[#F2F3F3] sm:text-[15px]">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.08] text-[#A3AAAA] transition-transform duration-200 ${
                    isOpen ? "rotate-45 border-[#20C6C2]/40 text-[#65D9D0]" : ""
                  }`}
                >
                  <IconPlus className="h-3.5 w-3.5" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="border-t border-white/[0.06] px-6 pt-4 pb-5 text-sm leading-relaxed text-[#A3AAAA]">
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Final Call-to-Action Card (Matches Mockup Warm Amber Sweep) ─── */
export function FinalCtaBanner() {
  const { openGetStarted } = useXeopsModals();

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="mx-auto max-w-6xl px-5 pt-8 pb-24 sm:px-8 sm:pb-28"
    >
      <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#121515]/95 px-7 py-10 shadow-[0_28px_80px_rgba(0,0,0,0.65)] sm:px-12 sm:py-12">
        {/* Flowing warm muted amber sculptural light sweep behind right half */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -bottom-16 h-64 w-96 rounded-full bg-[#C49A58]/18 blur-[65px]"
        />
        <svg
          viewBox="0 0 600 220"
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-full w-auto opacity-85"
          preserveAspectRatio="xMaxYMid slice"
        >
          <defs>
            <linearGradient id="xeopsAmberWave" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#171A1A" stopOpacity="0" />
              <stop offset="55%" stopColor="#2A2319" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#C49A58" stopOpacity="0.28" />
            </linearGradient>
          </defs>
          <path
            d="M170,220 C240,125 360,42 540,18 L600,18 L600,220 Z"
            fill="url(#xeopsAmberWave)"
          />
          <path
            d="M270,220 C330,145 435,95 600,82"
            fill="none"
            stroke="rgba(196, 154, 88, 0.28)"
            strokeWidth="1.2"
          />
        </svg>

        <div className="relative z-10 flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div>
            <h2
              id="final-cta-heading"
              className="text-2xl font-bold tracking-tight text-[#F2F3F3] sm:text-3xl"
            >
              Ready to get started?
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#A3AAAA]">
              Join a growing community of innovators and start building today.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openGetStarted("starter")}
            className="xeops-btn-primary shrink-0 px-7 py-3 text-sm"
          >
            Get Started Free
            <IconArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
