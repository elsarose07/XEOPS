import type { Metadata } from "next";
import { HomePlaceholder } from "@/components/home/HomePlaceholder";

export const metadata: Metadata = {
  title: "Home — XEOPS",
  description: "XEOPS",
};

export default function HomePage() {
  return <HomePlaceholder />;
}
