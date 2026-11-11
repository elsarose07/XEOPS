"use client";

import Link from "next/link";
import { FOOTER_LINKS } from "@/components/xeops/xeops-data";
import { useXeopsModals } from "@/components/xeops/XeopsContext";
import {
  IconGithub,
  IconLinkedin,
  IconXSocial,
  IconYoutube,
  XeopsMark,
} from "@/components/xeops/XeopsIcons";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com", Icon: IconGithub },
  { label: "X", href: "https://x.com", Icon: IconXSocial },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: IconLinkedin },
  { label: "YouTube", href: "https://youtube.com", Icon: IconYoutube },
] as const;

export function XeopsFooter() {
  const { openLegal } = useXeopsModals();

  return (
    <footer className="relative z-10 border-t border-white/[0.07] bg-[#090B0B]/90">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        {/* Top Row: Logo | Nav Links | Socials */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <Link
            href="/home"
            className="flex items-center gap-2.5 text-[#F2F3F3] transition-opacity hover:opacity-85"
          >
            <XeopsMark className="h-4 w-auto" />
            <span className="text-base font-semibold tracking-tight">Xeops</span>
          </Link>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-x-7 gap-y-2.5"
          >
            {FOOTER_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium text-[#A3AAAA] transition-colors hover:text-[#F2F3F3]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/"
              className="text-xs font-medium text-[#737C7C] transition-colors hover:text-[#65D9D0]"
            >
              Replay Intro
            </Link>
          </nav>

          <div className="flex items-center gap-3.5">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-[#A3AAAA] transition-colors hover:border-white/25 hover:text-[#F2F3F3]"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Hairline Legal Row */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/[0.07] pt-7 text-xs text-[#737C7C] sm:flex-row sm:items-center">
          <p>© 2026 Xeops. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => openLegal("privacy")}
              className="transition-colors hover:text-[#A3AAAA]"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => openLegal("terms")}
              className="transition-colors hover:text-[#A3AAAA]"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
