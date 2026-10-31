"use client";

import Link from "next/link";
import LanguagePicker from "@/components/LanguagePicker";
import { useLanguage } from "@/components/LanguageProvider";

// Bilingual 404. The root layout already renders the aurora/snow background,
// so this only has to sit on top of it and offer a way back.
export default function NotFoundView() {
  const { t } = useLanguage();

  return (
    <div className="relative z-10 min-h-svh flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-ice-400 tracking-[0.3em] mb-4">
        {t("notFound.kicker")}
      </p>
      <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-ice-50 leading-[1.05]">
        {t("notFound.title")}
      </h1>
      <p className="text-ice-200 mt-5 mb-9 max-w-md leading-relaxed">
        {t("notFound.body")}
      </p>
      <Link
        href="/"
        data-cursor="hover"
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
          <path d="M19 12H5M11 19l-7-7 7-7" />
        </svg>
        {t("notFound.back")}
      </Link>

      <div className="mt-12">
        <LanguagePicker />
      </div>
    </div>
  );
}
