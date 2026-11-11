"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BLOG_ARTICLES,
  type BlogArticle,
} from "@/components/xeops/xeops-data";
import { FinalCtaBanner } from "@/components/xeops/HomeSections";
import {
  IconArrowRight,
  IconClose,
} from "@/components/xeops/XeopsIcons";

const BLOG_CATEGORIES = [
  "All",
  "Engineering",
  "Design",
  "Architecture",
] as const;

export function BlogClient() {
  const [category, setCategory] =
    useState<(typeof BLOG_CATEGORIES)[number]>("All");
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  useEffect(() => {
    if (!activeArticle) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveArticle(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeArticle]);

  const featured = BLOG_ARTICLES.find((a) => a.featured) ?? BLOG_ARTICLES[0];
  const filtered =
    category === "All"
      ? BLOG_ARTICLES
      : BLOG_ARTICLES.filter((a) => a.category === category);

  return (
    <div className="w-full">
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:px-8 sm:pt-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#20C6C2]">
              Xeops Journal
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#F2F3F3] sm:text-5xl">
              Engineering notes &amp; design dispatches.
            </h1>
          </div>

          <div
            role="group"
            aria-label="Filter articles by category"
            className="flex flex-wrap gap-2"
          >
            {BLOG_CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "border-[#20C6C2]/50 bg-[#20C6C2]/15 text-[#F2F3F3]"
                      : "border-white/[0.08] bg-[#141717] text-[#A3AAAA] hover:border-white/20 hover:text-[#F2F3F3]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Editorial Banner */}
        {featured ? (
          <article className="mt-12 overflow-hidden rounded-[24px] border border-white/[0.08] bg-gradient-to-br from-[#161B1B]/95 via-[#121515]/95 to-[#171511]/90 p-7 shadow-[0_24px_65px_rgba(0,0,0,0.5)] sm:p-10">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full border border-[#20C6C2]/30 bg-[#20C6C2]/10 px-3 py-0.5 font-medium text-[#65D9D0]">
                Featured · {featured.category}
              </span>
              <span className="text-[#737C7C]">
                {featured.date} · {featured.readTime}
              </span>
            </div>

            <h2 className="mt-5 max-w-3xl text-2xl font-bold tracking-tight text-[#F2F3F3] sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#A3AAAA] sm:text-base">
              {featured.excerpt}
            </p>

            <div className="mt-7">
              <button
                type="button"
                onClick={() => setActiveArticle(featured)}
                className="xeops-btn-secondary px-5 py-2.5 text-sm"
              >
                Read Dispatch
                <IconArrowRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        ) : null}

        {/* Articles Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {filtered.map((post) => (
            <article
              key={post.slug}
              className="xeops-card xeops-card-interactive flex flex-col justify-between p-7"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#20C6C2]">
                    {post.category}
                  </span>
                  <span className="text-[#737C7C]">
                    {post.date} · {post.readTime}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold leading-snug text-[#F2F3F3]">
                  {post.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#A3AAAA]">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setActiveArticle(post)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#F2F3F3] transition-colors hover:text-[#65D9D0]"
                >
                  Read article
                  <IconArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FinalCtaBanner />

      {/* Article Reader Modal */}
      <AnimatePresence>
        {activeArticle ? (
          <motion.div
            key="blog-reader-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveArticle(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
            role="presentation"
          >
            <motion.article
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[22px] border border-white/[0.1] bg-[#141717] p-6 shadow-[0_32px_90px_rgba(0,0,0,0.8)] sm:p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  <span className="rounded-full border border-[#20C6C2]/30 bg-[#20C6C2]/10 px-2.5 py-0.5 font-medium text-[#65D9D0]">
                    {activeArticle.category}
                  </span>
                  <span className="text-[#737C7C]">
                    {activeArticle.date} · {activeArticle.readTime}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  aria-label="Close article reader"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[#A3AAAA] hover:border-white/20 hover:text-[#F2F3F3]"
                >
                  <IconClose className="h-4 w-4" />
                </button>
              </div>

              <h2 className="mt-5 text-2xl font-bold tracking-tight text-[#F2F3F3] sm:text-3xl">
                {activeArticle.title}
              </h2>

              <div className="mt-6 space-y-4 border-t border-white/[0.07] pt-6 text-[15px] leading-relaxed text-[#A3AAAA]">
                {activeArticle.paragraphs.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
