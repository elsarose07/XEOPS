import type { Metadata } from "next";
import { ABOUT_MILESTONES, SERVICES_LIST } from "@/components/xeops/xeops-data";
import {
  FinalCtaBanner,
  TestimonialsSection,
} from "@/components/xeops/HomeSections";
import {
  IconCpu,
  IconGlobe,
  IconLayers,
} from "@/components/xeops/XeopsIcons";

export const metadata: Metadata = {
  title: "About — XEOPS",
  description:
    "Learn how Xeops architects calm, sub-12ms global compute systems and developer workflows.",
};

const PRINCIPLES = [
  {
    title: "Calm Determinism",
    body: "Infrastructure should behave identically across local sandboxes and 40+ global edge nodes — free from flaky configuration drift.",
    Icon: IconCpu,
  },
  {
    title: "Restrained Precision",
    body: "We strip away visual clutter so engineering teams see the anomaly delta and act decisively in seconds.",
    Icon: IconLayers,
  },
  {
    title: "Edge-First Sovereignty",
    body: "Keep sensitive workloads close to users with strict cryptographic boundaries and multi-region mesh failover.",
    Icon: IconGlobe,
  },
] as const;

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Header Hero */}
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-16 sm:px-8 sm:pt-24 sm:pb-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#20C6C2]">
          About Xeops
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-[#F2F3F3] sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
          Built to turn complex systems into{" "}
          <span className="xeops-gradient-teal">effortless velocity.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#A3AAAA] sm:text-lg">
          Founded by distributed-systems engineers and product designers, Xeops exists to bridge raw global scale with quiet architectural clarity.
        </p>

        {/* Key Numbers Strip */}
        <div className="mt-14 grid grid-cols-1 divide-y divide-white/[0.08] rounded-[20px] border border-white/[0.08] bg-[#141717]/80 md:grid-cols-3 md:divide-x md:divide-y-0">
          {ABOUT_MILESTONES.map((item, idx) => (
            <div key={item.label} className="px-7 py-7">
              <p
                className={`text-3xl font-bold tracking-tight ${
                  idx === 1
                    ? "text-[#65D9D0]"
                    : idx === 2
                    ? "text-[#C49A58]"
                    : "text-[#F2F3F3]"
                }`}
              >
                {item.metric}
              </p>
              <p className="mt-2 text-sm font-medium text-[#F2F3F3]">
                {item.label}
              </p>
              <p className="mt-1 text-xs text-[#737C7C]">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Design & Engineering Philosophy */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#20C6C2]">
            Core Philosophy
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#F2F3F3]">
            Three principles guiding every release.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PRINCIPLES.map(({ title, body, Icon }) => (
            <div
              key={title}
              className="xeops-card xeops-card-interactive p-7"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-[#65D9D0]">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 text-lg font-semibold text-[#F2F3F3]">
                {title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#A3AAAA]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Architecture */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="rounded-[24px] border border-white/[0.08] bg-[#101313]/85 p-7 sm:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C49A58]">
            Managed Services &amp; Advisory
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#F2F3F3] sm:text-3xl">
            End-to-end orchestration backed by systems architects.
          </h2>

          <div className="mt-8 divide-y divide-white/[0.08]">
            {SERVICES_LIST.map((srv) => (
              <div
                key={srv.code}
                className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 font-mono text-xs text-[#737C7C]">
                    {srv.code}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#F2F3F3]">
                      {srv.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-[#A3AAAA]">
                      {srv.description}
                    </p>
                  </div>
                </div>
                <span className="w-fit shrink-0 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-xs text-[#65D9D0]">
                  {srv.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <FinalCtaBanner />
    </div>
  );
}
