# Portfolio — Fadhil Faith

An immersive developer portfolio built with **Next.js 16**, **React Three Fiber**, and **Tailwind CSS v4**. A 3D mechanical keyboard reacts to the section you're reading, the whole UI re-themes across four seasons, and a GitHub activity panel shows live contribution data.

---

## Highlights

- **Interactive 3D keyboard** — A full mechanical keyboard rendered with React Three Fiber. Keys light up and bounce to match the section in view, with synthesised switch sounds on hover.
- **Section-aware scene** — An `IntersectionObserver` tracks `[data-kb-section]` elements and tweens the keyboard between poses. Project sections light the matching keycaps, and scrolling between two projects triggers a flip.
- **Seasonal themes** — Four themes (Winter, Spring, Summer, Autumn) that re-skin every CSS token *and* the 3D scene lighting, keyboard body colour, and particles.
- **Live GitHub activity** — Server-side proxy (`/api/github`) with an in-memory cache, plus a contribution heatmap and monthly bar chart.
- **Project modals** — Fullscreen dialogs with image carousels, tech-stack chips, and optional source/live links.
- **Bilingual (ID/EN)** — A small custom i18n layer with no external dependency. Both preferences persist in `localStorage` and are applied before hydration to avoid a flash.
- **Smooth scroll & reveal** — [Lenis](https://github.com/darkroomengineering/lenis) for inertial scrolling, `IntersectionObserver` reveal animations, and a scroll-progress bar.
- **Security headers** — HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` applied to every response.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| 3D | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei) + [Three.js](https://threejs.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Scroll | [Lenis](https://github.com/darkroomengineering/lenis) |
| Icons | [Simple Icons](https://simpleicons.org/) (tech logos on 3D keycaps) |
| Language | TypeScript |
| Deploy | Docker (standalone output) |

## Getting Started

### Prerequisites

- **Node.js** 20+
- **npm** 10+

### Installation

```bash
git clone https://github.com/fadhilfaith48/My-Portofolio-Web.git
cd My-Portofolio-Web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

### Docker

The multi-stage `Dockerfile` uses `output: "standalone"`, so the runtime image ships no `npm` and no `node_modules` — just `node server.js` as a non-root user.

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## Project Structure

```
├── app/
│   ├── api/github/route.ts # Server-side GitHub proxy (shared quota + cache)
│   ├── globals.css         # Tailwind + seasonal CSS custom properties
│   ├── layout.tsx          # Root layout, providers, pre-hydration boot scripts
│   └── page.tsx            # Home page: all sections + project data
├── components/
│   ├── FrozenKeyboard.tsx  # 3D keyboard scene (R3F) + section poses
│   ├── FrozenBackground.tsx# Aurora + particle canvas background
│   ├── GitHubActivity.tsx  # Stats table, bar chart, contribution heatmap
│   ├── ProjectModal.tsx    # Fullscreen project dialog
│   ├── Carousel.tsx        # Image carousel with auto-advance
│   ├── SeasonProvider.tsx  # Season context + pre-hydration boot script
│   ├── LanguageProvider.tsx# i18n context + pre-hydration boot script
│   ├── SeasonPicker.tsx    # Theme switcher
│   ├── LanguagePicker.tsx  # ID/EN toggle
│   ├── Reveal.tsx          # Scroll-triggered reveal (callback ref + observer)
│   ├── SectionNav.tsx      # Dot navigation sidebar
│   ├── ScrollProgress.tsx  # Scroll progress indicator
│   ├── CustomCursor.tsx    # Ambient cursor halo
│   ├── MagneticTargets.tsx # Magnetic pull on `[data-magnetic]` elements
│   ├── CopyEmail.tsx       # Copy-to-clipboard with toast
│   └── smooth-scroll.tsx   # Lenis wrapper
├── lib/
│   ├── i18n.ts             # ID/EN dictionary
│   └── seasons.ts          # Season palettes
├── public/
│   ├── fonts/              # 3D text typefaces
│   ├── projects/           # Project screenshots
│   └── sounds/             # Keyboard switch sounds
├── Dockerfile              # Multi-stage production build
└── next.config.ts          # Standalone output + security headers
```

## Customisation

### Adding a project

Projects live in the `projects` array in `app/page.tsx`:

```typescript
{
  num: "05",
  name: { id: "Nama Proyek", en: "Project Name" },
  stack: ["Next.js", "TypeScript"],          // shown as chips
  desc: { id: "Deskripsi singkat", en: "Short copy" },
  details: { id: "Deskripsi panjang...", en: "Long copy" },
  url: "https://myproject.com",             // optional — "Buka situs" button
  github: "https://github.com/user/repo",   // optional — "Lihat kode" button
  badge: { id: "Dikerjakan", en: "In progress" }, // optional status badge
  media: ["/projects/my-project/1.png"],    // carousel screenshots
  highlights: ["nextdotjs", "typescript"],  // simple-icons slugs to light up
  align: "left",                            // card alignment
  section: "project5",                      // scroll-nav + scene id
}
```

`highlights` must be **simple-icons slugs** (lowercase, no spaces) and must match a keycap in `SKILLS` in `components/FrozenKeyboard.tsx` — an unknown slug simply never lights up. A new section id also needs a matching entry in `SECTION_STATES` and in the `SectionNav` list.

### Changing themes

Colour tokens live in `app/globals.css` under `:root` and `[data-season="..."]`, and are exposed to Tailwind through the `@theme inline` block. A few colours that can't reach CSS variables from inside a canvas (keyboard body, particles) are duplicated in `lib/seasons.ts`.

### Translations

All UI strings live in `lib/i18n.ts` as a nested dictionary whose leaves carry `{ id, en }`. `translate()` returns the path itself when a key is missing, so a typo shows up visibly rather than rendering as blank.

## Deployment

Any platform that runs a Node container works — the image is self-contained. Behind a TLS-terminating proxy, note that HSTS is already sent by the app itself.

## Notes

- The contribution heatmap reads from a third-party service (`github-contributions-api.jogruber.de`) directly in the browser; the profile and repo counts go through the server-side proxy instead. If that service is down, the section shows its error state with a retry button.
- Unauthenticated GitHub REST is limited to 60 requests/hour per IP. The proxy caches for an hour and counts commits for at most 10 repos, so a cold container start spends 12 of those requests.
