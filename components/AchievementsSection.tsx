"use client";

import { useLanguage } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import { achievements, certificates, type Achievement } from "@/lib/content";

const KIND_STYLES: Record<Achievement["kind"], string> = {
  organisasi: "border-ice-500/40 text-ice-200",
  kompetisi: "border-amber-400/30 text-amber-100/90",
  sertifikat: "border-emerald-400/30 text-emerald-100/90",
};

// Organisasi, kompetisi, and certificates in one section. Deliberately
// labels competition entries as participation until a certificate file or
// award is confirmed — no invented rankings.
export default function AchievementsSection() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="achievements"
      data-kb-section="achievements"
      className="scroll-mt-24 relative p-6 sm:p-10 md:p-14 pb-24"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <Reveal>
            <p className="font-mono text-sm text-ice-400 mb-3">
              {t("achievements.kicker")}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight text-ice-50 leading-[1.02]">
              {t("achievements.title")}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-3 text-sm sm:text-base text-ice-300 max-w-xl mx-auto">
              {t("achievements.subtitle")}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((item, i) => (
            <Reveal
              key={item.title.en}
              delay={i * 100}
              as="article"
              className="relative flex flex-col rounded-2xl bg-ink-1/75 backdrop-blur-md border border-ink-3 p-6 pointer-events-auto shadow-[0_8px_40px_-20px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] ${
                    KIND_STYLES[item.kind]
                  }`}
                >
                  {t(`achievements.kind.${item.kind}`)}
                </span>
                {item.period ? (
                  <span className="font-mono text-[10px] text-ice-400">
                    {item.period[lang]}
                  </span>
                ) : null}
              </div>

              <h3 className="text-lg font-semibold text-ice-50 leading-snug">
                {item.title[lang]}
              </h3>
              <p className="text-xs text-ice-400 mt-1 mb-3">{item.org[lang]}</p>

              <p className="text-sm text-ice-200 leading-relaxed">
                {item.summary[lang]}
              </p>

              {item.bullets && item.bullets.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {item.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      className="flex gap-2.5 text-xs text-ice-200 leading-relaxed"
                    >
                      <span className="mt-[0.55em] flex-none w-1 h-1 rounded-full bg-ice-400" />
                      <span>{b[lang]}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-auto pt-5 flex flex-wrap gap-2">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn !py-1.5 !px-3 !text-xs"
                  >
                    {t("achievements.open")}
                  </a>
                ) : null}
                {item.certificate ? (
                  <a
                    href={item.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn !py-1.5 !px-3 !text-xs"
                  >
                    {t("achievements.certificate")}
                  </a>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>

        {certificates.length > 0 ? (
          <div className="mt-14">
            <Reveal>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ice-50 mb-6">
                {t("achievements.certificatesTitle")}
              </h3>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certificates.map((cert, i) => (
                <Reveal key={cert.file} delay={i * 80}>
                  <a
                    href={cert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="group flex items-start justify-between gap-3 rounded-2xl bg-ink-1/75 backdrop-blur-md border border-ink-3 p-4 pointer-events-auto transition-colors hover:border-ice-500/60"
                  >
                    <div>
                      <p className="text-sm font-medium text-ice-50">
                        {cert.title[lang]}
                      </p>
                      <p className="text-xs text-ice-400 mt-1">
                        {cert.issuer[lang]} · {cert.year}
                      </p>
                    </div>
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="flex-none text-ice-400 group-hover:text-ice-100 transition-colors"
                      aria-hidden
                    >
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
