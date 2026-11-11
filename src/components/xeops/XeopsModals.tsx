"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  useXeopsModals,
  type LegalDocKind,
  type PlanTierId,
} from "@/components/xeops/XeopsContext";
import {
  IconArrowRight,
  IconBolt,
  IconCheck,
  IconClose,
  IconCpu,
  IconShieldCheck,
} from "@/components/xeops/XeopsIcons";

const DEMO_STAGES = [
  {
    id: "orchestrate",
    step: "01",
    title: "Orchestrate",
    summary:
      "Define compute topologies once and dispatch workloads deterministically across 40+ edge regions.",
    metricLabel: "Cold Provisioning",
    metricValue: "11.4 ms",
    status: "Topology Synced",
    lines: [
      "$ xeops deploy --region=global --verify",
      "✓ Attesting workload hash [sha256:8c4a...e19b]",
      "✓ Routing mesh updated across 42 POPs in 11.4ms",
    ],
  },
  {
    id: "observe",
    step: "02",
    title: "Observe",
    summary:
      "Inspect live latency percentiles, anomaly deltas, and active user throughput without noise.",
    metricLabel: "P99 Global Latency",
    metricValue: "14.2 ms",
    status: "All Systems Nominal",
    lines: [
      "$ xeops telemetry tail --env=production",
      "• us-east-1     uptime: 99.99%   p99: 11.8ms",
      "• eu-central-1  uptime: 99.98%   p99: 15.1ms",
    ],
  },
  {
    id: "scale",
    step: "03",
    title: "Scale",
    summary:
      "Promote atomic canary traffic globally or roll back instantaneously with zero dropped connections.",
    metricLabel: "Traffic Shift",
    metricValue: "100% Atomic",
    status: "Zero Drift Verified",
    lines: [
      "$ xeops traffic promote release/v2.4.1 --weight=100",
      "✓ Canary assertions passed (0 error spikes)",
      "✓ Production alias switched atomically",
    ],
  },
] as const;

