import type { Metadata } from "next";
import { FeaturesClient } from "@/components/xeops/FeaturesClient";

export const metadata: Metadata = {
  title: "Features — XEOPS",
  description:
    "Explore Xeops real-time orchestration, interactive analytics, zero-trust boundaries, and ecosystem integrations.",
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}
