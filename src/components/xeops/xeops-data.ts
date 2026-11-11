export interface NavLinkItem {
  readonly label: string;
  readonly href: string;
}

export const NAV_LINKS: readonly NavLinkItem[] = [
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
] as const;

export const HERO_PILLARS = [
  {
    id: "fast",
    title: "Blazing Fast",
    description: "Experience unparalleled performance.",
  },
  {
    id: "custom",
    title: "Limitless Customization",
    description: "Make it truly yours.",
  },
  {
    id: "enterprise",
    title: "Enterprise Ready",
    description: "Built for scale and security.",
  },
  {
    id: "teams",
    title: "Built for Teams",
    description: "Collaborate without limits.",
  },
] as const;

export const SERVICES_LIST = [
  {
    code: "01",
    title: "Autonomous Orchestration",
    description:
      "Declarative execution graphs that balance workloads across regions, queues, and edge nodes without manual intervention.",
    tag: "Runtime",
  },
  {
    code: "02",
    title: "Zero-Trust Mesh & Identity",
    description:
      "Hardware-backed cryptographic attestations, ephemeral credentials, and deterministic access policies across every boundary.",
    tag: "Security",
  },
  {
    code: "03",
    title: "Dedicated Edge Compute",
    description:
      "Deploy stateful services and low-latency APIs to 40+ global points of presence with deterministic cold-start budgets.",
    tag: "Edge",
  },
] as const;

export interface IntegrationItem {
  readonly name: string;
  readonly category: "Infrastructure" | "DevTools" | "Observability" | "Identity";
  readonly detail: string;
  readonly latency: string;
}

export const INTEGRATIONS: readonly IntegrationItem[] = [
  { name: "GitHub", category: "DevTools", detail: "Zero-config preview deployments on every pull request.", latency: "2.1s sync" },
  { name: "Linear", category: "DevTools", detail: "Bidirectional release status synced directly with commits.", latency: "Real-time" },
  { name: "Kubernetes", category: "Infrastructure", detail: "Drop-in cluster federation with automated node draining.", latency: "Native API" },
  { name: "Terraform", category: "Infrastructure", detail: "Versioned infrastructure state with drift verification.", latency: "HCL v2" },
  { name: "OpenTelemetry", category: "Observability", detail: "Distributed traces and structured logs streamed live.", latency: "Sub-ms ingest" },
  { name: "AWS & GCP", category: "Infrastructure", detail: "Multi-cloud peering without egress lock-in or wrappers.", latency: "Private link" },
  { name: "Okta SSO", category: "Identity", detail: "SAML 2.0 and SCIM provisioning with hardware passkeys.", latency: "SOC2 Type II" },
  { name: "Stripe", category: "DevTools", detail: "Usage metering events hooked cleanly into runtime quotas.", latency: "Webhook v3" },
] as const;

export interface TestimonialItem {
  readonly id: string;
  readonly quote: string;
  readonly author: string;
  readonly role: string;
  readonly initials: string;
  readonly accentHue: "teal" | "amber" | "slate";
}

export const TESTIMONIALS: readonly TestimonialItem[] = [
  {
    id: "arjun",
    quote:
      "“Xeops has completely transformed our workflow. It's fast, intuitive and just works.”",
    author: "Arjun Mehta",
    role: "Product Designer, Nova",
    initials: "AM",
    accentHue: "teal",
  },
  {
    id: "elena",
    quote:
      "“We consolidated four legacy orchestration tools into one clean workspace. Cold deploys dropped from minutes to seconds.”",
    author: "Elena Rostova",
    role: "VP of Infrastructure, Kestrel",
    initials: "ER",
    accentHue: "amber",
  },
  {
    id: "marcus",
    quote:
      "“The clarity of telemetry inside Xeops lets a five-engineer core team ship with the confidence of a hundred-person org.”",
    author: "Marcus Vance",
    role: "Staff Systems Lead, Helios",
    initials: "MV",
    accentHue: "slate",
  },
  {
    id: "sora",
    quote:
      "“Rarely does an engineering platform balance aesthetic restraint with raw enterprise determinism so effortlessly.”",
    author: "Sora Takahashi",
    role: "Founder, Arkitekt Labs",
    initials: "ST",
    accentHue: "teal",
  },
] as const;

export interface PricingTier {
  readonly id: "starter" | "pro" | "enterprise";
  readonly name: string;
  readonly tagline: string;
  readonly monthlyPrice: string;
  readonly annualPrice: string;
  readonly unit: string;
  readonly highlighted?: boolean;
  readonly badge?: string;
  readonly ctaLabel: string;
  readonly features: readonly string[];
}

