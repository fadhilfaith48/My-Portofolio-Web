// Minimal i18n layer: a single dictionary keyed by dot-path, with each leaf
// carrying both the ID and EN copy. Consumers read via `useLanguage().t()`
// which resolves the path for the active language. Keeping it flat and
// co-located (rather than adding a dependency like next-intl) keeps the
// project tiny and makes the strings easy to audit.
export type Lang = "id" | "en";

export const LANGUAGES: Lang[] = ["id", "en"];
export const DEFAULT_LANG: Lang = "id";

type Leaf = Record<Lang, string>;
type Node = Leaf | { [key: string]: Node };

function isLeaf(node: Node): node is Leaf {
  return typeof (node as Leaf).id === "string";
}

export const DICT = {
  picker: {
    season: { id: "Musim", en: "Season" },
    language: { id: "Bahasa", en: "Language" },
  },
  seasons: {
    spring: { id: "Semi", en: "Spring" },
    summer: { id: "Panas", en: "Summer" },
    autumn: { id: "Gugur", en: "Autumn" },
    winter: { id: "Dingin", en: "Winter" },
  },
  nav: {
    aria: { id: "Bagian", en: "Sections" },
    home: { id: "Beranda", en: "Home" },
    stack: { id: "Stack", en: "Stack" },
    experience: { id: "Pengalaman", en: "Experience" },
    project: { id: "Proyek", en: "Project" },
    github: { id: "GitHub", en: "GitHub" },
    contact: { id: "Kontak", en: "Contact" },
  },
  header: {
    availability: {
      id: "Open to opportunities",
      en: "Open to opportunities",
    },
  },
  hero: {
    greeting: { id: "Halo, saya", en: "Hi, I am" },
    roleLine: {
      id: "Website Developer & Software Engineer.",
      en: "Website Developer & Software Engineer.",
    },
    tagline: {
      id: "Membangun aplikasi web modern dengan Laravel, Next.js, dan lainnya.",
      en: "Building modern web applications with Laravel, Next.js and more.",
    },
    cv: { id: "Unduh CV", en: "Download CV" },
    hire: { id: "Hubungi Saya", en: "Contact me" },
    scroll: { id: "Scroll untuk jelajahi", en: "Scroll to explore" },
    keysHint: {
      id: "· arahkan kursor ke tombol",
      en: "· hover over the keys",
    },
  },
  stack: {
    title: { id: "Tech Stack", en: "Tech Stack" },
    hint: {
      id: "(hint: arahkan kursor ke tombol)",
      en: "(hint: hover over a key)",
    },
  },
  experience: {
    title: { id: "Pengalaman", en: "Experience" },
    subtitle: {
      id: "Perjalanan dan proyek saya.",
      en: "My journey and projects.",
    },
  },
  projects: {
    kicker: { id: "proyek", en: "project" },
    viewMore: { id: "Lihat detail", en: "View more" },
    openSite: { id: "Buka situs", en: "Visit site" },
    viewCode: { id: "Lihat kode", en: "View code" },
    close: { id: "Tutup", en: "Close" },
    stackLabel: { id: "Stack", en: "Stack" },
    overview: { id: "Ringkasan", en: "Overview" },
  },
  contact: {
    kicker: { id: "kontak", en: "contact" },
    title: { id: "Ngobrol yuk?", en: "Let's talk?" },
    body: {
      id: "Kalau kamu tertarik dengan apa yang kamu lihat, keyboard sudah siap menerima pesan pertama.",
      en: "If what you've seen interests you, the keyboard is ready for the first message.",
    },
    copyEmail: { id: "Salin email", en: "Copy email" },
    openMail: { id: "Buka email", en: "Open mailto" },
    github: { id: "GitHub", en: "GitHub" },
    linkedin: { id: "LinkedIn", en: "LinkedIn" },
    emailToast: { id: "Email disalin", en: "Email copied" },
    footer: {
      id: "© 2026 Fadhil Faith. Semua hak dilindungi.",
      en: "© 2026 Fadhil Faith. All rights reserved.",
    },
  },
  github: {
    kicker: { id: "github activity", en: "github activity" },
    title: { id: "Masih Membangun_", en: "Still Building_" },
    subtitle: {
      id: "Aktivitas dan repo publik dari akun GitHub saya.",
      en: "My public activity and repositories from GitHub.",
    },
    total: { id: "Total Kontribusi", en: "Total Contributions" },
    streak: { id: "Streak", en: "Streak" },
    commits: { id: "Commit", en: "Commits" },
    repos: { id: "Repo Publik", en: "Public Repos" },
    lastYear: { id: "setahun terakhir", en: "last year" },
    lastMonth: { id: "30 hari terakhir", en: "last 30 days" },
    days: { id: "hari", en: "days" },
    less: { id: "Sedikit", en: "Less" },
    more: { id: "Banyak", en: "More" },
    profile: { id: "Profil lengkap", en: "Full profile" },
    loading: { id: "Memuat data GitHub…", en: "Loading GitHub data…" },
    error: {
      id: "Gagal memuat data GitHub. Cek kembali nanti.",
      en: "Failed to load GitHub data. Try again later.",
    },
    contributions: { id: "kontribusi", en: "contributions" },
    activeDays: { id: "hari aktif", en: "active days" },
    reposLabel: { id: "Repo", en: "Repos" },
    viewRepo: { id: "Buka repo", en: "Open repo" },
    unitTotal: { id: "kontribusi", en: "contributions" },
    unitStreak: { id: "hari berturut-turut", en: "consecutive days" },
    unitCommit: { id: "commit", en: "commits" },
    unitRepo: { id: "repo publik", en: "public repos" },
    fullProfile: { id: "profil lengkap", en: "full profile" },
    period12: { id: "12 BULAN", en: "12 MONTHS" },
    stars: { id: "Bintang", en: "Stars" },
    followers: { id: "Pengikut", en: "Followers" },
  },
  keyboard: {
    taglines: {
      javascript: {
        id: "Tempat semuanya dimulai. Masih di sini, masih berkuasa.",
        en: "Where it all started. Still here, still in charge.",
      },
      typescript: {
        id: "JS yang sama, tapi lebih aman.",
        en: "Same JS, with a seatbelt.",
      },
      html5: {
        id: "Tulang punggung setiap halaman web.",
        en: "The bones of any page.",
      },
      css: {
        id: "Yang membedakan bagus dan indah.",
        en: "What separates good from beautiful.",
      },
      tailwindcss: {
        id: "Utility-first. Desain langsung di HTML.",
        en: "Utility-first. Design inside the HTML.",
      },
      bootstrap: {
        id: "Komponen siap pakai, tampil rapi dalam hitungan menit.",
        en: "Ready-made components, looking sharp in minutes.",
      },
      python: {
        id: "Dibaca seperti bahasa manusia, skalanya seperti roket.",
        en: "Reads like English, scales like a rocket.",
      },
      react: {
        id: "Komponen, komponen, komponen.",
        en: "Components, components, components.",
      },
      nextdotjs: {
        id: "React yang sudah dewasa: routing, SSR, edge.",
        en: "React all grown up: routing, SSR, edge.",
      },
      spring: {
        id: "Framework Java yang powerful untuk aplikasi enterprise.",
        en: "The powerful Java framework for enterprise applications.",
      },
      nodedotjs: {
        id: "JavaScript di sisi server.",
        en: "JavaScript on the server.",
      },
      php: {
        id: "Menjalankan lebih banyak web dari yang kamu kira.",
        en: "Runs more of the web than you think.",
      },
      odoo: {
        id: "ERP yang tidak bikin nangis.",
        en: "ERP that doesn't make you cry.",
      },
      postgresql: {
        id: "Database membosankan yang selalu bekerja.",
        en: "The boring database that always works.",
      },
      docker: {
        id: "Sama di mesinku, sama di produksi.",
        en: "Same on my machine, same in production.",
      },
      git: {
        id: "Sejarah dan mesin waktu untuk kode.",
        en: "History and a time machine for your code.",
      },
      visualstudiocode: {
        id: "Editor yang paling banyak dipakai developer di dunia.",
        en: "The most used code editor by developers worldwide.",
      },
      github: {
        id: "Rumah untuk kode dan kolaborasi developer.",
        en: "Where code lives and developers collaborate.",
      },
      laravel: {
        id: "Framework PHP yang elegan dan powerful.",
        en: "The elegant PHP framework for web artisans.",
      },
      mysql: {
        id: "Database relasional yang paling populer.",
        en: "The world's most popular relational database.",
      },
    },
  },
} as const satisfies Record<string, Node>;

// Resolve a dotted path in the dictionary for a given language.
export function translate(path: string, lang: Lang): string {
  const parts = path.split(".");
  let ref: Node = DICT as unknown as Node;
  for (const p of parts) {
    if (isLeaf(ref)) return path;
    ref = (ref as { [key: string]: Node })[p];
    if (ref === undefined) return path;
  }
  if (isLeaf(ref)) return ref[lang] ?? ref.id ?? path;
  return path;
}
