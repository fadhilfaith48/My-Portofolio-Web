"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSeason } from "@/components/SeasonProvider";
import { useLanguage } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import type { Lang } from "@/lib/i18n";

type Contribution = { date: string; count: number; level: number };

type GitHubUser = {
  login: string;
  name: string | null;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

type GitHubRepo = {
  name: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
};

const USERNAME = "fadhilfaith48";
const PROFILE_URL = `https://github.com/${USERNAME}`;

const MONTHS_ID = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];
const MONTHS_EN = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function monthAbbrev(d: Date, lang: Lang): string {
  return (lang === "id" ? MONTHS_ID : MONTHS_EN)[d.getMonth()] ?? "";
}

function fmtDay(dateStr: string, lang: Lang): string {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getDate()} ${monthAbbrev(d, lang)} ${d.getFullYear()}`;
}

function srcKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}`;
}

// Accent-based heatmap levels following the current season theme.
function cellColor(accent: string, alpha: number): string {
  const hex = accent.replace(/^#/, "");
  if (hex.length === 3) {
    return `rgba(${parseInt(hex[0] + hex[0], 16)}, ${parseInt(
      hex[1] + hex[1], 16
    )}, ${parseInt(hex[2] + hex[2], 16)}, ${alpha})`;
  }
  return `rgba(${parseInt(hex.slice(0, 2), 16)}, ${parseInt(
    hex.slice(2, 4), 16
  )}, ${parseInt(hex.slice(4, 6), 16)}, ${alpha})`;
}

// GitHub renders one column per week starting on a Sunday. `months` holds a
// label for the first column of each month so the caller can render the
// month axis above the cells.
function buildGrid(
  contributions: Contribution[],
  lang: Lang
): { grid: (Contribution | null)[][]; months: string[] } {
  if (contributions.length === 0) return { grid: [], months: [] };
  const first = new Date(contributions[0].date);
  const startWeekday = first.getDay();
  const cols = Math.ceil((contributions.length + startWeekday) / 7);

  const grid: (Contribution | null)[][] = Array.from(
    { length: 7 },
    () => Array<Contribution | null>(cols).fill(null)
  );
  contributions.forEach((c, i) => {
    const cell = startWeekday + i;
    const col = Math.floor(cell / 7);
    const row = cell % 7;
    if (col < cols) grid[row][col] = c;
  });

  const months: string[] = Array(cols).fill("");
  const colStart = new Date(first);
  colStart.setDate(colStart.getDate() - startWeekday);
  let prevMonth = -1;
  for (let k = 0; k < cols; k++) {
    const d = new Date(colStart);
    d.setDate(colStart.getDate() + k * 7);
    if (d.getMonth() !== prevMonth) {
      months[k] = monthAbbrev(d, lang).toUpperCase();
      prevMonth = d.getMonth();
    }
  }
  return { grid, months };
}

// Group the period into months (13 bars for the rolling 12-month window,
// 12 bars for a calendar year).
function monthly(
  contributions: Contribution[],
  lang: Lang
): { label: string; year: number; count: number }[] {
  const map = new Map<
    string,
    { year: number; month: number; count: number }
  >();
  for (const c of contributions) {
    const d = new Date(c.date + "T00:00:00");
    const key = srcKey(d);
    const cur = map.get(key) ?? { year: d.getFullYear(), month: d.getMonth(), count: 0 };
    cur.count += c.count;
    map.set(key, cur);
  }
  return [...map.values()]
    .sort((a, b) => a.year - b.year || a.month - b.month)
    .map((x) => ({
      year: x.year,
      count: x.count,
      label: monthAbbrev(new Date(x.year, x.month, 1), lang).toUpperCase(),
    }));
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3l2.916 5.91 6.524.948-4.72 4.6 1.114 6.494L12 18.348l-5.834 3.064 1.114-6.494-4.72-4.6 6.524-.948L12 3z" />
    </svg>
  );
}

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

