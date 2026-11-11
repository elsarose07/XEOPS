"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { XeopsProvider } from "@/components/xeops/XeopsContext";
import { XeopsHeader } from "@/components/xeops/XeopsHeader";
import { XeopsFooter } from "@/components/xeops/XeopsFooter";
import { XeopsModals } from "@/components/xeops/XeopsModals";

export function XeopsShell({
  children,
  fontVariableClass,
}: {
  children: ReactNode;
  fontVariableClass: string;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <XeopsProvider>
        <div className={`${fontVariableClass} xeops-site flex min-h-dvh flex-col`}>
          {/* Atmospheric dark charcoal backdrop with teal & subtle amber lighting */}
          <div
            aria-hidden="true"
            className="xeops-atmosphere pointer-events-none fixed inset-0 z-0"
          />

          <XeopsHeader />
          <main className="relative z-10 flex-1">{children}</main>
          <XeopsFooter />
          <XeopsModals />
        </div>
      </XeopsProvider>
    </MotionConfig>
  );
}
