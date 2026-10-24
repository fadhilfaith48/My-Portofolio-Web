"use client";

import {
  siCss,
  siGit,
  siGithub,
  siGo,
  siHtml5,
  siJavascript,
  siLaragon,
  siLaravel,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siTailwindcss,
  siTypescript,
  siVercel,
  siXampp,
} from "simple-icons";
import { useLanguage } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import { techGroups } from "@/lib/content";

// Both `simple-icons` and `lib/content.ts` use the same slug vocabulary the
// 3D keyboard already uses, so a tech only has to be listed once per file.
const ICONS: Record<string, { path: string; title: string }> = {
  nextdotjs: siNextdotjs,
  react: siReact,
  typescript: siTypescript,
  javascript: siJavascript,
  tailwindcss: siTailwindcss,
  html5: siHtml5,
  css: siCss,
  laravel: siLaravel,
  php: siPhp,
  nodedotjs: siNodedotjs,
  go: siGo,
  openjdk: siOpenjdk,
  python: siPython,
  mysql: siMysql,
  postgresql: siPostgresql,
  redis: siRedis,
  git: siGit,
  github: siGithub,
  xampp: siXampp,
  laragon: siLaragon,
  vercel: siVercel,
};

// Readable, touch-friendly counterpart to the hover-only 3D keyboard.
export default function TechGrid() {
  const { lang } = useLanguage();

  return (
    <div id="tech-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {techGroups.map((group, gi) => (
        <Reveal
          key={group.title.en}
          delay={gi * 90}
          as="div"
          className="rounded-2xl bg-ink-1/75 backdrop-blur-md border border-ink-3 p-5 pointer-events-auto"
        >
          <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-ice-400 mb-4">
            {group.title[lang]}
          </h3>
          <ul className="space-y-2">
            {group.items.map((item) => {
              const icon = item.icon ? ICONS[item.icon] : undefined;
              return (
                <li
                  key={item.name}
                  className="flex items-center gap-2.5 text-sm text-ice-100"
                >
                  {icon ? (
                    <svg
                      viewBox="0 0 24 24"
                      width="15"
                      height="15"
                      fill="currentColor"
                      className="flex-none text-ice-300"
                      aria-hidden
                    >
                      <path d={icon.path} />
                    </svg>
                  ) : (
                    <span className="flex-none w-[15px] h-[15px] rounded-full border border-ice-500/50" />
                  )}
                  <span>{item.name}</span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
