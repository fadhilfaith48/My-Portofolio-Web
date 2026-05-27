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
      vuedotjs: {
        id: "Frontend yang paling santai.",
        en: "The most relaxed frontend.",
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
