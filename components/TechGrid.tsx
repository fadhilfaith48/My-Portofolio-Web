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

// `simple-icons` v16 dropped the VS Code mark (Microsoft brand request), so
// the official path is kept locally. Source: simple-icons v11, license CC0.
const LOCAL_ICONS: Record<string, { path: string; title: string }> = {
  vscode: {
    title: "Visual Studio Code",
    path: "M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z",
  },
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
              const icon = item.icon
                ? ICONS[item.icon] ?? LOCAL_ICONS[item.icon]
                : undefined;
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
