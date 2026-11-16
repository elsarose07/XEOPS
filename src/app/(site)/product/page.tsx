import type { Metadata } from "next";
import { ZeonProductClient } from "@/components/xeops/ZeonProductClient";

export const metadata: Metadata = {
  title: "Products — XEOPS | Zeon & Scopus",
  description:
    "Explore Zeon and Scopus: autonomous edge orchestration and smart academic document management by Xeops.",
};

export default function ProductPage() {
  return <ZeonProductClient />;
}
