import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/components/xeops/xeops-theme.css";
import { XeopsShell } from "@/components/xeops/XeopsShell";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-xeops-sans",
});

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <XeopsShell fontVariableClass={plusJakarta.variable}>
      {children}
    </XeopsShell>
  );
}
