"use client";

import { useState } from "react";
import FrozenKeyboard from "@/components/FrozenKeyboard";
import SmoothScroll from "@/components/smooth-scroll";
import Reveal from "@/components/Reveal";
import SectionNav from "@/components/SectionNav";
import CopyEmail from "@/components/CopyEmail";
import SeasonPicker from "@/components/SeasonPicker";
import LanguagePicker from "@/components/LanguagePicker";
import GitHubActivity from "@/components/GitHubActivity";
import ProjectModal, {
  type ProjectDetail,
} from "@/components/ProjectModal";
import { useLanguage } from "@/components/LanguageProvider";
import type { Lang } from "@/lib/i18n";

const EMAIL = "fadhilfaith2@gmail.com";

// Localised content lives in `{ id, en }` objects inside these arrays so the
// page can be a straightforward array.map() at render time. Tech names stay
// as plain strings (they're brand names, not localised).
type Localised = { id: string; en: string };

type Project = ProjectDetail & {
  align: "left" | "right";
  section: "project1" | "project2" | "project3" | "project4";
};

const projects: Project[] = [
  {
    num: "01",
    name: {
      id: "Aplikasi Kasir Coffee Shop",
      en: "Coffee Shop POS App",
    },
    stack: ["Java", "Apache NetBeans", "MySQL", "CSS"],
    desc: {
      id: "Aplikasi desktop untuk manajemen kasir dan inventaris coffee shop, dibangun dengan Java.",
      en: "Desktop application for cashier management and inventory tracking of a coffee shop, built with Java.",
    },
    details: {
      id: "Aplikasi desktop yang dikembangkan dengan Java dan Apache NetBeans. Dilengkapi sistem kasir, manajemen inventaris produk, riwayat transaksi, dan laporan penjualan. Proyek ini dirancang untuk menyederhanakan operasional harian sebuah coffee shop.",
      en: "Desktop application developed with Java and Apache NetBeans. Features a cashier system, product inventory management, transaction history, and sales reports. Designed to simplify daily operations of a coffee shop.",
    },
    // simple-icons slugs light up the matching 3D keycaps. Java has no icon
    // in that set, so the closest present stack entries are used.
    highlights: ["mysql", "css"],
    media: [
      "/projects/coffee-shop/1-login.png",
      "/projects/coffee-shop/2-admin.png",
      "/projects/coffee-shop/3-kasir.png",
    ],
    align: "left",
    section: "project1",
  },
  {
    num: "02",
    name: {
      id: "Website E-Commerce / Profil UMKM",
      en: "E-Commerce / SME Profile Website",
    },
    stack: ["Laravel", "PHP", "MySQL", "Xampp", "CSS", "Git"],
    desc: {
      id: "Website e-commerce dan profil untuk UMKM dengan panel admin, autentikasi, dan manajemen data.",
      en: "E-commerce and profile website for a small business with admin dashboard, authentication, and data management.",
    },
    details: {
      id: "Website lengkap untuk usaha kecil dan menengah yang dibangun dengan Laravel. Mencakup katalog produk, keranjang belanja, panel admin untuk manajemen inventaris dan pesanan, sistem autentikasi pengguna, serta manajemen data bisnis.",
      en: "Full-featured website for small and medium businesses built with Laravel. Includes product catalogue, shopping cart, admin panel for inventory and order management, user authentication system, and business data management.",
    },
    highlights: ["laravel", "php", "mysql", "css", "git"],
    media: [
      "/projects/umkm/1-daftar.png",
      "/projects/umkm/2-masuk.png",
      "/projects/umkm/3-dashboard.png",
    ],
    align: "right",
    section: "project2",
  },
  {
    num: "03",
    name: {
      id: "Aplikasi Manajemen Bengkel",
      en: "Workshop Management App",
    },
    stack: ["Laravel", "PHP", "MySQL", "Xampp", "CSS", "Git"],
    desc: {
      id: "Sistem untuk bengkel: pencatatan sparepart keluar-masuk, kalkulasi biaya jasa montir, dan riwayat servis kendaraan.",
      en: "System for auto workshops: spare parts tracking, mechanic labor cost calculation, and vehicle service history.",
    },
    details: {
      id: "Aplikasi web berbasis Laravel untuk manajemen bengkel secara menyeluruh. Memungkinkan pencatatan keluar-masuk sparepart, kalkulasi otomatis biaya jasa montir, dan riwayat servis lengkap per kendaraan. Memudahkan kontrol operasional dan keuangan bengkel.",
      en: "Web application built with Laravel for comprehensive auto workshop management. Tracks spare parts in and out, automatically calculates mechanic labor costs, and maintains a complete service history per vehicle. Streamlines operational and financial control of the workshop.",
    },
    highlights: ["laravel", "php", "mysql", "css", "git"],
    media: [
      "/projects/bengkel/1-login.jpg",
      "/projects/bengkel/2-dashboard.jpg",
      "/projects/bengkel/3-laporan.jpg",
    ],
    align: "left",
    section: "project3",
  },
  {
    num: "04",
    name: {
      id: "Madiun Sigap — Platform Layanan Publik",
      en: "Madiun Sigap — Public Services Platform",
    },
    stack: ["Next.js", "JavaScript", "TypeScript", "CSS", "Git"],
    desc: {
      id: "Website layanan publik Kabupaten Madiun dengan fitur pengaduan masyarakat, pengelolaan data, dan sistem pelayanan publik.",
      en: "Public services website for Madiun regency with citizen complaint system and data management.",
    },
    details: {
      id: "Platform web berbasis Next.js untuk Kabupaten Madiun. Memungkinkan warga mengirim pengaduan dan permintaan layanan publik, dengan panel manajemen untuk petugas. Dilengkapi sistem pelacakan kasus, notifikasi, dan laporan pelayanan warga.",
      en: "Web platform built with Next.js for Madiun Regency. Allows citizens to submit complaints and public service requests, with a management panel for officials. Includes case tracking, notifications, and citizen service reports.",
    },
    highlights: [
      "nextdotjs",
      "nodedotjs",
      "react",
      "javascript",
      "typescript",
      "css",
      "git",
      "github",
    ],
    media: [
      "/projects/madiun-siaga/1-dashboard.png",
      "/projects/madiun-siaga/2-laporan.png",
      "/projects/madiun-siaga/3-login_admin.png",
    ],
    align: "right",
    section: "project4",
  },
];

