import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function IconBolt(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M13 2 4.5 13.5H12l-1 8.5 8.5-11.5H12L13 2Z" />
    </svg>
  );
}

export function IconGrid(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.4" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.4" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.4" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.4" />
    </svg>
  );
}

export function IconShieldCheck(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 2.8 4.8 5.8v5.5c0 4.6 3.1 8.6 7.2 9.9 4.1-1.3 7.2-5.3 7.2-9.9V5.8L12 2.8Z" />
      <path d="m9.2 12 2 2 3.8-4" />
    </svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5H7.5A3.5 3.5 0 0 0 4 17.5V19" />
      <circle cx="10" cy="8.5" r="3.2" />
      <path d="M16.5 5.8a2.9 2.9 0 0 1 0 5.4" />
      <path d="M20 19v-1.3a3.2 3.2 0 0 0-2.3-3.1" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4.5 10h11" />
      <path d="m11 5.5 4.5 4.5-4.5 4.5" />
    </svg>
  );
}

export function IconPlay(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.5 4.9a.7.7 0 0 1 1.07-.59l8.2 5.1a.7.7 0 0 1 0 1.18l-8.2 5.1A.7.7 0 0 1 6.5 15.1V4.9Z" />
    </svg>
  );
}

export function IconChevronLeft(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12.5 5 7.5 10l5 5" />
    </svg>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m7.5 5 5 5-5 5" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m4.5 10.5 3.6 3.5L15.5 6.5" />
    </svg>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M10 4.5v11M4.5 10h11" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 5l10 10M15 5 5 15" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconHome(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3.5 9 10 3.8 16.5 9v7a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V9Z" />
      <path d="M8 17v-5h4v5" />
    </svg>
  );
}

export function IconFolder(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3.3l1.7 2h6A1.5 1.5 0 0 1 17 7.5v7A1.5 1.5 0 0 1 15.5 16h-11A1.5 1.5 0 0 1 3 14.5v-9Z" />
    </svg>
  );
}

export function IconChart(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 16V10M8.5 16V6M13 16v-4M17 16V4" />
    </svg>
  );
}

export function IconSettings(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="10" cy="10" r="2.6" />
      <path d="M10 3.2v1.6M10 15.2v1.6M3.2 10h1.6M15.2 10h1.6M5.2 5.2l1.1 1.1M13.7 13.7l1.1 1.1M14.8 5.2l-1.1 1.1M6.3 13.7l-1.1 1.1" />
    </svg>
  );
}

export function IconLayers(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m12 3 9 4.8-9 4.8-9-4.8L12 3Z" />
      <path d="m3 12.2 9 4.8 9-4.8" />
      <path d="m3 16.5 9 4.8 9-4.8" />
    </svg>
  );
}

export function IconCpu(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.8" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </svg>
  );
}

export function IconGlobe(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9.5h16.8M3.6 14.5h16.8M12 3c2.6 2.5 4 5.6 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.6-4-9s1.4-6.5 4-9Z" />
    </svg>
  );
}

export function IconGithub(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2.2A9.8 9.8 0 0 0 8.9 21.3c.5.1.7-.2.7-.5v-1.7c-2.7.6-3.3-1.2-3.3-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 4.9.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.8 9.8 0 0 0 12 2.2Z" />
    </svg>
  );
}

export function IconXSocial(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.53 3H20.6l-6.7 7.66L21.8 21h-6.17l-4.83-6.32L5.27 21H2.2l7.17-8.2L1.8 3h6.33l4.37 5.78L17.53 3Zm-1.08 16.17h1.7L7.23 4.73H5.4l11.05 14.44Z" />
    </svg>
  );
}

export function IconLinkedin(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.5 3h-15A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3ZM8.4 18.2H5.8v-8.4h2.6v8.4ZM7.1 8.7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm11.1 9.5h-2.6v-4.1c0-1-.02-2.2-1.36-2.2-1.36 0-1.57 1.06-1.57 2.14v4.16h-2.6v-8.4h2.5v1.15h.03c.35-.66 1.2-1.35 2.47-1.35 2.64 0 3.13 1.74 3.13 4v4.6Z" />
    </svg>
  );
}

export function IconYoutube(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.4 7.4a2.7 2.7 0 0 0-1.9-1.9C17.8 5 12 5 12 5s-5.8 0-7.5.5a2.7 2.7 0 0 0-1.9 1.9C2.1 9.1 2.1 12 2.1 12s0 2.9.5 4.6a2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.5.5 7.5.5s5.8 0 7.5-.5a2.7 2.7 0 0 0 1.9-1.9c.5-1.7.5-4.6.5-4.6s0-2.9-.5-4.6ZM10 15V9l5.2 3-5.2 3Z" />
    </svg>
  );
}