function GetStartedDialogBody({
  initialPlan,
  onClose,
}: {
  initialPlan: PlanTierId;
  onClose: () => void;
}) {
  const [selectedPlan, setSelectedPlan] = useState<PlanTierId>(initialPlan);
  const [workspaceName, setWorkspaceName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = workEmail.trim();
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setError("Please enter a valid work email address.");
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <div className="relative p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-medium tracking-wide text-[#65D9D0]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#20C6C2]" />
            Workspace Setup
          </span>
          <h2 className="mt-3 text-xl font-semibold tracking-tight text-[#F2F3F3] sm:text-2xl">
            Launch your Xeops workspace
          </h2>
          <p className="mt-1.5 text-sm text-[#A3AAAA]">
            Reserve your cloud slug and receive instant sandbox credentials.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close workspace setup dialog"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[#A3AAAA] transition-colors hover:border-white/20 hover:text-[#F2F3F3]"
        >
          <IconClose className="h-4 w-4" />
        </button>
      </div>

      {submitted ? (
        <div className="mt-6 rounded-2xl border border-[#20C6C2]/30 bg-[#20C6C2]/[0.07] p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#20C6C2]/20 text-[#65D9D0]">
              <IconCheck className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-medium text-[#F2F3F3]">
                Access request reserved
              </h3>
              <p className="text-xs text-[#A3AAAA]">
                Plan: <span className="capitalize text-[#65D9D0]">{selectedPlan}</span>{" "}
                {workspaceName.trim() ? `· Workspace: ${workspaceName.trim()}` : ""}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[#A3AAAA]">
            Provisioning details for <span className="text-[#F2F3F3]">{workEmail.trim()}</span>{" "}
            are queued. You can inspect live demo capabilities right away or close this window to continue exploring Xeops.
          </p>
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="xeops-btn-primary px-5 py-2 text-sm"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
          {/* Plan selector */}
          <div>
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[#737C7C]">
              Select Tier
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(["starter", "pro", "enterprise"] as const).map((tier) => {
                const active = selectedPlan === tier;
                return (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setSelectedPlan(tier)}
                    className={`rounded-xl border px-3 py-2.5 text-left text-xs font-medium capitalize transition-all ${
                      active
                        ? "border-[#20C6C2]/55 bg-[#20C6C2]/12 text-[#F2F3F3] shadow-[0_0_20px_rgba(32,198,194,0.16)]"
                        : "border-white/[0.08] bg-[#101313] text-[#A3AAAA] hover:border-white/20 hover:text-[#F2F3F3]"
                    }`}
                  >
                    {tier}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3.5">
            <div>
              <label
                htmlFor="xeops-workspace-input"
                className="mb-1.5 block text-xs font-medium text-[#A3AAAA]"
              >
                Workspace or team name
              </label>
              <input
                id="xeops-workspace-input"
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="e.g. nova-systems"
                className="w-full rounded-xl border border-white/[0.1] bg-[#090B0B] px-4 py-2.5 text-sm text-[#F2F3F3] placeholder:text-[#737C7C] focus:border-[#20C6C2]/60 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="xeops-email-input"
                className="mb-1.5 block text-xs font-medium text-[#A3AAAA]"
              >
                Work email <span className="text-[#20C6C2]">*</span>
              </label>
              <input
                id="xeops-email-input"
                type="email"
                required
                value={workEmail}
                onChange={(e) => {
                  setWorkEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-white/[0.1] bg-[#090B0B] px-4 py-2.5 text-sm text-[#F2F3F3] placeholder:text-[#737C7C] focus:border-[#20C6C2]/60 focus:outline-none"
              />
              {error ? (
                <p className="mt-1.5 text-xs text-[#C49A58]" role="alert">
                  {error}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span className="text-xs text-[#737C7C]">
              No credit card required · Instant setup
            </span>
            <button type="submit" className="xeops-btn-primary px-6 py-2.5 text-sm">
              Continue
              <IconArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function WatchDemoDialogBody({
  onClose,
  onStart,
}: {
  onClose: () => void;
  onStart: () => void;
}) {
  const [stageIdx, setStageIdx] = useState(0);
  const current = DEMO_STAGES[stageIdx] ?? DEMO_STAGES[0];

  return (
    <div className="relative p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#20C6C2]">
            Interactive Product Tour
          </span>
          <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-[#F2F3F3] sm:text-2xl">
            Inside the Xeops Runtime
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close product demo dialog"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[#A3AAAA] transition-colors hover:border-white/20 hover:text-[#F2F3F3]"
        >
          <IconClose className="h-4 w-4" />
        </button>
      </div>

      {/* Stage Switcher */}
      <div className="mt-6 grid grid-cols-3 gap-2">
        {DEMO_STAGES.map((stage, idx) => {
          const active = idx === stageIdx;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setStageIdx(idx)}
              className={`rounded-xl border px-3 py-2.5 text-left transition-all ${
                active
                  ? "border-[#20C6C2]/45 bg-[#20C6C2]/10 text-[#F2F3F3]"
                  : "border-white/[0.08] bg-[#101313] text-[#A3AAAA] hover:border-white/20 hover:text-[#F2F3F3]"
              }`}
            >
              <span className="block font-mono text-[10px] tracking-[0.18em] text-[#737C7C]">
                {stage.step}
              </span>
              <span className="mt-0.5 block text-xs font-medium">{stage.title}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Simulated Frame */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#090B0B] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] pb-4">
          <div className="flex items-center gap-2.5">
            {stageIdx === 0 ? (
              <IconCpu className="h-4 w-4 text-[#20C6C2]" />
            ) : stageIdx === 1 ? (
              <IconBolt className="h-4 w-4 text-[#20C6C2]" />
            ) : (
              <IconShieldCheck className="h-4 w-4 text-[#C49A58]" />
            )}
            <span className="text-sm font-medium text-[#F2F3F3]">
              {current.title} Stage
            </span>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-[#20C6C2]/25 bg-[#20C6C2]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#65D9D0]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#20C6C2]" />
            {current.status}
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[#A3AAAA]">
          {current.summary}
        </p>

        <div className="mt-4 rounded-xl border border-white/[0.07] bg-[#101313] p-4 font-mono text-xs leading-relaxed text-[#A3AAAA]">
          {current.lines.map((line, i) => (
            <div
              key={line}
              className={
                i === 0
                  ? "text-[#F2F3F3]"
                  : line.startsWith("✓")
                  ? "mt-1.5 text-[#65D9D0]"
                  : "mt-1.5 text-[#A3AAAA]"
              }
            >
              {line}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#171A1A]/70 px-4 py-3">
          <span className="text-xs text-[#737C7C]">{current.metricLabel}</span>
          <span className="font-mono text-sm font-semibold text-[#F2F3F3]">
            {current.metricValue}
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onClose}
          className="xeops-btn-secondary px-4 py-2 text-xs"
        >
          Close Preview
        </button>
        <button
          type="button"
          onClick={onStart}
          className="xeops-btn-primary px-5 py-2.5 text-sm"
        >
          Get Started Free
          <IconArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function LegalDialogBody({
  doc,
  onClose,
}: {
  doc: LegalDocKind;
  onClose: () => void;
}) {
  const isPrivacy = doc === "privacy";
  return (
    <div className="relative p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#20C6C2]">
            Xeops Legal
          </span>
          <h2 className="mt-1.5 text-xl font-semibold text-[#F2F3F3]">
            {isPrivacy ? "Privacy Policy" : "Terms of Service"}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close legal dialog"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[#A3AAAA] transition-colors hover:border-white/20 hover:text-[#F2F3F3]"
        >
          <IconClose className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 space-y-3 text-sm leading-relaxed text-[#A3AAAA]">
        {isPrivacy ? (
          <>
            <p>
              Xeops collects only the minimum operational metadata required to authenticate sessions, provision regional compute workloads, and protect cluster security.
            </p>
            <p>
              Customer payloads, environment secrets, and telemetry streams are encrypted in transit (TLS 1.3) and isolated per tenant namespace. We never sell or train models on private workspace data.
            </p>
          </>
        ) : (
          <>
            <p>
              Use of the Xeops platform is governed by fair compute allocation, zero-abuse network integrity standards, and the uptime commitments attached to your selected workspace tier.
            </p>
            <p>
              You retain 100% ownership of your code, configurations, and deployment artifacts at all times, with instant export portability.
            </p>
          </>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="xeops-btn-secondary px-5 py-2 text-xs"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export function XeopsModals() {
  const {
    startOpen,
    startPlan,
    demoOpen,
    legalDoc,
    openGetStarted,
    closeGetStarted,
    closeDemo,
    closeLegal,
  } = useXeopsModals();

  const anyOpen = startOpen || demoOpen || legalDoc !== null;

  useEffect(() => {
    if (!anyOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeGetStarted();
        closeDemo();
        closeLegal();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [anyOpen, closeGetStarted, closeDemo, closeLegal]);

  const handleCloseAll = () => {
    closeGetStarted();
    closeDemo();
    closeLegal();
  };

  return (
    <AnimatePresence>
      {anyOpen ? (
        <motion.div
          key="xeops-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleCloseAll}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
          role="presentation"
        >
          <motion.div
            key={startOpen ? "start" : demoOpen ? "demo" : `legal-${legalDoc}`}
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg overflow-hidden rounded-[22px] border border-white/[0.1] bg-[#141717] shadow-[0_32px_90px_rgba(0,0,0,0.75)]"
          >
            {startOpen ? (
              <GetStartedDialogBody
                initialPlan={startPlan}
                onClose={closeGetStarted}
              />
            ) : demoOpen ? (
              <WatchDemoDialogBody
                onClose={closeDemo}
                onStart={() => openGetStarted("pro")}
              />
            ) : legalDoc ? (
              <LegalDialogBody doc={legalDoc} onClose={closeLegal} />
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