const experiences: Array<{
  role: Localised;
  company: string;
  period: Localised;
  location: Localised;
  summary: Localised;
  bullets: Localised[];
  stack: string[];
}> = [
  {
    role: { id: "Website Developer", en: "Website Developer" },
    company: "Freelance / Proyek Sekolah",
    period: { id: "2024 — Sekarang", en: "2024 — Present" },
    location: { id: "Madiun, Jawa Timur", en: "Madiun, East Java" },
    summary: {
      id: "Siswa Rekayasa Perangkat Lunak (RPL) di SMKN 1 Mejayan dengan pengalaman praktis dalam pengembangan web menggunakan Laravel, Next.js, dan Node.js. Terbiasa bekerja mandiri maupun dalam tim menggunakan Git untuk membangun aplikasi web yang fungsional dan responsif.",
      en: "Software Engineering (RPL) student at SMKN 1 Mejayan with hands-on experience in web development using Laravel, Next.js, and Node.js. Work independently and in teams using Git to build functional and responsive web applications.",
    },
    bullets: [
      {
        id: "Membuat aplikasi kasir dan manajemen inventaris coffee shop berbasis Java desktop menggunakan Apache NetBeans.",
        en: "Built a Java desktop app for cashier and inventory management of a coffee shop.",
      },
      {
        id: "Membangun website e-commerce dan profil UMKM dengan Laravel, dilengkapi panel admin dan autentikasi login.",
        en: "Built e-commerce and profile websites for small businesses with Laravel, including admin panel and authentication.",
      },
      {
        id: "Mengembangkan 'Madiun Sigap', platform layanan publik dengan Node.js untuk pengelolaan pengaduan masyarakat.",
        en: "Developed 'Madiun Sigap', a public services platform with Node.js for citizen complaint management.",
      },
      {
        id: "Berpartisipasi dalam kompetisi teknologi: Inotek Kabupaten Madiun dan Festika Jatim (AREK_AI 2025).",
        en: "Participated in tech competitions: Inotek Kabupaten Madiun and Festika Jatim (AREK_AI 2025).",
      },
    ],
    stack: ["HTML", "CSS", "JavaScript", "Python", "Java", "PHP", "Laravel", "Node.js", "MySQL", "Git"],
  },
];

function pick<T>(loc: { id: T; en: T }, lang: Lang): T {
  return loc[lang];
}

// Hero name split per word so each can rise independently. Whitespace
// preserved as its own span so the line wraps naturally if needed.
function HeroWord({
  text,
  delay,
  className = "",
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className={`hero-word ${className}`}>
      <span style={{ animationDelay: `${delay}ms` }}>{text}</span>
    </span>
  );
}

