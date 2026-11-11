import type { Metadata } from "next";
import { FeaturesClient } from "@/components/xeops/FeaturesClient";

export const metadata: Metadata = {
  title: "Product — XEOPS",
  description:
    "Explore the Xeops platform surface, architecture capabilities, and native ecosystem integrations.",
};

export default function ProductPage() {
  return <FeaturesClient />;
}
