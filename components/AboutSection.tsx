"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import { about, projects } from "@/lib/content";

// "Tentang saya" — gives a recruiter the context the hero doesn't: who this
// person is, where they study, what they focus on, and whether they're
// available. Works with or without a portrait photo.
export default function AboutSection() {
  const { t, lang } = useLanguage();

  const liveCount = projects.filter((p) => Boolean(p.url)).length;

  return (
    <section
      id="about"
      data-kb-section="about"
      className="scroll-mt-24 relative min-h-svh flex items-start lg:items-center px-6 sm:px-10 md:px-14 pt-28 pb-16 lg:py-14"
    >
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-8 lg:gap-12 items-center">
        <div>
          <Reveal>
            <p className="font-mono text-sm text-ice-400 mb-3">
              {t("about.kicker")}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight text-ice-50 leading-[1.02] mb-6">
              {t("about.title")}
            </h2>
          </Reveal>

          <div className="space-y-4 max-w-xl">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={160 + i * 80}>
                <p className="text-base text-ice-200 leading-relaxed">
                  {p[lang]}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={340}>
            <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 max-w-xl">
              {about.facts.map((fact) => (
                <div key={fact.label.en}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ice-400 mb-1">
                    {fact.label[lang]}
                  </dt>
                  <dd className="text-sm text-ice-100">{fact.value[lang]}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ice-400 mb-3">
                {about.learning[lang]}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {about.learningItems.map((item) => (
                  <span key={item} data-cursor="hover" className="frost-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Profile card — photo when available, otherwise a monogram card
            with the numbers a recruiter scans for. */}
        <Reveal delay={200} direction="left">
          <div id="about-card" className="relative mx-auto w-full max-w-sm pointer-events-auto">
            <div
              aria-hidden
              className="absolute -inset-px rounded-3xl bg-gradient-to-b from-ice-400/40 via-ice-700/20 to-transparent blur-[2px]"
            />
            <div className="relative rounded-3xl bg-ink-1/85 backdrop-blur-md border border-ink-3 p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
              {about.hasPortrait ? (
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-ink-3">
                  <Image
                    src={about.portrait}
                    alt={t("about.portraitAlt")}
                    fill
                    sizes="(max-width: 1024px) 90vw, 360px"
                    className="object-cover"
                    priority={false}
                  />
                </div>
              ) : (
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-ink-3 bg-[radial-gradient(circle_at_30%_20%,rgba(122,166,208,0.35),transparent_60%),radial-gradient(circle_at_75%_80%,rgba(47,98,147,0.35),transparent_55%),linear-gradient(160deg,var(--ink-2),var(--ink-0))] flex items-center justify-center">
                  <span className="font-[family-name:var(--font-heading)] text-[7rem] leading-none text-ice-100/90 select-none">
                    FF
                  </span>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ice-50">
                    {t("about.name")}
                  </p>
                  <p className="text-xs text-ice-400">
                    {t("about.role")}
                  </p>
                </div>
                <span className="status-pill !text-[9px] whitespace-nowrap">
                  {t("about.available")}
                </span>
              </div>

              <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-ink-3 pt-4">
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.15em] text-ice-500">
                    {t("about.statProjects")}
                  </dt>
                  <dd className="text-lg font-semibold text-ice-50">
                    {projects.length}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.15em] text-ice-500">
                    {t("about.statLive")}
                  </dt>
                  <dd className="text-lg font-semibold text-ice-50">
                    {liveCount}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.15em] text-ice-500">
                    {t("about.statSince")}
                  </dt>
                  <dd className="text-lg font-semibold text-ice-50">2024</dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
