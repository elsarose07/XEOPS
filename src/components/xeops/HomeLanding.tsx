"use client";

import Link from "next/link";
import { HERO_PILLARS } from "@/components/xeops/xeops-data";
import { useXeopsModals } from "@/components/xeops/XeopsContext";
import { HeroSculpture } from "@/components/xeops/HeroSculpture";
import { ProductShowcaseTablet } from "@/components/xeops/ProductShowcaseTablet";
import {
  AboutServicesSection,
  FaqSection,
  FinalCtaBanner,
  IntegrationsSection,
  PricingSection,
  TestimonialsSection,
} from "@/components/xeops/HomeSections";
import {
  IconArrowRight,
  IconBolt,
  IconGrid,
  IconPlay,
  IconShieldCheck,
  IconUsers,
} from "@/components/xeops/XeopsIcons";

const PILLAR_ICONS = {
  fast: IconBolt,
  custom: IconGrid,
  enterprise: IconShieldCheck,
  teams: IconUsers,
} as const;

export function HomeLanding() {
  const { openGetStarted, openDemo } = useXeopsModals();

  return (
    <div className="w-full">
      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pt-12 pb-16 sm:px-8 sm:pt-20 sm:pb-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-start lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#141717]/85 px-3.5 py-1.5 text-xs font-medium text-[#A3AAAA] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#20C6C2] shadow-[0_0_8px_#20C6C2]" />
              Introducing Xeops
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-[1.04] tracking-[-0.03em] text-[#F2F3F3] sm:text-6xl lg:text-[4.25rem]">
              Dream. Build.
              <br />
              <span className="xeops-gradient-teal">Innovate.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-[#A3AAAA] sm:text-[17px]">
              A next-generation platform to turn your ideas into reality, faster
              than ever.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => openGetStarted("pro")}
                className="xeops-btn-primary px-6 py-3 text-sm"
              >
                Get Started
                <IconArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={openDemo}
                className="xeops-btn-secondary px-6 py-3 text-sm"
              >
                <IconPlay className="h-3.5 w-3.5 text-[#A3AAAA]" />
                Watch Demo
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <HeroSculpture />
          </div>
        </div>

        {/* ── 4-Column Capability Strip ───────────────────────────────── */}
        <div
          aria-label="Core Capabilities"
          className="mt-14 overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#141717]/80 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.48)] sm:mt-18"
        >
          <div className="grid grid-cols-1 divide-y divide-white/[0.08] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {HERO_PILLARS.map((pillar) => {
              const Icon = PILLAR_ICONS[pillar.id];
              return (
                <div
                  key={pillar.id}
                  className="group flex flex-col items-center px-6 py-7 text-center transition-colors hover:bg-white/[0.02]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] text-[#A3AAAA] transition-colors group-hover:border-[#20C6C2]/30 group-hover:text-[#65D9D0]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h2 className="mt-4 text-sm font-semibold tracking-tight text-[#F2F3F3]">
                    {pillar.title}
                  </h2>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#737C7C]">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Powerful Features Showcase ──────────────────────────────── */}
      <section
        id="features"
        aria-labelledby="showcase-heading"
        className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24"
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#20C6C2]">
              Powerful Features
            </p>
            <h2
              id="showcase-heading"
              className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#F2F3F3] sm:text-4xl lg:text-[2.6rem]"
            >
              Everything you need to do{" "}
              <span className="xeops-gradient-teal">more.</span>
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#A3AAAA]">
              Powerful tools, intuitive design, and seamless collaboration — all
              in one place.
            </p>
            <div className="mt-7">
              <Link
                href="/features"
                className="xeops-btn-secondary px-6 py-3 text-sm"
              >
                Explore Features
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ProductShowcaseTablet />
          </div>
        </div>
      </section>

      {/* ── Additional Design System Sections ───────────────────────── */}
      <AboutServicesSection />
      <IntegrationsSection />
      <PricingSection compact />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaBanner />
    </div>
  );
}
