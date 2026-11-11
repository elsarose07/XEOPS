import type { Metadata } from "next";
import { HomeLanding } from "@/components/xeops/HomeLanding";

export const metadata: Metadata = {
  title: "Home — XEOPS",
  description:
    "Dream. Build. Innovate. A next-generation platform to turn your ideas into reality, faster than ever.",
};

export default function HomePage() {
  return <HomeLanding />;
}
