"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useXeopsModals } from "@/components/xeops/XeopsContext";
import { FinalCtaBanner } from "@/components/xeops/HomeSections";
import { IconArrowRight } from "@/components/xeops/XeopsIcons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type ProductId = "zeon" | "scopus";

interface ProductConfig {
  id: ProductId;
  badge: string;
  name: string;
  displayName: string;
  intro: {
    badge: string;
    headline: string;
    description: string;
    ctaText: string;
  };
}

const PRODUCTS: Record<ProductId, ProductConfig> = {
  zeon: {
    id: "zeon",
    badge: "PRODUCT 01",
    displayName: "Zeon",
    name: "MEET OUR LATEST INNOVATION — Introducing zeon by Xeops.",
    intro: {
      badge: "MEET ZEON",
      headline: "Smart Warehouse Management, Simplified.",
      description:
        "Zeon is a modern warehouse management solution designed to simplify inventory, orders and business operations. Track inventory, manage orders and monitor your business with real-time insights.",
      ctaText: "Discover Zeon",
    },
  },
  scopus: {
    id: "scopus",
    badge: "PRODUCT 02",
    displayName: "Scopus",
    name: "INTRODUCING SCOPUS — Bringing all your learning resources together.",
    intro: {
      badge: "MEET SCOPUS",
      headline: "Your Academic World, Organized.",
      description:
        "SCOPUS is a smart educational document management platform designed for college students. Organize your academic documents, keep your study materials in one place, and access important resources whenever you need them.",
      ctaText: "Discover SCOPUS",
    },
  },
};