export const PRICING_TIERS: readonly PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For independent builders and early prototypes.",
    monthlyPrice: "$0",
    annualPrice: "$0",
    unit: "forever",
    ctaLabel: "Start Building",
    features: [
      "Up to 3 active projects",
      "Global edge routing & SSL",
      "Live telemetry stream (7-day retention)",
      "Community support & CLI access",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For growing product teams demanding velocity.",
    monthlyPrice: "$49",
    annualPrice: "$39",
    unit: "/ seat / month",
    highlighted: true,
    badge: "Most Popular",
    ctaLabel: "Get Started",
    features: [
      "Unlimited projects & environments",
      "Sub-second atomic rollbacks",
      "90-day distributed trace retention",
      "Role-based access & audit trails",
      "Priority engineering support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Dedicated isolation, custom SLAs, global scale.",
    monthlyPrice: "Custom",
    annualPrice: "Custom",
    unit: "annual contract",
    badge: "Dedicated",
    ctaLabel: "Contact Architecture",
    features: [
      "Single-tenant VPC & BYO cloud regions",
      "SAML SSO, SCIM & hardware MFA policy",
      "99.99% uptime financial SLA guarantee",
      "24/7 dedicated solutions architect",
      "Custom compliance & retention vaults",
    ],
  },
] as const;

export interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "deploy-speed",
    question: "How quickly can our team migrate existing workloads onto Xeops?",
    answer:
      "Most engineering teams connect their repository or cluster configuration and run their first production shadow deployment in under 15 minutes. No proprietary SDK lock-in is required.",
  },
  {
    id: "security",
    question: "What compliance and isolation guarantees come standard?",
    answer:
      "Every workspace ships with end-to-end TLS 1.3, isolated execution sandboxes, and zero-trust secret injection. Enterprise tiers add dedicated VPC peering, SOC2 Type II attestation packages, and SAML SSO.",
  },
  {
    id: "pricing-scale",
    question: "Can we switch plans or adjust seats without downtime?",
    answer:
      "Yes. Plan upgrades, seat changes, and regional capacity scaling apply instantaneously without restarting running instances or dropping active connections.",
  },
  {
    id: "on-prem",
    question: "Does Xeops support hybrid cloud or bring-your-own Kubernetes?",
    answer:
      "Yes. Our Kubernetes Federation Agent lets you manage AWS, GCP, and bare-metal clusters through one unified control plane while keeping data residency strict.",
  },
] as const;

export interface BlogArticle {
  readonly slug: string;
  readonly category: "Engineering" | "Design" | "Architecture";
  readonly date: string;
  readonly readTime: string;
  readonly title: string;
  readonly excerpt: string;
  readonly featured?: boolean;
  readonly paragraphs: readonly string[];
}

export const BLOG_ARTICLES: readonly BlogArticle[] = [
  {
    slug: "introducing-xeops-core",
    category: "Engineering",
    date: "Oct 2026",
    readTime: "6 min read",
    featured: true,
    title: "Designing Sub-12ms Global Control Planes Without Dashboard Clutter",
    excerpt:
      "How we combined deterministic edge state machines with restrained visual telemetry so operators act faster under pressure.",
    paragraphs: [
      "Modern infrastructure consoles often mistake density for power. Engineers face walls of blinking sparklines precisely when clarity matters most.",
      "At Xeops, we rebuilt the control plane around signal-to-noise discipline: every surface surfaces anomaly deltas first, backed by deterministic state transitions across edge POPs.",
      "By caching configuration snapshots at the network perimeter and streaming diffs via compressed delta frames, global rollouts now settle in under twelve milliseconds.",
    ],
  },
  {
    slug: "materiality-dark-interfaces",
    category: "Design",
    date: "Sep 2026",
    readTime: "4 min read",
    title: "Materiality in Dark Systems: Why Charcoal Beats Pure Black",
    excerpt:
      "Exploring perceptual contrast, subtle teal accents, and warm amber lighting cues in extended-use operator environments.",
    paragraphs: [
      "Pure #000000 creates harsh halation around crisp white typography during prolonged sessions. Shifting our foundation to calibrated #090B0B charcoal establishes subtle elevation steps.",
      "Pairing restrained #20C6C2 teal for active focus states with sparing #C49A58 warm amber ambient lighting creates depth without sensory fatigue.",
    ],
  },
  {
    slug: "deterministic-rollbacks",
    category: "Architecture",
    date: "Aug 2026",
    readTime: "5 min read",
    title: "Atomic Rollbacks Across Multi-Region Edge Nodes",
    excerpt:
      "Inside our immutable release graph that eliminates split-brain deployments when recovering production traffic.",
    paragraphs: [
      "Traditional rolling deploys leave stale version skews hanging between availability zones. Xeops models every deployment as a content-addressed manifest.",
      "Switching an active alias updates routing pointers atomically across edges, ensuring clean state transitions in a single coordination pass.",
    ],
  },
  {
    slug: "zero-trust-ephemeral-tokens",
    category: "Architecture",
    date: "Jul 2026",
    readTime: "7 min read",
    title: "Replacing Static API Secrets With Short-Lived Cryptographic Leases",
    excerpt:
      "Why long-lived environment variables belong in the past, and how workload identity simplifies audit compliance.",
    paragraphs: [
      "Static secrets proliferate silently across CI pipelines and developer laptops. Xeops issues signed, workload-scoped leases valid only for the lifetime of an execution frame.",
      "Every cross-service call carries verifiable identity claims without introducing measurable handshake overhead.",
    ],
  },
] as const;

export const ABOUT_MILESTONES = [
  { metric: "< 12ms", label: "Global edge decision latency", note: "Across 40+ distributed POPs" },
  { metric: "99.99%", label: "Observed platform uptime", note: "Backed by automated failover" },
  { metric: "240+", label: "Infrastructure integrations", note: "Zero proprietary SDK lock-in" },
] as const;
