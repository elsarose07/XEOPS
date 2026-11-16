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
} from "@/components/xeops/XeopsIcons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function ZeonProductClient() {
  const { openGetStarted, openDemo } = useXeopsModals();

  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const introContentRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

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

        // 2. The Zeon writing glides up and to the right into vertical alignment
        tl.to(
          orbRef.current,
          {
            x: "24vw",
            y: "-28vh",
            scale: 0.88,
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
            y: "-20vh",
            scale: 0.75,
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
                onClick={openDemo}
                className="xeops-btn-primary px-7 py-3 text-sm inline-flex items-center gap-2 shadow-[0_0_25px_rgba(32,198,194,0.35)]"
              >
                Discover Zeon
                <IconArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Central to Right Stage: Floating Zeon Cursive Script Writing (No Round Orb) */}
          <div className="relative mt-auto flex flex-col items-center justify-end overflow-visible pb-12 sm:pb-16 lg:pb-20">
            <div
              ref={orbRef}
              className="relative flex flex-col items-center justify-center shrink-0 will-change-transform select-none"
            >
              {/* Subtle ambient back-glow aura highlighting the script calligraphy */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute h-20 w-56 sm:h-24 sm:w-72 rounded-full bg-[#20C6C2]/15 blur-2xl"
              />

              <Image
                src="/zeon-script-white.png"
                alt="Zeon"
                width={494}
                height={113}
                priority
                className="relative z-10 h-14 w-auto object-contain sm:h-20 md:h-24 lg:h-28 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] drop-shadow-[0_0_40px_rgba(32,198,194,0.3)] transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Final Conversion Banner ─────────────────────────────────── */}
      <FinalCtaBanner />
    </div>
  );
}