export function ZeonProductClient() {
  const { openGetStarted, openDemo } = useXeopsModals();

  const [activeId, setActiveId] = useState<ProductId>("zeon");
  const [direction, setDirection] = useState<number>(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const introContentRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  const currentProduct = PRODUCTS[activeId];
  const otherId: ProductId = activeId === "zeon" ? "scopus" : "zeon";
  const otherProduct = PRODUCTS[otherId];

  const selectProduct = useCallback((id: ProductId) => {
    setActiveId((prev) => {
      if (prev === id) return prev;
      setDirection(id === "scopus" ? 1 : -1);
      return id;
    });
  }, []);

  const toggleProduct = useCallback(() => {
    setActiveId((prev) => {
      const next: ProductId = prev === "zeon" ? "scopus" : "zeon";
      setDirection(next === "scopus" ? 1 : -1);
      return next;
    });
  }, []);

  // ── Swipe & Horizontal Scroll Navigation ──────────────────────────
  useEffect(() => {
    const el = pinTargetRef.current;
    if (!el) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let lastWheelTime = 0;
    const WHEEL_COOLDOWN = 350; // ms to avoid duplicate triggers on momentum scroll

    // 1. Touch Gestures (Mobile & Tablet Swipe)
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length === 0) return;
      const diffX = e.changedTouches[0].clientX - touchStartX;
      const diffY = e.changedTouches[0].clientY - touchStartY;

      // Responsive threshold with horizontal angle dominance
      if (Math.abs(diffX) > 25 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          // Swiped left -> Scopus comes
          selectProduct("scopus");
        } else {
          // Swiped right -> Zeon comes
          selectProduct("zeon");
        }
      }
    };

    // 2. Mouse / Pointer Drag (Desktop Click & Drag)
    const handlePointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement)?.closest("button, a, input, textarea")) return;
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const diffX = e.clientX - dragStartX;
      const diffY = e.clientY - dragStartY;

      // Quick-trigger once drag threshold reached
      if (Math.abs(diffX) > 30 && Math.abs(diffX) > Math.abs(diffY)) {
        isDragging = false;
        if (diffX < 0) {
          selectProduct("scopus");
        } else {
          selectProduct("zeon");
        }
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      const diffX = e.clientX - dragStartX;
      const diffY = e.clientY - dragStartY;

      if (Math.abs(diffX) > 25 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          selectProduct("scopus");
        } else {
          selectProduct("zeon");
        }
      }
    };

    const handlePointerCancel = () => {
      isDragging = false;
    };

    // 3. Wheel Gestures (Trackpad / Horizontal Mouse Scroll)
    const handleWheel = (e: WheelEvent) => {
      const isHorizontal = Math.abs(e.deltaX) > 12 && Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const isShiftWheel = e.shiftKey && Math.abs(e.deltaY) > 12;

      if (isHorizontal || isShiftWheel) {
        const delta = isShiftWheel ? e.deltaY : e.deltaX;
        const now = Date.now();
        if (now - lastWheelTime < WHEEL_COOLDOWN) return;
        lastWheelTime = now;

        if (delta > 0) {
          // Scroll left gesture -> Scopus comes
          selectProduct("scopus");
        } else {
          // Scroll right gesture -> Zeon comes
          selectProduct("zeon");
        }
      }
    };

    // 4. Keyboard Navigation (Left / Right Arrow Keys)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest("input, textarea, select")) return;
      if (e.key === "ArrowLeft") {
        selectProduct("zeon");
      } else if (e.key === "ArrowRight") {
        selectProduct("scopus");
      }
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    el.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerCancel);
    el.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerCancel);
      el.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectProduct]);

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

        // 2. The active brand writing glides up and to the right into vertical alignment
        tl.to(
          orbRef.current,
          {
            x: "24vw",
            y: "-20vh",
            scale: 0.88,
            duration: 0.75,
            ease: "power2.inOut",
          },
          0
        );

        // 3. 'MEET [PRODUCT]' Content glides in swiftly on the left
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
            y: "-14vh",
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

      {/* ── Pinned Scroll-Driven Transition Stage (Hero -> Meet Product) ──── */}
      <div
        ref={containerRef}
        style={{ overscrollBehaviorX: "none" }}
        className="relative z-10 w-full h-[135vh]"
      >
        <div
          ref={pinTargetRef}
          style={{ overscrollBehaviorX: "none", touchAction: "pan-y" }}
          className="sticky top-0 flex h-[calc(100dvh-74px)] w-full flex-col justify-between overflow-hidden pt-6 sm:pt-8 pb-0 select-none cursor-grab active:cursor-grabbing"
        >
          {/* Initial Hero Typography (Centered at top) */}
          <div
            ref={heroContentRef}
            className="mx-auto flex max-w-2xl flex-col items-center px-4 text-center will-change-transform"
          >
            {/* Brand Title (Clean, arrow is moved to the second writing below) */}
            <div className="relative mt-2 flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.h1
                  key={currentProduct.name}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 40 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-light tracking-[0.05em] sm:tracking-[0.08em] text-[#F4F6F6] leading-snug sm:leading-tight max-w-xl text-center"
                  style={{
                    textShadow: "0 0 25px rgba(32, 198, 194, 0.35), 0 0 50px rgba(10, 30, 30, 0.7)",
                  }}
                >
                  {currentProduct.name}
                </motion.h1>
              </AnimatePresence>
            </div>

            <div className="mt-4 sm:mt-5 flex items-center justify-center">
              <button
                type="button"
                onClick={() => openGetStarted("pro")}
                className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-[#EBFBFB] px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0A1313] shadow-[0_0_20px_rgba(255,255,255,0.45),0_0_40px_rgba(32,198,194,0.35)] transition-all duration-300 hover:scale-105 hover:bg-[#FFFFFF] hover:shadow-[0_0_30px_rgba(101,217,208,0.7)]"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Left Introduction Section: 'MEET [PRODUCT]' (Revealed on scroll) */}
          <div
            ref={introContentRef}
            className="pointer-events-none absolute left-6 sm:left-12 lg:left-20 xl:left-28 top-1/2 -translate-y-1/2 z-30 max-w-lg opacity-0 will-change-transform"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentProduct.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#20C6C2]">
                  {currentProduct.intro.badge}
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#F2F3F3] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
                  {currentProduct.intro.headline}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#A3AAAA] sm:text-[15px]">
                  {currentProduct.intro.description}
                </p>
                <div className="mt-7">
                  <button
                    type="button"
                    onClick={openDemo}
                    className="xeops-btn-primary px-7 py-3 text-sm inline-flex items-center gap-2 shadow-[0_0_25px_rgba(32,198,194,0.35)]"
                  >
                    {currentProduct.intro.ctaText}
                    <IconArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Central to Right Stage: Floating Brand Writing / Mark (Zeon / Scopus) */}
          <div className="relative mt-auto flex flex-col items-center justify-end overflow-visible pb-24 sm:pb-32 lg:pb-36">
            <div
              ref={orbRef}
              className="relative flex items-center justify-center shrink-0 will-change-transform select-none"
            >
              {/* Subtle ambient back-glow aura highlighting the active mark */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-56 sm:h-24 sm:w-72 rounded-full bg-[#20C6C2]/15 blur-2xl"
              />

              {/* Arrow sign on the left side with generous distance from the centered writing */}
              <button
                type="button"
                onClick={toggleProduct}
                className="group absolute right-[calc(100%+0.625rem)] sm:right-[calc(100%+2rem)] lg:right-[calc(100%+3.5rem)] top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.05] text-[#F2F3F3] shadow-[0_0_20px_rgba(32,198,194,0.25)] transition-all duration-300 hover:scale-110 hover:border-[#20C6C2] hover:bg-[#20C6C2]/15 active:scale-95 shrink-0"
                aria-label={`Switch to ${otherProduct.displayName}`}
                title={`Switch to ${otherProduct.displayName}`}
              >
                <IconArrowRight
                  className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${
                    activeId === "scopus" ? "rotate-180 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"
                  }`}
                />
              </button>

              <AnimatePresence mode="wait" custom={direction}>
                {activeId === "zeon" ? (
                  <motion.div
                    key="zeon-writing"
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -direction * 50 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="flex items-center justify-center text-center"
                  >
                    <Image
                      src="/zeon-script-white.png"
                      alt="Zeon"
                      width={494}
                      height={113}
                      priority
                      draggable={false}
                      className="relative z-10 h-14 w-auto object-contain sm:h-20 md:h-24 lg:h-28 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] drop-shadow-[0_0_40px_rgba(32,198,194,0.3)] transition-transform duration-300 hover:scale-105"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="scopus-writing"
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -direction * 50 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="flex flex-col items-center justify-center gap-2 text-center"
                  >
                    <Image
                      src="/scopus-mark.png"
                      alt="Scopus"
                      width={335}
                      height={435}
                      priority
                      draggable={false}
                      className="relative z-10 h-16 w-auto object-contain sm:h-20 md:h-24 lg:h-28 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] drop-shadow-[0_0_40px_rgba(32,198,194,0.3)] transition-transform duration-300 hover:scale-105"
                    />
                    <span className="font-serif text-lg sm:text-xl lg:text-2xl font-light tracking-[0.34em] text-[#F4F6F6] drop-shadow-[0_0_20px_rgba(32,198,194,0.4)] text-center pl-[0.34em]">
                      SCOPUS
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ── Final Conversion Banner ─────────────────────────────────── */}
      <FinalCtaBanner />
    </div>
  );
}
