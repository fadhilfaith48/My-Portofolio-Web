"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import Carousel from "@/components/Carousel";
import LanguagePicker from "@/components/LanguagePicker";
import { useLanguage } from "@/components/LanguageProvider";
import type { Lang } from "@/lib/i18n";
import { EMAIL, SITE_NAME, type Project } from "@/lib/content";

type Props = {
  project: Project;
  previous: Project | null;
  next: Project | null;
};

function pick<T>(loc: { id: T; en: T }, lang: Lang): T {
  return loc[lang];
}

// Shareable, indexable case-study page. The homepage modal is built for quick
// browsing; this page is the canonical URL for a project, so it can be linked
// from the CV, GitHub, or a recruiter chat.
export default function ProjectCaseStudy({ project, previous, next }: Props) {
  const { t, lang } = useLanguage();
  const name = pick(project.name, lang);
  const year = new Date().getFullYear();

  return (
    <div className="relative z-10 min-h-svh">
      <header className="sticky top-0 z-40 px-4 sm:px-8 py-4 flex items-center justify-between gap-4 bg-ink-0/70 backdrop-blur-md border-b border-ink-3/60">
        <Link
          href="/"
          data-cursor="hover"
          className="inline-flex items-center gap-2 text-sm text-ice-200 hover:text-ice-50 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M19 12H5M11 19l-7-7 7-7" />
          </svg>
          {t("projects.back")}
        </Link>
        <Link
          href="/"
          className="hidden sm:block text-sm font-semibold tracking-tight text-ice-100"
        >
          {SITE_NAME}
        </Link>
        <LanguagePicker />
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 sm:px-8 py-12 sm:py-16">
        <Reveal>
          <p className="font-mono text-sm text-ice-400 mb-3">
            {project.num} · {t("projects.kicker")}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-ice-50 leading-[1.05] mb-4">
            {name}
          </h1>
        </Reveal>

        {project.badge ? (
          <Reveal delay={100}>
            <span className="inline-block text-[10px] uppercase tracking-widest text-ice-300 border border-ice-700 rounded-full px-2 py-0.5 mb-5">
              {pick(project.badge, lang)}
            </span>
          </Reveal>
        ) : null}

        <Reveal delay={140}>
          <p className="max-w-2xl text-lg sm:text-xl text-ice-200 leading-relaxed mb-7">
            {pick(project.desc, lang)}
          </p>
        </Reveal>

        {(project.url || project.github) && (
          <Reveal delay={180}>
            <div className="flex flex-wrap gap-3 mb-12">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn frost-btn--primary"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden
                  >
                    <path d="M7 17L17 7M8 7h9v9" />
                  </svg>
                  {t("projects.openSite")}
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn"
                >
                  {t("projects.viewCode")}
                </a>
              )}
            </div>
          </Reveal>
        )}

        <Reveal delay={220}>
          <div className="project-detail__media">
            <Carousel
              media={project.media}
              projectNum={project.num}
              altPrefix={`${name} — ${t("projects.kicker")}`}
            />
          </div>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] mt-12">
          <section aria-labelledby="project-stack">
            <h2
              id="project-stack"
              className="text-[11px] uppercase tracking-[0.25em] text-ice-400 mb-3"
            >
              {t("projects.stackLabel")}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span key={s} className="frost-chip">
                  {s}
                </span>
              ))}
            </div>
          </section>

          <section aria-labelledby="project-summary">
            <h2
              id="project-summary"
              className="text-[11px] uppercase tracking-[0.25em] text-ice-400 mb-3"
            >
              {t("projects.summaryLabel")}
            </h2>
            <p className="text-ice-200 leading-relaxed whitespace-pre-line">
              {pick(project.details, lang)}
            </p>
          </section>
        </div>

        {project.impact && project.impact.length > 0 && (
          <section
            aria-labelledby="project-impact"
            className="mt-12 pt-10 border-t border-white/10"
          >
            <h2
              id="project-impact"
              className="text-[11px] uppercase tracking-[0.25em] text-ice-400 mb-5"
            >
              {t("projects.impactLabel")}
            </h2>
            <ol className="space-y-4">
              {project.impact.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    aria-hidden
                    className="font-mono text-xs text-ice-500 pt-1 shrink-0"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-ice-100 leading-relaxed">
                    {pick(item, lang)}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className="mt-14 rounded-2xl border border-ink-3 bg-ink-1/70 backdrop-blur-md p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ice-50 mb-2">
            {t("projects.ctaTitle")}
          </h2>
          <p className="text-ice-200 mb-5">{t("projects.ctaBody")}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#contact"
              data-cursor="hover"
              className="frost-btn frost-btn--primary"
            >
              {t("projects.ctaAction")}
            </Link>
            <a
              href={`mailto:${EMAIL}`}
              data-cursor="hover"
              className="frost-btn"
            >
              {EMAIL}
            </a>
          </div>
        </section>

        {(previous || next) && (
          <nav
            aria-label={t("projects.back")}
            className="mt-10 grid gap-4 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/projects/${previous.slug}`}
                data-cursor="hover"
                className="group rounded-2xl border border-ink-3 bg-ink-1/50 p-5 transition-colors hover:border-ice-500/60"
              >
                <span className="block text-[11px] uppercase tracking-[0.25em] text-ice-400 mb-2">
                  {t("projects.previous")}
                </span>
                <span className="text-ice-100 font-medium group-hover:text-ice-50">
                  {pick(previous.name, lang)}
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" aria-hidden />
            )}
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                data-cursor="hover"
                className="group rounded-2xl border border-ink-3 bg-ink-1/50 p-5 transition-colors hover:border-ice-500/60 sm:text-right"
              >
                <span className="block text-[11px] uppercase tracking-[0.25em] text-ice-400 mb-2">
                  {t("projects.next")}
                </span>
                <span className="text-ice-100 font-medium group-hover:text-ice-50">
                  {pick(next.name, lang)}
                </span>
              </Link>
            ) : null}
          </nav>
        )}

        <p className="mt-14 text-[11px] uppercase tracking-[0.25em] text-ice-400">
          © {year} {SITE_NAME}. {t("contact.footer")}
        </p>
      </main>
    </div>
  );
}
