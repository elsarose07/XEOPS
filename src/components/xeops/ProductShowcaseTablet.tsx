"use client";

import { useState } from "react";
import {
  LOGO_SPOKE_BOTTOM_LEFT,
  LOGO_SPOKE_TOP_RIGHT,
} from "@/components/brand/xeops-paths";
import {
  IconChart,
  IconFolder,
  IconHome,
  IconSettings,
} from "@/components/xeops/XeopsIcons";

type TabletTab = "dashboard" | "projects" | "analytics" | "settings";

const SIDEBAR_TABS = [
  { id: "dashboard" as const, label: "Dashboard", Icon: IconHome },
  { id: "projects" as const, label: "Projects", Icon: IconFolder },
  { id: "analytics" as const, label: "Analytics", Icon: IconChart },
  { id: "settings" as const, label: "Settings", Icon: IconSettings },
];

const METRICS = [
  { label: "Projects", value: "24", delta: "↑ 12%" },
  { label: "Active Users", value: "1.2k", delta: "↑ 18%" },
  { label: "Uptime", value: "99.9%", delta: "↑ 0.1%" },
] as const;

const SAMPLE_PROJECTS = [
  { name: "Edge Gateway Core", region: "Global Mesh", status: "Healthy", latency: "9.4ms" },
  { name: "Nova Inference Pool", region: "us-east · eu-west", status: "Active", latency: "14.1ms" },
  { name: "Zero-Trust Auth Plane", region: "Multi-region", status: "Verified", latency: "6.8ms" },
] as const;

