"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  LOGO_SPOKE_BOTTOM_LEFT,
  LOGO_SPOKE_TOP_RIGHT,
  XEOPS_WORDMARK,
} from "@/components/brand/xeops-paths";

gsap.registerPlugin(useGSAP);

const LOGO_VIEW_W = 685;
const LOGO_VIEW_H = 322;
const EXIT_SCALE = 1.18;

const SPOKE_BL_BOX = {
  leftRatio: 0,
  topRatio: 117 / LOGO_VIEW_H,
  widthRatio: 388 / LOGO_VIEW_W,
  heightRatio: 205 / LOGO_VIEW_H,
};

const SPOKE_TR_BOX = {
  leftRatio: 392 / LOGO_VIEW_W,
  topRatio: 0,
  widthRatio: 293 / LOGO_VIEW_W,
  heightRatio: 160 / LOGO_VIEW_H,
};

function computeOffscreenTargets(logoRect: DOMRect, vw: number, vh: number) {
  const blW = logoRect.width * SPOKE_BL_BOX.widthRatio;
  const blH = logoRect.height * SPOKE_BL_BOX.heightRatio;
  const blSrcCX = logoRect.left + logoRect.width * SPOKE_BL_BOX.leftRatio + blW / 2;
  const blSrcCY = logoRect.top + logoRect.height * SPOKE_BL_BOX.topRatio + blH / 2;

  const blScaledW = blW * EXIT_SCALE;
  const blScaledH = blH * EXIT_SCALE;
  const blDstCX = -(blScaledW * 0.65 + 48);
  const blDstCY = vh + blScaledH * 0.65 + 48;

  const trW = logoRect.width * SPOKE_TR_BOX.widthRatio;
  const trH = logoRect.height * SPOKE_TR_BOX.heightRatio;
  const trSrcCX = logoRect.left + logoRect.width * SPOKE_TR_BOX.leftRatio + trW / 2;
  const trSrcCY = logoRect.top + logoRect.height * SPOKE_TR_BOX.topRatio + trH / 2;

  const trScaledW = trW * EXIT_SCALE;
  const trScaledH = trH * EXIT_SCALE;
  const trDstCX = vw + trScaledW * 0.65 + 48;
  const trDstCY = -(trScaledH * 0.65 + 48);

  return {
    bl: { x: blDstCX - blSrcCX, y: blDstCY - blSrcCY, scale: EXIT_SCALE },
    tr: { x: trDstCX - trSrcCX, y: trDstCY - trSrcCY, scale: EXIT_SCALE },
  };
}

