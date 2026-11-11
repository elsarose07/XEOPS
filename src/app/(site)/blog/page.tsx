import type { Metadata } from "next";
import { BlogClient } from "@/components/xeops/BlogClient";

export const metadata: Metadata = {
  title: "Blog — XEOPS",
  description:
    "Engineering dispatches, interface design notes, and distributed architecture deep-dives from Xeops.",
};

export default function BlogPage() {
  return <BlogClient />;
}