export default function GitHubActivity() {
  const { t, lang } = useLanguage();
  const { palette } = useSeason();

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [totalCommits, setTotalCommits] = useState(0);
  const [period, setPeriod] = useState("last");
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  // Monotonic token identifying the newest contributions request. Switching
  // range tabs fires overlapping fetches, and without this guard a slower
  // earlier response can land after a faster later one and overwrite the
  // chart with the wrong period.
  const requestIdRef = useRef(0);

  const years = useMemo(() => {
    if (!user?.created_at) return [];
    const startYear = Math.max(
      2024,
      new Date(user.created_at).getFullYear()
    );
    const currentYear = new Date().getFullYear();
    const list: string[] = [];
    for (let y = currentYear; y >= startYear; y--) list.push(String(y));
    return list;
  }, [user]);

  // Returns "stale" when a newer request superseded this one, so callers can
  // avoid writing state (or flipping status) for a period that is no longer
  // selected.
  const loadContributions = useCallback(
    async (p: string): Promise<"ok" | "fail" | "stale"> => {
      const id = ++requestIdRef.current;
      setContributions([]);
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${p}`,
          { headers: { Accept: "application/json" } }
        );
        if (!res.ok) throw new Error("github contributions");
        const data = (await res.json()) as { contributions?: Contribution[] };
        if (id !== requestIdRef.current) return "stale";
        setContributions(data.contributions ?? []);
        return "ok";
      } catch {
        return id === requestIdRef.current ? "fail" : "stale";
      }
    },
    []
  );

  const reload = useCallback(
    async (p: string) => {
      setStatus("loading");
      try {
        const res = await fetch("/api/github", {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("github proxy");

        const data = (await res.json()) as {
          user: GitHubUser | null;
          repos: GitHubRepo[];
          totalCommits: number;
        };

        const periodResult = await loadContributions(p);
        // A newer period request took over while we were fetching the
        // profile — it owns the status now, so don't overwrite it.
        if (periodResult === "stale") return;

        if (!data.user && data.repos.length === 0 && periodResult === "fail") {
          throw new Error("github: no data");
        }

        setUser(data.user);
        setRepos(data.repos ?? []);
        setTotalCommits(data.totalCommits ?? 0);
        setStatus("ok");
      } catch {
        setStatus("error");
      }
    },
    [loadContributions]
  );

  useEffect(() => {
    void reload(period);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePeriod = useCallback(
    async (p: string) => {
      setPeriod(p);
      setStatus("loading");
      const result = await loadContributions(p);
      if (result === "stale") return;
      setStatus(result === "ok" ? "ok" : "error");
    },
    [loadContributions]
  );

  const stats = useMemo(() => {
    let total = 0;
    for (let i = 0; i < contributions.length; i++) total += contributions[i].count;

    // Walk back over days with no contributions, then count the run that
    // ends there. A calendar year ends on Dec 31 and a rolling window ends
    // today, so both usually trail off with empty days — without skipping
    // them first, the streak would always read 0 for past years. Only the
    // trailing empties are skipped; a genuine gap inside the run still
    // breaks it.
    let i = contributions.length - 1;
    while (i >= 0 && contributions[i].count === 0) i--;
    let streak = 0;
    for (; i >= 0; i--) {
      if (contributions[i].count > 0) streak++;
      else break;
    }

    const totalStars = repos.reduce((s, repo) => s + repo.stargazers_count, 0);
    return {
      total,
      streak,
      commits: totalCommits,
      repos: user?.public_repos ?? 0,
      totalStars,
      followers: user?.followers ?? 0,
    };
  }, [contributions, repos, totalCommits, user]);

  const { grid, months } = useMemo(
    () => buildGrid(contributions, lang),
    [contributions, lang]
  );

  const bars = useMemo(
    () => monthly(contributions, lang),
    [contributions, lang]
  );
  const maxBar = Math.max(1, ...bars.map((b) => b.count));
  const cols = grid[0]?.length ?? 0;
  const CHART_H = 130;
  const num = (n: number) => n.toLocaleString(lang === "id" ? "id-ID" : "en-US");
  const contribWord = t("github.contributions");

  const rows: { label: string; value: number; unit: string }[] = [
    { label: "TOTAL", value: stats.total, unit: t("github.unitTotal") },
    { label: "STREAK", value: stats.streak, unit: t("github.unitStreak") },
    { label: "COMMIT", value: stats.commits, unit: t("github.unitCommit") },
    { label: "REPO", value: stats.repos, unit: t("github.unitRepo") },
  ];

  const tabs = [
    { key: "last", label: t("github.period12") },
    ...years.map((y) => ({ key: y, label: y })),
  ];

  const levelAlpha = [0.08, 0.22, 0.42, 0.68, 1];

  return (
    <section
      data-kb-section="github"
      data-kb-highlights="github,git"
      className="relative p-6 sm:p-10 md:p-14 pb-24"
    >
      {/* Subtle dark decorative ring behind the heatmap, bottom-right */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[280px] -right-[200px] z-0 block opacity-60 w-[520px] h-[520px] rounded-full border-[95px] border-ink-3"
      />

      <div className="relative z-10 mx-auto max-w-[1320px] grid grid-cols-1 lg:grid-cols-[5fr_8fr] gap-x-16 gap-y-16">
        {/* Left column: heading + stats table + full profile link */}
        <div className="flex flex-col">
          <Reveal>
            <p className="font-mono text-[13px] uppercase tracking-[0.15em] text-ice-400">
              {"//"} {t("github.kicker")}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="mt-5 text-6xl sm:text-8xl lg:text-[96px] leading-[0.9] tracking-[-0.01em] text-ice-50"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              STILL
              <br />
              BUILDING
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <dl className="mt-12 w-full max-w-[560px]">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[110px_1fr] sm:grid-cols-[155px_1fr] items-baseline gap-4 border-t-2 border-ink-3 py-4"
                >
                  <dt className="font-mono text-[12px] uppercase tracking-[0.15em] text-ice-400">
                    {row.label}
                  </dt>
                  <dd className="text-lg sm:text-xl text-ice-300">
                    <span className="font-bold text-ice-50">{num(row.value)}</span>
                    <span className="ml-2">{row.unit}</span>
                  </dd>
                </div>
              ))}
              <div className="border-b-2 border-ink-3" />
            </dl>
          </Reveal>

          <Reveal delay={240}>
            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="mt-14 inline-flex items-center gap-2 font-mono text-[14px] uppercase tracking-[0.18em] text-ice-100 border-b-2 border-ice-500 pb-1 w-max pointer-events-auto hover:text-ice-50 hover:border-ice-50 transition-colors"
            >
              {t("github.fullProfile")}
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
                <path d="M7 17L17 7M8 7h9v9" />
              </svg>
            </a>
          </Reveal>
        </div>

        {/* Right column: mini stats, range tabs, bar chart, heatmap */}
        <div className="flex flex-col min-w-0">
          {/* Mini stats, top right */}
          <Reveal>
            <div className="flex items-center justify-end gap-8">
              <span className="inline-flex items-center gap-2" title={t("github.stars")}>
                <StarIcon className="w-[18px] h-[18px] text-ice-400" />
                <span className="font-mono text-lg font-bold text-ice-50">
                  {num(stats.totalStars)}
                </span>
              </span>
              <span
                className="inline-flex items-center gap-2"
                title={t("github.followers")}
              >
                <PersonIcon className="w-[18px] h-[18px] text-ice-400" />
                <span className="font-mono text-lg font-bold text-ice-50">
                  {num(stats.followers)}
                </span>
              </span>
            </div>
          </Reveal>

          {/* Range tabs */}
          <Reveal delay={80}>
            <div className="flex items-center justify-end gap-2 mt-8 pointer-events-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => changePeriod(tab.key)}
                  data-cursor="hover"
                  className={`font-mono text-[12px] uppercase tracking-[0.15em] px-3.5 py-2 transition-colors duration-200 ${
                    period === tab.key
                      ? "bg-ice-100 text-background"
                      : "text-ice-400 border-b-2 border-ink-3 hover:text-ice-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Loading / error */}
          {status === "loading" && (
            <div className="mt-16 animate-pulse space-y-3">
              <div className="h-[130px] w-full rounded-lg bg-ink-1/80 border border-ink-3" />
              <div className="h-24 w-full rounded-lg bg-ink-1/80 border border-ink-3" />
            </div>
          )}

          {status === "error" && (
            <div className="mt-16 w-full text-center">
              <p className="text-sm text-ice-300">{t("github.error")}</p>
              <button
                type="button"
                onClick={() => reload(period)}
                data-cursor="hover"
                className="mt-6 font-mono text-[12px] uppercase tracking-[0.15em] text-background bg-ice-100 px-4 py-2 pointer-events-auto"
              >
                {lang === "id" ? "Coba lagi" : "Retry"}
              </button>
            </div>
          )}

          {status === "ok" && (
            <>
              {/* Monthly bar chart */}
              <Reveal delay={120}>
                <div className="mt-14 overflow-x-auto pb-1 w-full">
                  <div
                    className="flex items-end justify-between gap-0 w-max min-w-full"
                    style={{ height: CHART_H }}
                  >
                    {bars.map((bar) => {
                      const h =
                        bar.count > 0 ? Math.max(4, (bar.count / maxBar) * CHART_H) : 4;
                      return (
                        <div
                          key={`${bar.year}-${bar.label}`}
                          className="flex flex-col items-center flex-1 min-w-[34px] sm:min-w-[38px]"
                        >
                          <div
                            className="flex items-end rounded-t-sm"
                            style={{ height: CHART_H }}
                          >
                            <div
                              className="w-6 sm:w-8 rounded-t-sm bg-ice-100"
                              style={{ height: h }}
                              title={`${bar.label} ${bar.year}: ${bar.count} ${contribWord}`}
                            />
                          </div>
                          <span className="mt-2 font-mono text-[10px] uppercase text-ice-500">
                            {bar.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>

              {/* Contribution heatmap — scrolls horizontally in its own container */}
              {cols > 0 && (
                <Reveal delay={200}>
                  <div className="mt-12 overflow-x-auto pb-2 w-full">
                    {/* Month axis — same 12px/3px column rhythm as the cells
                        below, so each label sits over the week its month
                        starts in. */}
                    <div
                      className="grid w-max mb-1"
                      style={{
                        gridTemplateColumns: `repeat(${cols}, 12px)`,
                        gap: "3px",
                      }}
                    >
                      {months.map((m, c) => (
                        <span
                          key={c}
                          className="font-mono text-[9px] uppercase text-ice-500 whitespace-nowrap"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                    <div
                      className="grid w-max"
                      style={{
                        gridTemplateColumns: `repeat(${cols}, 12px)`,
                        gridTemplateRows: "repeat(7, 12px)",
                        gap: "3px",
                      }}
                    >
                      {/* Cells */}
                      {grid.map((row, r) =>
                        row.map((cell, c) =>
                          cell ? (
                            <span
                              key={`${r}-${c}`}
                              className="block rounded-[2px]"
                              title={`${fmtDay(cell.date, lang)}: ${cell.count} ${contribWord}`}
                              style={{
                                gridRow: r + 1,
                                gridColumn: c + 1,
                                background: cellColor(
                                  palette.accent,
                                  levelAlpha[cell.level] ?? levelAlpha[0]
                                ),
                              }}
                            />
                          ) : null
                        )
                      )}
                    </div>
                  </div>
                  {/* Legend */}
                  <div className="mt-3 flex items-center justify-start gap-2 font-mono text-[11px] text-ice-500">
                    <span>{t("github.less")}</span>
                    {levelAlpha.map((alpha) => (
                      <span
                        key={alpha}
                        className="block w-3 h-3 rounded-[2px]"
                        style={{ background: cellColor(palette.accent, alpha) }}
                      />
                    ))}
                    <span>{t("github.more")}</span>
                  </div>
                </Reveal>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}