export function ProductShowcaseTablet() {
  const [activeTab, setActiveTab] = useState<TabletTab>("dashboard");
  const [autoScale, setAutoScale] = useState(true);

  return (
    <div className="xeops-tablet-stage relative mx-auto w-full max-w-[590px]">
      {/* Subtle warm amber & teal ambient glow behind the tablet mockup */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-6 h-48 w-64 rounded-full bg-[#C49A58]/16 blur-[75px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-8 h-52 w-60 rounded-full bg-[#20C6C2]/14 blur-[80px]"
      />

      <div className="xeops-tablet-frame relative overflow-hidden rounded-[22px] border border-white/[0.12] bg-[#0D1010]/95 shadow-[0_32px_90px_rgba(0,0,0,0.72)] backdrop-blur-xl">
        {/* Top sheen line */}
        <div
          aria-hidden="true"
          className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />

        {/* Tablet inner shell */}
        <div className="grid min-h-[340px] grid-cols-12">
          {/* Sidebar */}
          <aside className="col-span-4 border-r border-white/[0.07] bg-[#090B0B]/85 p-3.5 sm:col-span-4 sm:p-4">
            <div className="flex items-center gap-2 px-2 pb-5">
              <svg viewBox="137 157 685 322" className="h-3.5 w-auto" aria-hidden="true">
                <path d={LOGO_SPOKE_BOTTOM_LEFT.d} fill="#F2F3F3" />
                <path d={LOGO_SPOKE_TOP_RIGHT.d} fill="#20C6C2" />
              </svg>
              <span className="text-xs font-semibold tracking-tight text-[#F2F3F3]">
                Xeops
              </span>
            </div>

            <nav aria-label="Workspace preview navigation" className="space-y-1">
              {SIDEBAR_TABS.map(({ id, label, Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-xs transition-colors ${
                      isActive
                        ? "border border-[#20C6C2]/30 bg-gradient-to-r from-[#20C6C2]/20 to-transparent text-[#F2F3F3]"
                        : "border border-transparent text-[#737C7C] hover:bg-white/[0.03] hover:text-[#A3AAAA]"
                    }`}
                  >
                    <Icon
                      className={`h-3.5 w-3.5 shrink-0 ${
                        isActive ? "text-[#65D9D0]" : "text-[#737C7C]"
                      }`}
                    />
                    <span className="truncate font-medium">{label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-10 hidden rounded-xl border border-white/[0.06] bg-[#141717]/80 p-3 sm:block">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#737C7C]">
                Edge Cluster
              </p>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#F2F3F3]">
                  42 Nodes Online
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#20C6C2] shadow-[0_0_8px_#20C6C2]" />
              </div>
            </div>
          </aside>

          {/* Main Workspace Canvas */}
          <div className="col-span-8 flex flex-col justify-between p-4 sm:col-span-8 sm:p-5">
            {/* Top utility bar inside tablet */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-base font-semibold tracking-tight text-[#F2F3F3] sm:text-lg">
                  {activeTab === "dashboard"
                    ? "Good morning!"
                    : activeTab === "projects"
                    ? "Active Projects"
                    : activeTab === "analytics"
                    ? "Edge Telemetry"
                    : "Cluster Policy"}
                </h3>
                <p className="text-[11px] text-[#737C7C]">
                  {activeTab === "dashboard"
                    ? "Here's what's happening today."
                    : activeTab === "projects"
                    ? "3 production deployments running cleanly."
                    : activeTab === "analytics"
                    ? "Real-time request efficiency over 24h."
                    : "Zero-trust runtime & scaling preferences."}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[#C49A58]/35 bg-gradient-to-br from-[#202424] to-[#121515] text-[10px] font-semibold text-[#F2F3F3]"
                >
                  AM
                </span>
              </div>
            </div>

            {activeTab === "dashboard" && (
              <>
                {/* 3 KPI Tiles */}
                <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-2.5">
                  {METRICS.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-white/[0.07] bg-[#141717]/90 p-2.5 sm:p-3"
                    >
                      <p className="text-[10px] text-[#737C7C]">{m.label}</p>
                      <p className="mt-1 text-base font-semibold tracking-tight text-[#F2F3F3] sm:text-xl">
                        {m.value}
                      </p>
                      <p className="mt-0.5 text-[10px] font-medium text-[#20C6C2]">
                        {m.delta}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Smooth Glowing Wave Chart */}
                <div className="relative mt-4 overflow-hidden rounded-xl border border-white/[0.06] bg-[#090B0B]/70 px-3 pt-6 pb-2">
                  <span className="absolute right-3 top-2.5 rounded-full border border-[#20C6C2]/30 bg-[#112A2A] px-2.5 py-0.5 text-[10px] font-semibold text-[#65D9D0]">
                    + 24%
                  </span>

                  <svg viewBox="0 0 360 96" className="h-24 w-full" aria-hidden="true">
                    <defs>
                      <linearGradient id="xeopsChartFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#20C6C2" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#20C6C2" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="xeopsChartLine" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#20C6C2" stopOpacity="0.35" />
                        <stop offset="55%" stopColor="#65D9D0" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#20C6C2" stopOpacity="0.5" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,78 C36,78 52,58 84,60 C118,62 132,36 168,46 C202,56 226,24 268,20 C306,16 330,42 360,34 L360,96 L0,96 Z"
                      fill="url(#xeopsChartFill)"
                    />
                    <path
                      d="M0,78 C36,78 52,58 84,60 C118,62 132,36 168,46 C202,56 226,24 268,20 C306,16 330,42 360,34"
                      fill="none"
                      stroke="url(#xeopsChartLine)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <circle cx="268" cy="20" r="4" fill="#65D9D0" />
                    <circle cx="268" cy="20" r="8" fill="#20C6C2" fillOpacity="0.24" />
                  </svg>
                </div>
              </>
            )}

            {activeTab === "projects" && (
              <div className="mt-4 space-y-2.5">
                {SAMPLE_PROJECTS.map((proj) => (
                  <div
                    key={proj.name}
                    className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-[#141717]/90 px-3.5 py-3"
                  >
                    <div>
                      <p className="text-xs font-medium text-[#F2F3F3]">{proj.name}</p>
                      <p className="text-[11px] text-[#737C7C]">{proj.region}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block rounded-full bg-[#20C6C2]/12 px-2 py-0.5 text-[10px] font-medium text-[#65D9D0]">
                        {proj.status}
                      </span>
                      <p className="mt-0.5 font-mono text-[10px] text-[#A3AAAA]">
                        {proj.latency}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="rounded-xl border border-white/[0.07] bg-[#141717]/90 p-3">
                    <span className="text-[10px] text-[#737C7C]">Throughput</span>
                    <p className="mt-1 text-lg font-semibold text-[#F2F3F3]">184k req/m</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.07] bg-[#141717]/90 p-3">
                    <span className="text-[10px] text-[#737C7C]">Error Rate</span>
                    <p className="mt-1 text-lg font-semibold text-[#65D9D0]">0.002%</p>
                  </div>
                </div>
                <div className="rounded-xl border border-white/[0.07] bg-[#101313] p-3">
                  <div className="flex items-center justify-between text-[11px] text-[#A3AAAA]">
                    <span>Cache Hit Ratio</span>
                    <span className="font-mono text-[#F2F3F3]">98.4%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-[#20C6C2] to-[#65D9D0]" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-[#141717]/90 p-3.5">
                  <div>
                    <p className="text-xs font-medium text-[#F2F3F3]">
                      Autonomous Edge Scaling
                    </p>
                    <p className="text-[11px] text-[#737C7C]">
                      Sub-second node allocation on burst traffic.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={autoScale}
                    aria-label="Toggle Autonomous Edge Scaling"
                    onClick={() => setAutoScale((prev) => !prev)}
                    className={`relative h-5 w-9 rounded-full transition-colors ${
                      autoScale ? "bg-[#20C6C2]" : "bg-[#202424]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-[#F2F3F3] transition-transform ${
                        autoScale ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-[#141717]/90 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#F2F3F3]">
                      Mutual TLS Enforcement
                    </span>
                    <span className="rounded-full bg-[#C49A58]/15 px-2 py-0.5 text-[10px] font-medium text-[#C49A58]">
                      Strict Mode
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#737C7C]">
                    Hardware-attested short-lived leaf certificates active.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
