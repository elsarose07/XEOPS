"use client";

import { HERO_PILLARS } from "@/components/xeops/xeops-data";
import { useXeopsModals } from "@/components/xeops/XeopsContext";
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

export function FeaturesClient() {
  const { openGetStarted, openDemo } = useXeopsModals();

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
            Explore the architectural guarantees and capabilities powering modern Xeops deployments.
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

      <FinalCtaBanner />
    </div>
  );
}