export function XeopsOpening() {
  const stageRef = useRef<HTMLDivElement>(null);
  const centerLogoRef = useRef<HTMLDivElement>(null);
  const spokeBlRef = useRef<HTMLDivElement>(null);
  const spokeTrRef = useRef<HTMLDivElement>(null);
  const wordmarkWrapRef = useRef<HTMLDivElement>(null);
  const replayBtnRef = useRef<HTMLButtonElement>(null);

  const [playCount, setPlayCount] = useState(0);

  useGSAP(
    () => {
      const centerLogo = centerLogoRef.current;
      const spokeBl = spokeBlRef.current;
      const spokeTr = spokeTrRef.current;
      const wordmarkWrap = wordmarkWrapRef.current;
      const replayBtn = replayBtnRef.current;

      if (!centerLogo || !spokeBl || !spokeTr || !wordmarkWrap) {
        return;
      }

      const glyphs = gsap.utils.toArray<SVGGElement>(".xeops-glyph", wordmarkWrap);

      const getTargets = () =>
        computeOffscreenTargets(
          centerLogo.getBoundingClientRect(),
          window.innerWidth,
          window.innerHeight
        );

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([spokeBl, spokeTr], { opacity: 0 });
        gsap.set(wordmarkWrap, { opacity: 1, scale: 1 });
        gsap.set(glyphs, { opacity: 1, y: 0 });
        if (replayBtn) gsap.set(replayBtn, { opacity: 0.42 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { overwrite: "auto" },
      });

      // 1. Both spokes slice inward to form the centered logo on #000000
      tl.addLabel("logoIn", 0.12)
        .fromTo(
          spokeBl,
          {
            opacity: 0,
            x: -22,
            y: 12,
            scale: 0.94,
            clipPath: "inset(0% 100% 0% 0%)",
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.8,
            ease: "expo.out",
          },
          "logoIn"
        )
        .fromTo(
          spokeTr,
          {
            opacity: 0,
            x: 22,
            y: -12,
            scale: 0.94,
            clipPath: "inset(0% 0% 0% 100%)",
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.8,
            ease: "expo.out",
          },
          "logoIn"
        )
        // 2. Brief poised hold, then sweep out through opposite corners off-screen
        .addLabel("split", 1.2)
        .to(
          spokeBl,
          {
            x: () => getTargets().bl.x,
            y: () => getTargets().bl.y,
            scale: () => getTargets().bl.scale,
            duration: 1.25,
            ease: "power3.inOut",
          },
          "split"
        )
        .to(
          spokeTr,
          {
            x: () => getTargets().tr.x,
            y: () => getTargets().tr.y,
            scale: () => getTargets().tr.scale,
            duration: 1.25,
            ease: "power3.inOut",
          },
          "split"
        )
        // 3. XEOPS branding rises smoothly up as the spokes sweep off-screen
        .addLabel("brandUp", "split+=0.36")
        .fromTo(
          wordmarkWrap,
          {
            opacity: 0,
            scale: 0.97,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.95,
            ease: "power3.out",
          },
          "brandUp"
        )
        .fromTo(
          glyphs,
          {
            opacity: 0,
            y: 195,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.92,
            stagger: 0.048,
            ease: "power4.out",
          },
          "brandUp"
        );

      if (replayBtn) {
        tl.fromTo(
          replayBtn,
          { opacity: 0, y: 6 },
          { opacity: 0.42, y: 0, duration: 0.45, ease: "power2.out" },
          "brandUp+=0.7"
        );
      }

      const handleResize = () => {
        if (tl.progress() < 1) {
          tl.invalidate();
          return;
        }
        const updated = getTargets();
        gsap.set(spokeBl, {
          x: updated.bl.x,
          y: updated.bl.y,
          scale: updated.bl.scale,
        });
        gsap.set(spokeTr, {
          x: updated.tr.x,
          y: updated.tr.y,
          scale: updated.tr.scale,
        });
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: stageRef, dependencies: [playCount], revertOnUpdate: true }
  );

  return (
    <main
      ref={stageRef}
      className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-black select-none"
      aria-label="XEOPS"
    >
      {/* Centered Logo Lockup (initial mark geometry matching assets/logo.svg) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 flex items-center justify-center"
      >
        <div
          ref={centerLogoRef}
          className="relative aspect-[685/322] w-[clamp(236px,38vw,460px)] overflow-visible"
        >
          <div
            ref={spokeBlRef}
            style={{
              opacity: 0,
              left: `${SPOKE_BL_BOX.leftRatio * 100}%`,
              top: `${SPOKE_BL_BOX.topRatio * 100}%`,
              width: `${SPOKE_BL_BOX.widthRatio * 100}%`,
              height: `${SPOKE_BL_BOX.heightRatio * 100}%`,
            }}
            className="absolute origin-center will-change-transform"
          >
            <svg
              viewBox={LOGO_SPOKE_BOTTOM_LEFT.viewBox}
              className="h-full w-full overflow-visible"
              fill="none"
            >
              <path d={LOGO_SPOKE_BOTTOM_LEFT.d} fill="#FFFFFF" />
            </svg>
          </div>

          <div
            ref={spokeTrRef}
            style={{
              opacity: 0,
              left: `${SPOKE_TR_BOX.leftRatio * 100}%`,
              top: `${SPOKE_TR_BOX.topRatio * 100}%`,
              width: `${SPOKE_TR_BOX.widthRatio * 100}%`,
              height: `${SPOKE_TR_BOX.heightRatio * 100}%`,
            }}
            className="absolute origin-center will-change-transform"
          >
            <svg
              viewBox={LOGO_SPOKE_TOP_RIGHT.viewBox}
              className="h-full w-full overflow-visible"
              fill="none"
            >
              <path d={LOGO_SPOKE_TOP_RIGHT.d} fill="#FFFFFF" />
            </svg>
          </div>
        </div>
      </div>

      {/* Centered XEOPS Branding Wordmark (assets/xeops.svg) */}
      <div className="relative z-10 flex items-center justify-center px-6">
        <div
          ref={wordmarkWrapRef}
          style={{ opacity: 0 }}
          className="w-[min(78vw,580px)] overflow-hidden pb-1 will-change-transform"
        >
          <h1 className="sr-only">XEOPS</h1>
          <svg
            viewBox={XEOPS_WORDMARK.viewBox}
            className="block h-auto w-full overflow-visible"
            role="img"
            aria-label="XEOPS"
          >
            {XEOPS_WORDMARK.glyphs.map((glyph) => (
              <g key={glyph.id} className="xeops-glyph will-change-transform">
                <path
                  d={glyph.d}
                  fill="#FFFFFF"
                  fillRule="evenodd"
                />
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Subtle corner control to replay the opening sequence while inspecting */}
      <button
        ref={replayBtnRef}
        type="button"
        onClick={() => setPlayCount((n) => n + 1)}
        style={{ opacity: 0 }}
        className="fixed right-[clamp(22px,4.2vw,60px)] bottom-[clamp(22px,4.2vh,52px)] z-20 cursor-pointer font-mono text-[11px] tracking-[0.24em] text-white/90 uppercase transition-opacity duration-300 hover:!opacity-100 focus-visible:!opacity-100 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/60"
      >
        Replay
      </button>
    </main>
  );
}
