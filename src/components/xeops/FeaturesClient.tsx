"use client";

import { useState } from "react";
import { HERO_PILLARS, INTEGRATIONS } from "@/components/xeops/xeops-data";
import { useXeopsModals } from "@/components/xeops/XeopsContext";
import { ProductShowcaseTablet } from "@/components/xeops/ProductShowcaseTablet";
import { FinalCtaBanner } from "@/components/xeops/HomeSections";
import {
  IconArrowRight,
  IconBolt,
  IconGrid,
  IconPlay,
  IconShieldCheck,
  IconUsers,
} from "@/components/xeops/XeopsIcons";

const CAPABILITY_DETAILS = [
  {
    id: "fast",
    title: HERO_PILLARS[0].title,
    detail:
      "Compiled edge routing and warm snapshot isolation trim cold starts to under 12 milliseconds worldwide.",
    Icon: IconBolt,
  },
  {
    id: "custom",
    title: HERO_PILLARS[1].title,
    detail:
      "Compose custom build graphs, webhook hooks, and environment policies using declarative manifests.",
    Icon: IconGrid,
  },
  {
    id: "enterprise",
    title: HERO_PILLARS[2].title,
    detail:
      "Enforce zero-trust mutual TLS, short-lived cryptographic credentials, and immutable audit streams.",
    Icon: IconShieldCheck,
  },
  {
    id: "teams",
    title: HERO_PILLARS[3].title,
    detail:
      "Ephemeral preview environments, inline deployment diffs, and role-scoped approvals keep squads aligned.",
    Icon: IconUsers,
  },
] as const;

const CATEGORIES = [
  "All",
  "Infrastructure",
  "DevTools",
  "Observability",
  "Identity",
] as const;

export function FeaturesClient() {
  const { openGetStarted, openDemo } = useXeopsModals();
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORIES)[number]>("All");

  const filteredIntegrations =
    selectedCategory === "All"
      ? INTEGRATIONS
      : INTEGRATIONS.filter((item) => item.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:px-8 sm:pt-24">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#20C6C2]">
            Platform Capabilities
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#F2F3F3] sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            Everything you need to ship{" "}
            <span className="xeops-gradient-teal">with clarity.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#A3AAAA]">
            Explore the interactive workspace surface, architectural guarantees, and native integrations powering modern Xeops deployments.
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
              Interactive Tour
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Tablet Stage */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-10 rounded-[24px] border border-white/[0.08] bg-[#101313]/70 p-6 sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#20C6C2]/30 bg-[#20C6C2]/10 px-3 py-1 text-[11px] font-medium text-[#65D9D0]">
              Interactive Surface
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#F2F3F3] sm:text-3xl">
              Try switching workspace tabs live.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#A3AAAA]">
              Click Dashboard, Projects, Analytics, or Settings directly inside the tablet preview to inspect telemetry and scaling policies.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ProductShowcaseTablet />
          </div>
        </div>
      </section>

      {/* Deep Capability Cards */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {CAPABILITY_DETAILS.map(({ id, title, detail, Icon }) => (
            <div key={id} className="xeops-card xeops-card-interactive p-7">
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-[#20C6C2]/10 text-[#65D9D0]">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="text-lg font-semibold text-[#F2F3F3]">
                  {title}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#A3AAAA]">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Filterable Integrations Directory */}
      <section
        id="integrations"
        className="mx-auto max-w-6xl px-5 py-16 sm:px-8"
      >
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#20C6C2]">
              Integrations Directory
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#F2F3F3]">
              Drop-in compatibility across your toolchain.
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter integrations by category"
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "border-[#20C6C2]/50 bg-[#20C6C2]/15 text-[#F2F3F3]"
                      : "border-white/[0.08] bg-[#141717] text-[#A3AAAA] hover:border-white/20 hover:text-[#F2F3F3]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredIntegrations.map((item) => (
            <div
              key={item.name}
              className="xeops-card xeops-card-interactive flex flex-col justify-between gap-4 p-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-[#F2F3F3]">
                    {item.name}
                  </span>
                  <span className="rounded-full border border-white/[0.08] px-2 py-0.5 text-[10px] text-[#737C7C]">
                    {item.category}
                  </span>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-[#A3AAAA]">
                  {item.detail}
                </p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#20C6C2]">
                {item.latency}
              </span>
            </div>
          ))}
        </div>
      </section>

      <FinalCtaBanner />
    </div>
  );
}
