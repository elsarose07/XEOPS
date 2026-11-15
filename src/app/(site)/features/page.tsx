import type { Metadata } from "next";
import { FeaturesClient } from "@/components/xeops/FeaturesClient";

export const metadata: Metadata = {
  title: "Features — XEOPS",
  description:
    "Explore Xeops real-time orchestration, interactive analytics, and zero-trust boundaries.",
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}
