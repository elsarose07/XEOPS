"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useXeopsModals } from "@/components/xeops/XeopsContext";
import { FinalCtaBanner } from "@/components/xeops/HomeSections";
import {
  IconArrowRight,
  IconBolt,
  IconGrid,
  IconShieldCheck,
  IconUsers,
} from "@/components/xeops/XeopsIcons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const METRICS = [
  { label: "Dispatch Latency", value: "< 12ms" },
  { label: "Mesh Availability", value: "99.999%" },
  { label: "Edge Clusters", value: "42+ Active" },
  { label: "Egress Overhead", value: "Zero-Cost" },
];

export function ZeonProductClient() {
  const { openGetStarted, openDemo } = useXeopsModals();

  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const introContentRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  const scrollToSpecs = () => {
    const el = document.getElementById("zeon-specs");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ── Desktop Layout (>= 1024px): Fast, responsive, lag-free transition
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.25,
            pin: pinTargetRef.current,
          },
        });

        // 1. Initial Hero Text fades out quickly
        tl.to(
          heroContentRef.current,
          {
            opacity: 0,
            y: -30,
            duration: 0.25,
            ease: "power2.out",
            pointerEvents: "none",
          },
          0
        );

        // 2. The Glossy Dark Glass Orb travels briskly to the right & scales down
        tl.to(
          orbRef.current,
          {
            x: "24vw",
            y: "-18%",
            scale: 0.82,
            duration: 0.75,
            ease: "power2.inOut",
          },
          0
        );

        // 3. 'MEET ZEON' Content glides in swiftly on the left
        tl.fromTo(
          introContentRef.current,
          { opacity: 0, x: -30, pointerEvents: "none" },
          {
            opacity: 1,
            x: 0,
            pointerEvents: "auto",
            duration: 0.45,
            ease: "power2.out",
          },
          0.2
        );
      });

      // ── Tablet / Mobile Layout (< 1024px): Fast vertical transition
      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.25,
            pin: pinTargetRef.current,
          },
        });

        tl.to(
          heroContentRef.current,
          {
            opacity: 0,
            y: -25,
            duration: 0.25,
            ease: "power2.out",
            pointerEvents: "none",
          },
          0
        );

        tl.to(
          orbRef.current,
          {
            y: "-30%",
            scale: 0.65,
            duration: 0.75,
            ease: "power2.inOut",
          },
          0
        );

        tl.fromTo(
          introContentRef.current,
          { opacity: 0, y: 25, pointerEvents: "none" },
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 0.45,
            ease: "power2.out",
          },
          0.2
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div className="relative w-full overflow-hidden bg-[#070909] text-[#F2F3F3]">
      {/* ── Cosmic Starfield & Nebula Background ──────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.5px 1.5px at 140px 70px, rgba(101,217,208,0.9), rgba(0,0,0,0)),
              radial-gradient(1px 1px at 240px 150px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.2px 1.2px at 380px 220px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 520px 90px, rgba(255,255,255,0.7), rgba(0,0,0,0)),
              radial-gradient(1.5px 1.5px at 680px 290px, rgba(32,198,194,0.8), rgba(0,0,0,0)),
              radial-gradient(1px 1px at 810px 140px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.2px 1.2px at 940px 260px, rgba(255,255,255,0.6), rgba(0,0,0,0)),
              radial-gradient(1.5px 1.5px at 1080px 80px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 1220px 190px, rgba(101,217,208,0.8), rgba(0,0,0,0)),
              radial-gradient(1.2px 1.2px at 1340px 320px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 1480px 110px, #ffffff, rgba(0,0,0,0))
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "800px 400px",
          }}
        />
        <div className="absolute -top-32 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(32,198,194,0.12)_0%,rgba(10,25,30,0.05)_50%,transparent_75%)] blur-3xl" />
      </div>

      {/* ── Pinned Scroll-Driven Transition Stage (Hero -> Meet Zeon) ──── */}
      <div ref={containerRef} className="relative z-10 w-full h-[135vh]">
        <div
          ref={pinTargetRef}
          className="sticky top-0 flex h-[calc(100dvh-74px)] w-full flex-col justify-between overflow-hidden pt-6 sm:pt-8 pb-0"
        >
          {/* Initial Hero Typography (Centered at top) */}
          <div
            ref={heroContentRef}
            className="mx-auto flex max-w-2xl flex-col items-center px-4 text-center will-change-transform"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#20C6C2] sm:text-[11px]">
              PRODUCT 01
            </p>
            <h1
              className="mt-2 font-serif text-5xl font-light tracking-[0.24em] text-[#F4F6F6] sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-tight"
              style={{
                textShadow: "0 0 35px rgba(32, 198, 194, 0.4), 0 0 70px rgba(10, 30, 30, 0.8)",
              }}
            >
              ZEON
            </h1>
            <p className="mt-2 max-w-lg text-xs leading-relaxed text-[#A3AAAA] sm:text-[13px] md:text-sm">
              Explore Zeon, the autonomous edge orchestration engine engineered by Xeops. Built for microsecond dispatch, zero-trust cryptographic isolation, and resilient multi-cloud scale.
            </p>
            <div className="mt-3.5 flex items-center justify-center">
              <button
                type="button"
                onClick={() => openGetStarted("pro")}
                className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-[#EBFBFB] px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0A1313] shadow-[0_0_20px_rgba(255,255,255,0.45),0_0_40px_rgba(32,198,194,0.35)] transition-all duration-300 hover:scale-105 hover:bg-[#FFFFFF] hover:shadow-[0_0_30px_rgba(101,217,208,0.7)]"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Left Introduction Section: 'MEET ZEON' (Revealed on scroll) */}
          <div
            ref={introContentRef}
            className="pointer-events-none absolute left-6 sm:left-12 lg:left-20 xl:left-28 top-1/2 -translate-y-1/2 z-30 max-w-lg opacity-0 will-change-transform"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#20C6C2]">
              MEET ZEON
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#F2F3F3] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
              Smart Warehouse Management, Simplified.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#A3AAAA] sm:text-[15px]">
              Zeon is a modern warehouse management solution designed to simplify inventory, orders and business operations. Track inventory, manage orders and monitor your business with real-time insights.
            </p>
            <div className="mt-7">
              <button
                type="button"
                onClick={scrollToSpecs}
                className="xeops-btn-primary px-7 py-3 text-sm inline-flex items-center gap-2 shadow-[0_0_25px_rgba(32,198,194,0.35)]"
              >
                Discover Zeon
                <IconArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Central to Right Stage: The Glossy Dark Glass ZEON Orb */}
          <div className="relative mt-auto flex flex-col items-center justify-end overflow-visible pb-0">
            <div
              ref={orbRef}
              className="relative translate-y-[24%] flex h-[300px] w-[300px] flex-col items-center justify-center rounded-full border border-white/20 border-t-white/80 shrink-0 sm:h-[380px] sm:w-[380px] md:h-[440px] md:w-[440px] lg:h-[480px] lg:w-[480px] will-change-transform"
              style={{
                background:
                  "radial-gradient(circle at 35% 25%, #182226 0%, #0F1619 35%, #080D0E 65%, #030506 100%)",
                boxShadow:
                  "0 0 50px rgba(32, 198, 194, 0.22), 0 0 100px rgba(32, 198, 194, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.75), inset 0 16px 40px rgba(101, 217, 208, 0.25), inset 0 -20px 45px rgba(0, 0, 0, 0.9)",
              }}
            >
              {/* Glass Specular Gloss Curve at upper-left */}
              <div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse at 38% 22%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 35%, transparent 65%)",
                }}
              />

              {/* Ambient Glow Aura behind the glass rim (Hardware-accelerated) */}
              <div
                className="pointer-events-none absolute -inset-5 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(32, 198, 194, 0.25) 0%, rgba(101, 217, 208, 0.08) 45%, transparent 70%)",
                }}
              />

              {/* Central Black Zeon Logo with Backlit Glass Core */}
              <div className="relative z-10 flex items-center justify-center transition-transform duration-300 hover:scale-105">
                {/* Soft Backlight behind the black logo (Hardware-accelerated gradient) */}
                <div
                  className="pointer-events-none absolute h-36 w-36 sm:h-48 sm:w-48 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.2) 25%, rgba(101, 217, 208, 0.15) 45%, transparent 70%)",
                  }}
                />

                <Image
                  src="/zeon-logo.png"
                  alt="ZEON Logo"
                  width={240}
                  height={304}
                  priority
                  className="relative z-10 h-28 w-auto object-contain sm:h-36 md:h-44 lg:h-48 drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Key Metrics Strip ────────────────────────────────────────── */}
      <section className="relative z-20 border-y border-white/[0.08] bg-[#0A0D0D]/90 backdrop-blur-xl">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-8 sm:grid-cols-4 sm:px-8">
          {METRICS.map((m) => (
            <div key={m.label} className="text-center sm:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#737C7C]">
                {m.label}
              </p>
              <p className="mt-1 font-mono text-xl font-bold tracking-tight text-[#F2F3F3] sm:text-2xl">
                {m.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Technical Architecture & Deep Capabilities ────────────────── */}
      <section id="zeon-specs" className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#20C6C2]">
              Architectural Guarantees
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#F2F3F3] sm:text-4xl">
              Engineered for extreme reliability.
            </h2>
          </div>
          <button
            type="button"
            onClick={openDemo}
            className="xeops-btn-secondary px-5 py-2.5 text-xs uppercase tracking-wider"
          >
            Launch Interactive Tour →
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="xeops-card xeops-card-interactive p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-[#20C6C2]/10 text-[#65D9D0]">
              <IconBolt className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-base font-semibold text-[#F2F3F3]">
              Compiled Edge Routing
            </h3>
            <p className="mt-2.5 text-xs leading-relaxed text-[#A3AAAA]">
              Warm isolate pools guarantee microsecond dispatch without the cold-start overhead typical of traditional serverless runtimes.
            </p>
          </div>

          <div className="xeops-card xeops-card-interactive p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-[#20C6C2]/10 text-[#65D9D0]">
              <IconShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-base font-semibold text-[#F2F3F3]">
              Cryptographic Isolation
            </h3>
            <p className="mt-2.5 text-xs leading-relaxed text-[#A3AAAA]">
              Every request executes within memory-safe sandboxes with hardware-rooted keys and continuous verification.
            </p>
          </div>

          <div className="xeops-card xeops-card-interactive p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-[#20C6C2]/10 text-[#65D9D0]">
              <IconGrid className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-base font-semibold text-[#F2F3F3]">
              Declarative Build Graph
            </h3>
            <p className="mt-2.5 text-xs leading-relaxed text-[#A3AAAA]">
              Define pipeline workflows, rollback criteria, and regional failover strategies as deterministic code manifests.
            </p>
          </div>

          <div className="xeops-card xeops-card-interactive p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-[#20C6C2]/10 text-[#65D9D0]">
              <IconUsers className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-base font-semibold text-[#F2F3F3]">
              Autonomous Consensus
            </h3>
            <p className="mt-2.5 text-xs leading-relaxed text-[#A3AAAA]">
              Distributed nodes coordinate state replication and automated traffic failover without centralized control bottlenecks.
            </p>
          </div>
        </div>
      </section>

      {/* ── Final Conversion Banner ─────────────────────────────────── */}
      <FinalCtaBanner />
    </div>
  );
}
