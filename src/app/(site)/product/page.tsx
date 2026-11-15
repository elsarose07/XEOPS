import type { Metadata } from "next";
import { ZeonProductClient } from "@/components/xeops/ZeonProductClient";

export const metadata: Metadata = {
  title: "Zeon — XEOPS Product",
  description:
    "Explore Zeon, the autonomous edge orchestration and cloud infrastructure engine by Xeops.",
};

export default function ProductPage() {
  return <ZeonProductClient />;
}
