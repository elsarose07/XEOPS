"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type PlanTierId = "starter" | "pro" | "enterprise";
export type LegalDocKind = "privacy" | "terms";

interface XeopsModalContextValue {
  startOpen: boolean;
  startPlan: PlanTierId;
  demoOpen: boolean;
  legalDoc: LegalDocKind | null;
  openGetStarted: (plan?: PlanTierId) => void;
  closeGetStarted: () => void;
  openDemo: () => void;
  closeDemo: () => void;
  openLegal: (doc: LegalDocKind) => void;
  closeLegal: () => void;
}

const XeopsModalContext = createContext<XeopsModalContextValue | null>(null);

export function XeopsProvider({ children }: { children: ReactNode }) {
  const [startOpen, setStartOpen] = useState(false);
  const [startPlan, setStartPlan] = useState<PlanTierId>("pro");
  const [demoOpen, setDemoOpen] = useState(false);
  const [legalDoc, setLegalDoc] = useState<LegalDocKind | null>(null);

  const openGetStarted = useCallback((plan: PlanTierId = "pro") => {
    setDemoOpen(false);
    setLegalDoc(null);
    setStartPlan(plan);
    setStartOpen(true);
  }, []);

  const closeGetStarted = useCallback(() => setStartOpen(false), []);

  const openDemo = useCallback(() => {
    setStartOpen(false);
    setLegalDoc(null);
    setDemoOpen(true);
  }, []);

  const closeDemo = useCallback(() => setDemoOpen(false), []);

  const openLegal = useCallback((doc: LegalDocKind) => {
    setStartOpen(false);
    setDemoOpen(false);
    setLegalDoc(doc);
  }, []);

  const closeLegal = useCallback(() => setLegalDoc(null), []);

  const value = useMemo(
    () => ({
      startOpen,
      startPlan,
      demoOpen,
      legalDoc,
      openGetStarted,
      closeGetStarted,
      openDemo,
      closeDemo,
      openLegal,
      closeLegal,
    }),
    [
      startOpen,
      startPlan,
      demoOpen,
      legalDoc,
      openGetStarted,
      closeGetStarted,
      openDemo,
      closeDemo,
      openLegal,
      closeLegal,
    ]
  );

  return (
    <XeopsModalContext.Provider value={value}>
      {children}
    </XeopsModalContext.Provider>
  );
}

export function useXeopsModals(): XeopsModalContextValue {
  const ctx = useContext(XeopsModalContext);
  if (!ctx) {
    throw new Error("useXeopsModals must be used inside XeopsProvider");
  }
  return ctx;
}