export default function Home() {
  const { t, lang } = useLanguage();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <SmoothScroll>
      <div className="relative">
        {/* Persistent 3D scene — fullscreen behind content; events must reach it. */}
        <div className="fixed inset-0 z-0">
          <FrozenKeyboard />
        </div>

        {/* Header */}
        <header className="fixed top-0 inset-x-0 z-50 px-6 sm:px-10 md:px-14 py-5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <span
              data-cursor="hover"
              className="text-sm font-semibold tracking-tight text-ice-100"
            >
              Fadhil Faith
            </span>
            <span className="status-pill hidden sm:inline-flex">
              {t("header.availability")}
            </span>
          </div>
          <div className="flex items-center gap-2 pointer-events-auto">
            <SeasonPicker />
            <a
              href="https://github.com/fadhilfaith48"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="frost-btn !py-1.5 !px-3 !text-xs"
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden>
                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span>GitHub</span>
            </a>
            <LanguagePicker />
          </div>
        </header>

        <SectionNav />

        <main className="relative z-10 pointer-events-none">
          {/* Hero */}
          <section
            data-kb-section="hero"
            className="min-h-screen flex flex-col justify-center p-6 sm:p-10 md:p-14"
          >
            <div className="mt-20">
              <p
                className="text-[11px] uppercase tracking-[0.3em] text-ice-300 mb-5 fade-in-up"
                style={{ ["--d" as string]: "0ms" }}
              >
                {t("hero.greeting")}
              </p>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bold tracking-[-0.03em] text-ice-50 leading-[0.92] whitespace-nowrap">
                <HeroWord text="Fadhil" delay={120} />
                <br />
                <HeroWord text="Faith" delay={260} className="text-ice-400" />
              </h1>
              <p
                className="mt-8 text-base sm:text-lg md:text-xl text-ice-200 max-w-xl leading-relaxed fade-in-up"
                style={{ ["--d" as string]: "520ms" }}
              >
                {t("hero.roleLine")}
                <br />
                {t("hero.tagline")}
              </p>

              {/* CTAs */}
              <div
                className="mt-10 flex flex-wrap items-center gap-3 pointer-events-auto fade-in-up"
                style={{ ["--d" as string]: "700ms" }}
              >
                <a
                  href="/cv_fadhil.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn frost-btn--primary"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
                    <path d="M14 3v5h5" />
                  </svg>
                  {t("hero.cv")}
                </a>
                <button
                  type="button"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn"
                  onClick={() =>
                    document
                      .querySelector<HTMLElement>(
                        '[data-kb-section="contact"]'
                      )
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  {t("hero.hire")}
                </button>
                <a
                  href="https://github.com/fadhilfaith48"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-icon"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden>
                    <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/fadhil-faith"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-icon"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.4 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.59c0-1.57-.03-3.6-2.19-3.6-2.19 0-2.53 1.71-2.53 3.48V22H7.62V8z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Animated scroll indicator at bottom */}
            <div
              className="mt-auto flex items-center gap-3 fade-in-up"
              style={{ ["--d" as string]: "900ms" }}
            >
              <span className="scroll-indicator">
                <span>{t("hero.scroll")}</span>
                <span className="scroll-indicator__rail" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-ice-400 hidden sm:inline">
                {t("hero.keysHint")}
              </span>
            </div>
          </section>

          {/* Stack */}
          <section
            data-kb-section="stack"
            className="relative min-h-[200vh] p-6 sm:p-10 md:p-14"
          >
            <div className="relative h-[150vh]">
              <div className="sticky top-24 sm:top-28 text-center">
                <Reveal>
                  <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95]">
                    {t("stack.title")}
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="mt-3 text-sm sm:text-base text-ice-400">
                    {t("stack.hint")}
                  </p>
                </Reveal>
              </div>
            </div>
          </section>

          {/* Experience — title is sticky at top-24 (feels anchored) but sits
              BEHIND the cards (z-0 vs. card wrapper's z-10), so as you scroll
              the card slides over the title. The section has no extra filler
              beyond the cards, so when you scroll past the last card the
              section ends and the title un-pins and exits the viewport at the
              same time — giving the "anchored then both disappear" feel. */}
          <section
            data-kb-section="experience"
            className="relative p-6 sm:p-10 md:p-14 pb-24"
          >
            <div className="sticky top-24 sm:top-28 text-center mb-12 sm:mb-16 z-0">
              <Reveal>
                <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95]">
                  {t("experience.title")}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-3 text-sm sm:text-base text-ice-300">
                  {t("experience.subtitle")}
                </p>
              </Reveal>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              {experiences.map((exp, idx) => (
                <Reveal
                  key={`${exp.company}-${idx}`}
                  delay={idx * 120}
                  as="article"
                  className="relative rounded-2xl bg-ink-1/75 backdrop-blur-md border border-ink-3 p-6 sm:p-8 md:p-10 pointer-events-auto shadow-[0_8px_40px_-20px_rgba(0,0,0,0.6)]"
                >
                  <header className="flex flex-wrap items-start justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-ice-50 tracking-tight">
                        {pick(exp.role, lang)}
                      </h3>
                      <p className="text-ice-400 font-medium mt-1">
                        {exp.company}
                        <span className="text-ice-500/80 font-normal">
                          {" · "}
                          {pick(exp.location, lang)}
                        </span>
                      </p>
                    </div>
                    <span className="font-mono text-xs text-ice-100 px-3 py-1 rounded-full border border-ice-700/70 bg-ink-2/60 whitespace-nowrap">
                      {pick(exp.period, lang)}
                    </span>
                  </header>

                  <p className="text-ice-200 leading-relaxed mb-5">
                    {pick(exp.summary, lang)}
                  </p>

                  <ul className="space-y-2.5 mb-6">
                    {exp.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-ice-100 leading-relaxed"
                      >
                        <span className="mt-[0.65em] flex-none w-1.5 h-1.5 rounded-full bg-ice-400" />
                        <span>{pick(b, lang)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.map((s) => (
                      <span
                        key={s}
                        data-cursor="hover"
                        className="frost-chip"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Projects */}
          {projects.map((p) => (
            <section
              key={p.num}
              data-kb-section={p.section}
              data-kb-highlights={(p.highlights ?? []).join(",")}
              className="relative min-h-screen flex items-center p-6 sm:p-10 md:p-14 overflow-hidden"
            >
              <span
                aria-hidden
                className={`watermark top-1/2 -translate-y-1/2 ${
                  p.align === "left" ? "right-[-2vw]" : "left-[-2vw]"
                }`}
              >
                {p.num}
              </span>

              <div
                className={
                  p.align === "left"
                    ? "max-w-xl relative"
                    : // Right-aligned cards get extra right padding on md+ so
                      // the action buttons ("Ver más") don't sit under the
                      // fixed SectionNav dots on the right edge.
                      "max-w-xl ml-auto text-right relative md:mr-16 lg:mr-24"
                }
              >
                <Reveal>
                  <p className="font-mono text-sm text-ice-400 mb-3">
                    {p.num} · {t("projects.kicker")}
                  </p>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ice-50 leading-[1.05] mb-4">
                    {pick(p.name, lang)}
                  </h2>
                </Reveal>
                {p.badge ? (
                  <Reveal delay={140}>
                    <span className="inline-block text-[10px] uppercase tracking-widest text-ice-300 border border-ice-700 rounded-full px-2 py-0.5 mb-4">
                      {pick(p.badge, lang)}
                    </span>
                  </Reveal>
                ) : null}
                <Reveal delay={180}>
                  <p className="text-base sm:text-lg text-ice-200 leading-relaxed mb-6">
                    {pick(p.desc, lang)}
                  </p>
                </Reveal>
                <Reveal delay={260}>
                  <div
                    className={
                      p.align === "right"
                        ? "flex flex-wrap gap-1.5 justify-end pointer-events-auto mb-5"
                        : "flex flex-wrap gap-1.5 pointer-events-auto mb-5"
                    }
                  >
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        data-cursor="hover"
                        className="frost-chip"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={320}>
                  <div
                    className={
                      p.align === "right"
                        ? "flex justify-end pointer-events-auto"
                        : "flex pointer-events-auto"
                    }
                  >
                    <button
                      type="button"
                      onClick={() => setActiveProject(p)}
                      data-cursor="hover"
                      data-magnetic
                      className="frost-btn"
                    >
                      {t("projects.viewMore")}
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </Reveal>
              </div>
            </section>
          ))}

          {/* GitHub Activity */}
          <section
            data-kb-section="github"
            className="relative min-h-screen p-6 sm:p-10 md:p-14 pb-24"
          >
            <GitHubActivity />
          </section>

          {/* Contact — copy pinned to the left so the (large, hero-posed)
              keyboard on the right has room to bob its random keys. */}
          <section
            data-kb-section="contact"
            className="relative min-h-screen flex flex-col justify-center p-6 sm:p-10 md:p-14 overflow-hidden"
          >
            <div className="max-w-xl relative">
              <Reveal>
                <p className="font-mono text-sm text-ice-400 mb-3">
                  {t("contact.kicker")}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight text-ice-50 mb-6">
                  {t("contact.title")}
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-ice-200 mb-10">{t("contact.body")}</p>
              </Reveal>
              <Reveal delay={240}>
                <div className="flex flex-wrap gap-3 pointer-events-auto">
                  <CopyEmail
                    email={EMAIL}
                    className="frost-btn frost-btn--primary"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                    {t("contact.copyEmail")}
                  </CopyEmail>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&to=${EMAIL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    {t("contact.openMail")}
                  </a>
                  <a
                    href="https://github.com/fadhilfaith48"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    {t("contact.github")}
                  </a>
                  <a
                    href="https://www.linkedin.com/in/fadhil-faith"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    {t("contact.linkedin")}
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={320}>
              <p className="mt-14 text-[11px] uppercase tracking-[0.25em] text-ice-400">
                {t("contact.footer")}
              </p>
            </Reveal>
          </section>
        </main>

        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </SmoothScroll>
  );
}
