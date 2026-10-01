import { NextResponse } from "next/server";

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

// Unauthenticated GitHub REST is limited to 60 req/h per IP. Route handlers
// fetch from the server IP once per window so every visitor shares a single
// (cached) quota instead of each browser burning its own.
const CACHE_TTL_MS = 60 * 60 * 1000;

let cache: { at: number; data: Payload } | null = null;

type Payload = {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  totalCommits: number;
};

export const dynamic = "force-dynamic";

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "portfolio",
      },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function countCommits(repo: string): Promise<number> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${USERNAME}/${repo}/commits?per_page=1`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "portfolio",
        },
      }
    );
    if (!res.ok) return 0;
    const link = res.headers.get("Link") ?? "";
    const m = link.match(/[?&]page=(\d+)>\s*;\s*rel="last"/);
    if (m) return parseInt(m[1], 10);
    const body = (await res.json()) as unknown;
    return Array.isArray(body) && body.length > 0 ? 1 : 0;
  } catch {
    return 0;
  }
}

export async function GET() {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
    return NextResponse.json(cache.data);
  }

  const [user, repos] = await Promise.all([
    fetchJson<GitHubUser>(`/users/${USERNAME}`),
    fetchJson<GitHubRepo[]>(
      `/users/${USERNAME}/repos?per_page=100&sort=updated&type=public`
    ),
  ]);

  const repoList = (repos ?? []).filter((r) => r.name !== user?.login).slice(0, 10);
  const counts = await Promise.all(repoList.map((r) => countCommits(r.name)));
  const totalCommits = counts.reduce((s, c) => s + c, 0);

  const data: Payload = {
    user,
    repos: repoList,
    totalCommits,
  };

  if (user || repos) {
    cache = { at: Date.now(), data };
  }

  return NextResponse.json(data);
}