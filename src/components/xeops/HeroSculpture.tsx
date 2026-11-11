"use client";

import { useEffect, useRef } from "react";

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface RenderQuad {
  pts: readonly [number, number, number, number, number, number, number, number];
  depth: number;
  color: string;
}

function normalize(v: Vec3): Vec3 {
  const len = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / len, y: v.y / len, z: v.z / len };
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function rotateXYZ(p: Vec3, rx: number, ry: number, rz: number): Vec3 {
  // X rotation
  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  const y1 = p.y * cx - p.z * sx;
  const z1 = p.y * sx + p.z * cx;

  // Y rotation
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  const x2 = p.x * cy + z1 * sy;
  const z2 = -p.x * sy + z1 * cy;

  // Z rotation
  const cz = Math.cos(rz);
  const sz = Math.sin(rz);
  return {
    x: x2 * cz - y1 * sz,
    y: x2 * sz + y1 * cz,
    z: z2,
  };
}

function spinePoint(u: number): Vec3 {
  const x = Math.cos(u) + 0.24 * Math.cos(2 * u);
  const y = 0.94 * Math.sin(u) - 0.16 * Math.sin(2 * u);
  const z = 0.44 * Math.sin(2 * u);
  return { x, y, z };
}

export function HeroSculpture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let size = 480;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const target = Math.max(280, Math.min(rect.width || 460, 560));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = target;
      canvas.width = Math.round(target * dpr);
      canvas.height = Math.round(target * dpr);
    };

    updateCanvasSize();

    const NU = 132;
    const NV = 16;
    const RIBBON_HALF_W = 0.46;

    const tealDir = normalize({ x: -0.88, y: -0.25, z: 0.4 });
    const amberDir = normalize({ x: 0.9, y: 0.24, z: 0.36 });
    const topFillDir = normalize({ x: 0.05, y: -0.85, z: 0.52 });

    const drawFrame = (timeSec: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      const cx = size * 0.5;
      const cy = size * 0.5;
      const scale = size * 0.235;
      const focal = 5.4;

      // Subtle rotation + pointer parallax
      const rx = 0.56 + smoothY * 0.14 + Math.sin(timeSec * 0.45) * 0.05;
      const ry = -0.34 + smoothX * 0.18 + timeSec * 0.16;
      const rz = -0.32;

      const project = (p: Vec3) => {
        const zCam = focal + p.z;
        const persp = focal / Math.max(1.2, zCam);
        return {
          sx: cx + p.x * scale * persp,
          sy: cy + p.y * scale * persp,
          depth: p.z,
        };
      };

      // Precompute orbital ring points in 3D space around sculpture
      const orbitSegs = 120;
      const orbitPts: Array<{ sx: number; sy: number; depth: number }> = [];
      for (let i = 0; i <= orbitSegs; i++) {
        const a = (i / orbitSegs) * Math.PI * 2;
        const raw: Vec3 = {
          x: Math.cos(a) * 1.92,
          y: Math.sin(a) * 0.72,
          z: Math.sin(a) * 0.42,
        };
        const tilted = rotateXYZ(raw, 0.24 + smoothY * 0.08, smoothX * 0.08, -0.52);
        orbitPts.push(project(tilted));
      }

      // Draw rear half of orbital ellipse first (positive depth = farther from camera)
      ctx.lineWidth = 1;
      for (let i = 0; i < orbitSegs; i++) {
        const p0 = orbitPts[i];
        const p1 = orbitPts[i + 1];
        if ((p0.depth + p1.depth) * 0.5 >= 0) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.10)";
          ctx.beginPath();
          ctx.moveTo(p0.sx, p0.sy);
          ctx.lineTo(p1.sx, p1.sy);
          ctx.stroke();
        }
      }

      // Build parametric twisted closed ribbon grid
      const grid: Vec3[][] = [];
      for (let i = 0; i <= NU; i++) {
        const u = (i / NU) * Math.PI * 2;
        const eps = 0.005;
        const p = spinePoint(u);
        const pNext = spinePoint(u + eps);
        const tangent = normalize({
          x: pNext.x - p.x,
          y: pNext.y - p.y,
          z: pNext.z - p.z,
        });
        const radial = normalize(p);
        const binorm = normalize(cross(tangent, radial));
        const radOrtho = normalize(cross(binorm, tangent));

        // 1 full smooth architectural twist around closed loop
        const twistAngle = u * 1.0 + 0.55;
        const cosT = Math.cos(twistAngle);
        const sinT = Math.sin(twistAngle);
        const widthDir: Vec3 = {
          x: radOrtho.x * cosT + binorm.x * sinT,
          y: radOrtho.y * cosT + binorm.y * sinT,
          z: radOrtho.z * cosT + binorm.z * sinT,
        };

        const row: Vec3[] = [];
        for (let j = 0; j <= NV; j++) {
          const vNorm = (j / NV) * 2 - 1;
          // Gentle concave parabolic profile gives thickness edge nuance
          const curveSag = (vNorm * vNorm - 0.5) * 0.06;
          const ptLocal: Vec3 = {
            x: p.x + widthDir.x * (vNorm * RIBBON_HALF_W) + tangent.x * curveSag,
            y: p.y + widthDir.y * (vNorm * RIBBON_HALF_W) + tangent.y * curveSag,
            z: p.z + widthDir.z * (vNorm * RIBBON_HALF_W) + tangent.z * curveSag,
          };
          row.push(rotateXYZ(ptLocal, rx, ry, rz));
        }
        grid.push(row);
      }

      const quads: RenderQuad[] = [];
      for (let i = 0; i < NU; i++) {
        for (let j = 0; j < NV; j++) {
          const p00 = grid[i][j];
          const p10 = grid[i + 1][j];
          const p11 = grid[i + 1][j + 1];
          const p01 = grid[i][j + 1];

          const edgeA: Vec3 = {
            x: p10.x - p00.x,
            y: p10.y - p00.y,
            z: p10.z - p00.z,
          };
          const edgeB: Vec3 = {
            x: p01.x - p00.x,
            y: p01.y - p00.y,
            z: p01.z - p00.z,
          };
          let n = normalize(cross(edgeA, edgeB));
          // Double-sided surface orientation facing viewer (+z towards camera)
          if (n.z < 0) {
            n = { x: -n.x, y: -n.y, z: -n.z };
          }

          const midZ = (p00.z + p10.z + p11.z + p01.z) * 0.25;
          const midX = (p00.x + p10.x + p11.x + p01.x) * 0.25;

          const s00 = project(p00);
          const s10 = project(p10);
          const s11 = project(p11);
          const s01 = project(p01);

          // Velvety dark matte obsidian base + teal left rim + amber right rim
          const fresnel = Math.pow(1 - clamp01(n.z), 1.8);
          const tealCos = clamp01((dot(n, tealDir) + 0.32) / 1.32);
          const amberCos = clamp01((dot(n, amberDir) + 0.26) / 1.26);
          const topFill = clamp01(dot(n, topFillDir)) * 0.14;

          const leftWeight = clamp01(0.55 - midX * 0.48);
          const rightWeight = clamp01(0.45 + midX * 0.52);

          const tealIntensity =
            tealCos * (0.36 + 0.64 * fresnel) * leftWeight * 1.15;
          const amberIntensity =
            amberCos * (0.28 + 0.72 * fresnel) * rightWeight * 0.92;
          const depthShade = clamp01(0.72 + (-midZ + 1.0) * 0.16);

          const baseR = 13 + topFill * 32;
          const baseG = 16 + topFill * 34;
          const baseB = 17 + topFill * 34;

          const r = Math.min(
            235,
            Math.round((baseR + tealIntensity * 28 + amberIntensity * 195) * depthShade)
          );
          const g = Math.min(
            235,
            Math.round((baseG + tealIntensity * 195 + amberIntensity * 126) * depthShade)
          );
          const b = Math.min(
            235,
            Math.round((baseB + tealIntensity * 190 + amberIntensity * 54) * depthShade)
          );

          quads.push({
            pts: [s00.sx, s00.sy, s10.sx, s10.sy, s11.sx, s11.sy, s01.sx, s01.sy],
            depth: midZ,
            color: `rgb(${r},${g},${b})`,
          });
        }
      }

      // Painter sort: back-to-front (smaller Z in our frame is nearer; positive Z deeper)
      quads.sort((a, b) => b.depth - a.depth);

      ctx.lineWidth = 0.75;
      for (const q of quads) {
        ctx.fillStyle = q.color;
        ctx.strokeStyle = q.color;
        ctx.beginPath();
        ctx.moveTo(q.pts[0], q.pts[1]);
        ctx.lineTo(q.pts[2], q.pts[3]);
        ctx.lineTo(q.pts[4], q.pts[5]);
        ctx.lineTo(q.pts[6], q.pts[7]);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      // Draw foreground half of orbital ring cleanly over rear occlusion (negative depth = nearer)
      ctx.lineWidth = 1.05;
      for (let i = 0; i < orbitSegs; i++) {
        const p0 = orbitPts[i];
        const p1 = orbitPts[i + 1];
        if ((p0.depth + p1.depth) * 0.5 < 0) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
          ctx.beginPath();
          ctx.moveTo(p0.sx, p0.sy);
          ctx.lineTo(p1.sx, p1.sy);
          ctx.stroke();
        }
      }

      // Two subtle glowing orbital nodes matching mockup (bottom-left teal, top-right amber)
      const tealNodeIdx = Math.floor(orbitSegs * 0.58);
      const amberNodeIdx = Math.floor(orbitSegs * 0.08);
      const drawNode = (
        pt: { sx: number; sy: number },
        coreColor: string,
        glowColor: string
      ) => {
        const grad = ctx.createRadialGradient(pt.sx, pt.sy, 0, pt.sx, pt.sy, 11);
        grad.addColorStop(0, glowColor);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pt.sx, pt.sy, 11, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = coreColor;
        ctx.beginPath();
        ctx.arc(pt.sx, pt.sy, 2.7, 0, Math.PI * 2);
        ctx.fill();
      };

      drawNode(orbitPts[tealNodeIdx], "#65D9D0", "rgba(32, 198, 194, 0.65)");
      drawNode(orbitPts[amberNodeIdx], "#E0B675", "rgba(196, 154, 88, 0.55)");
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointerX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };

    const handlePointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };

    const handleResize = () => {
      updateCanvasSize();
      if (prefersReducedMotion) {
        drawFrame(0);
      }
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    if (prefersReducedMotion) {
      drawFrame(0.3);
      return () => {
        window.removeEventListener("resize", handleResize);
        canvas.removeEventListener("pointermove", handlePointerMove);
        canvas.removeEventListener("pointerleave", handlePointerLeave);
      };
    }

    const start = performance.now();
    const tick = (now: number) => {
      smoothX += (pointerX - smoothX) * 0.06;
      smoothY += (pointerY - smoothY) * 0.06;
      drawFrame((now - start) / 1000);
      animFrame = window.requestAnimationFrame(tick);
    };

    animFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[440px] items-center justify-center">
      {/* Ambient lighting behind the 3D sculpture (teal left/core, warm amber right rim) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 top-8 h-64 w-64 rounded-full bg-[#20C6C2]/18 blur-[72px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 bottom-8 h-56 w-56 rounded-full bg-[#C49A58]/16 blur-[72px]"
      />

      <canvas
        ref={canvasRef}
        aria-label="Abstract three-dimensional Xeops sculptural loop with orbital ring"
        className="xeops-float-gentle relative z-10 h-full w-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
