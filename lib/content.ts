// Single source of truth for portfolio content.
//
// This module is deliberately server-safe (no "use client", no React
// imports) so the same data can be consumed by client sections on the
// homepage and by server components / metadata generators on the future
// `/projects/[slug]` route.
//
// Copy lives in `{ id, en }` objects; tech names and brand names stay plain
// strings because they aren't translated.

export type Lang = "id" | "en";
export type Localised = { id: string; en: string };

export type ProjectDetail = {
  num: string;
  slug: string;
  name: Localised;
  stack: string[];
  desc: Localised;
  details: Localised;
  url?: string;
  github?: string;
  badge?: Localised;
  highlights?: string[];
  media?: string[];
  // Optional until the real values are known — hidden in the UI when absent.
  role?: Localised;
  period?: Localised;
  impact?: Localised[];
};

export type Project = ProjectDetail & {
  align: "left" | "right";
  section:
    | "project1"
    | "project2"
    | "project3"
    | "project4"
    | "project5"
    | "project6";
};

export const EMAIL = "fadhilfaith2@gmail.com";
export const GITHUB_URL = "https://github.com/fadhilfaith48";
export const LINKEDIN_URL = "https://www.linkedin.com/in/fadhil-faith";
export const SITE_NAME = "Fadhil Faith";
export const FULL_NAME = "Fadhil Faith Al Abrisam Dewanto";

export const CV_FILES: Record<Lang, string> = {
  id: "/cv-id.pdf",
  en: "/cv-en.pdf",
};

export const projects: Project[] = [
  {
    num: "01",
    slug: "coffee-shop-pos",
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
    impact: [
      {
        id: "Alur kasir dan stok dalam satu aplikasi desktop, tidak lagi dicatat manual.",
        en: "Cashier and stock flow in one desktop app instead of manual records.",
      },
      {
        id: "Riwayat transaksi dan laporan penjualan otomatis untuk pemilik usaha.",
        en: "Transaction history and automated sales reports for the owner.",
      },
    ],
    align: "left",
    section: "project1",
  },
  {
    num: "02",
    slug: "umkm-ecommerce",
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
    impact: [
      {
        id: "Katalog produk, keranjang, dan panel admin dalam satu sistem Laravel.",
        en: "Product catalogue, cart, and admin panel in a single Laravel system.",
      },
      {
        id: "Autentikasi pengguna dan manajemen data bisnis untuk operasional harian.",
        en: "User authentication and business data management for daily operations.",
      },
    ],
    align: "right",
    section: "project2",
  },
  {
    num: "03",
    slug: "workshop-management",
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
    impact: [
      {
        id: "Stok sparepart keluar-masuk tercatat rapi per transaksi.",
        en: "Spare parts in and out recorded per transaction.",
      },
      {
        id: "Biaya jasa montir dihitung otomatis, mengurangi salah hitung manual.",
        en: "Mechanic labor costs calculated automatically, reducing manual errors.",
      },
      {
        id: "Riwayat servis tersimpan per kendaraan untuk servis berikutnya.",
        en: "Service history stored per vehicle for future visits.",
      },
    ],
    align: "left",
    section: "project3",
  },
  {
    num: "04",
    slug: "madiun-sigap",
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
    // Live URL of the deployed site. While this stays empty the modal shows
    // no "Kunjungi website" button.
    url: "https://madiun-sigap.vercel.app/",
    impact: [
      {
        id: "Warga bisa mengirim pengaduan tanpa datang ke kantor.",
        en: "Citizens can submit complaints without visiting the office.",
      },
      {
        id: "Petugas punya panel pelacakan kasus dan laporan layanan.",
        en: "Officials get case tracking and service reporting in one panel.",
      },
    ],
    align: "right",
    section: "project4",
  },
  {
    num: "05",
    slug: "market-news",
    name: {
      id: "Market_News — Dashboard Crypto Real-Time",
      en: "Market_News — Real-Time Crypto Market Dashboard",
    },
    stack: [
      "Next.js 16",
      "TypeScript",
      "React 19",
      "Tailwind CSS v4",
      "Zustand",
      "TanStack Query",
      "Lightweight Charts",
      "Binance WebSocket",
      "CoinGecko",
      "Vitest",
      "Git",
    ],
    desc: {
      id: "Dashboard monitoring pasar crypto real-time bergaya TradingView. Menampilkan harga live 50 koin via WebSocket Binance dengan fallback REST, grafik candlestick, watchlist, portofolio, dan price alert.",
      en: "TradingView-style real-time crypto market dashboard. Displays live prices for 50 coins via Binance WebSocket with REST fallback, candlestick charts, watchlist, portfolio, and price alerts.",
    },
    details: {
      id: "Market_News adalah dashboard monitoring pasar crypto real-time bergaya TradingView. Terhubung langsung ke Binance WebSocket (data-stream.binance.vision) untuk pembaruan harga instan dengan mekanisme fallback polling REST bila koneksi WebSocket terputus. Menampilkan grafik candlestick real-time (Lightweight Charts v5), daftar 50 koin terpopuler, watchlist, portofolio, dan price alert sepenuhnya di sisi klien. Menggunakan CoinGecko untuk data market cap/supply serta kurs fiat melalui open.er-api.com. Dibangun dengan Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4, Zustand v5 (persist ke localStorage), TanStack React Query v5, dan diuji dengan Vitest v4 (127 unit test). Ter-deploy di Vercel dengan API routes serverless dan SSG untuk ~50 halaman koin. Antarmuka menggunakan bahasa Indonesia dengan dukungan dark/light theme.",
      en: "Market_News is a TradingView-style real-time crypto market dashboard. It connects directly to Binance WebSocket (data-stream.binance.vision) for instant price updates with automatic REST polling fallback if the WebSocket goes offline. Features real-time candlestick charts (Lightweight Charts v5), a list of 50 top coins, watchlist, portfolio, and client-side price alerts. Integrates CoinGecko for market cap/supply data and fiat rates via open.er-api.com. Built with Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4, Zustand v5 (persisted to localStorage), TanStack React Query v5, and tested with Vitest v4 (127 unit tests). Deployed on Vercel with serverless API routes and SSG for ~50 coin pages. Indonesian UI with dark/light theme support.",
    },
    url: "https://market-news-roan.vercel.app/",
    highlights: ["nextdotjs", "typescript", "react", "css", "git"],
    media: [
      "/projects/market-news/1-beranda.png",
      "/projects/market-news/2-candlestick.png",
      "/projects/market-news/3-watchlist-portfolio.png",
    ],
    impact: [
      {
        id: "127 unit test (Vitest) menutup logika harga, watchlist, dan portofolio.",
        en: "127 unit tests (Vitest) covering price logic, watchlist, and portfolio.",
      },
      {
        id: "Harga live 50 koin via WebSocket, dengan fallback REST saat koneksi putus.",
        en: "Live prices for 50 coins over WebSocket, with REST fallback when offline.",
      },
      {
        id: "~50 halaman koin di-generate statis sehingga cepat dan ramah SEO.",
        en: "~50 coin pages statically generated for speed and SEO.",
      },
    ],
    align: "left",
    section: "project5",
  },
  {
    num: "06",
    slug: "news-app",
    name: {
      id: "News App — Aplikasi Berita",
      en: "News App",
    },
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Zustand",
      "TanStack Query",
      "Git",
    ],
    desc: {
      id: "Aplikasi berita yang menampilkan berita terkini dengan kategori, pencarian, dan tampilan detail artikel.",
      en: "News application that displays the latest news with categories, search, and article detail views.",
    },
    details: {
      id: "News App adalah aplikasi web yang menampilkan berita terkini dari berbagai kategori. Dilengkapi fitur pencarian berita, filter berdasarkan kategori, tampilan daftar berita, dan halaman detail artikel yang bersih. Dibangun dengan Next.js, TypeScript, Tailwind CSS, Zustand untuk state management, dan TanStack Query untuk fetching data. Desain responsif untuk pengalaman membaca yang nyaman di berbagai perangkat.",
      en: "News App is a web application that displays the latest news across multiple categories. Features include news search, category filtering, news list view, and a clean article detail page. Built with Next.js, TypeScript, Tailwind CSS, Zustand for state management, and TanStack Query for data fetching. Responsive design ensures a comfortable reading experience across devices.",
    },
    url: "",
    highlights: ["nextdotjs", "typescript", "react", "css", "git"],
    // Screenshots not available yet: leaving `media` undefined makes the
    // carousel fall back to its stylised placeholder slides instead of
    // rendering broken <img> tags. Drop the PNGs into
    // public/projects/news-app/ and list them here when ready.
    impact: [
      {
        id: "Pencarian dan filter kategori mempersempit berita tanpa reload halaman.",
        en: "Search and category filters narrow the feed without a page reload.",
      },
      {
        id: "Halaman detail artikel yang responsif untuk pengalaman membaca di HP.",
        en: "Responsive article detail pages for comfortable reading on mobile.",
      },
    ],
    align: "right",
    section: "project6",
  },
];

export const experiences: Array<{
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
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
      "Java",
      "PHP",
      "Laravel",
      "Node.js",
      "MySQL",
      "Git",
    ],
  },
];

// ─── About ──────────────────────────────────────────────────────────────
// Facts only — no invented job titles or dates.

export const about = {
  portrait: "/about/portrait.jpg", // optional: replace with a real photo
  paragraphs: [
    {
      id: "Saya Fadhil Faith, siswa Rekayasa Perangkat Lunak di SMKN 1 Mejayan, Madiun. Saya membangun aplikasi web dari nol — mulai dari struktur database, API, sampai antarmuka yang nyaman dipakai.",
      en: "I'm Fadhil Faith, a software engineering student at SMKN 1 Mejayan, Madiun. I build web applications end to end — from database structure and APIs to interfaces people actually enjoy using.",
    },
    {
      id: "Fokus saya adalah web development dengan Laravel dan Next.js. Belakangan saya juga mengeksplorasi integrasi AI ke dalam produk web, dan terbiasa memakai Git untuk kolaborasi.",
      en: "My focus is web development with Laravel and Next.js. Lately I've been exploring how AI fits into web products, and I use Git for everyday collaboration.",
    },
  ] as Localised[],
  facts: [
    {
      label: { id: "Lokasi", en: "Location" },
      value: { id: "Madiun, Jawa Timur", en: "Madiun, East Java" },
    },
    {
      label: { id: "Pendidikan", en: "Education" },
      value: {
        id: "SMKN 1 Mejayan — RPL",
        en: "SMKN 1 Mejayan — Software Engineering",
      },
    },
    {
      label: { id: "Fokus", en: "Focus" },
      value: {
        id: "Web app & integrasi AI",
        en: "Web apps & AI integration",
      },
    },
    {
      label: { id: "Status", en: "Status" },
      value: {
        id: "Terbuka untuk magang / freelance",
        en: "Open to internship / freelance",
      },
    },
  ],
  learning: {
    id: "Sedang diperdalam",
    en: "Currently learning",
  },
  learningItems: [
    "Next.js App Router",
    "TypeScript",
    "AI / LLM integration",
    "PostgreSQL",
  ],
  // Optional: drop a photo at public/about/portrait.jpg and set
  // `hasPortrait` to true. The layout works fine without one.
  hasPortrait: false,
};

// ─── Organisasi & sertifikat ────────────────────────────────────────────
// TODO(fadhil): lengkapi `period`, jabatan, dan bullet kontribusi OSIS.
// Semua field di bawah ini boleh dihapus kalau belum ada datanya — kartu
// akan tetap rapi karena bagian kosong tidak dirender.

export type Achievement = {
  kind: "organisasi" | "kompetisi" | "sertifikat";
  title: Localised;
  org: Localised;
  period?: Localised;
  summary: Localised;
  bullets?: Localised[];
  link?: string;
  certificate?: string; // path ke file di public/certs/
};

export const achievements: Achievement[] = [
  {
    kind: "kompetisi",
    title: {
      id: "Inotek Kabupaten Madiun",
      en: "Inotek — Madiun Regency",
    },
    org: { id: "Kompetisi teknologi", en: "Technology competition" },
    summary: {
      id: "Berpartisipasi dalam kompetisi inovasi teknologi tingkat Kabupaten Madiun.",
      en: "Participated in the Madiun Regency technology innovation competition.",
    },
  },
  {
    kind: "kompetisi",
    title: {
      id: "Festika Jatim — AREK_AI 2025",
      en: "Festika Jatim — AREK_AI 2025",
    },
    org: { id: "Kompetisi AI", en: "AI competition" },
    period: { id: "2025", en: "2025" },
    summary: {
      id: "Berpartisipasi dalam kompetisi AI tingkat Jawa Timur melalui AREK_AI 2025.",
      en: "Participated in the East Java AI competition through AREK_AI 2025.",
    },
  },
  // TODO: tambahkan OSIS saat datanya lengkap (jabatan, periode, 2 kontribusi).
  // {
  //   kind: "organisasi",
  //   title: { id: "OSIS SMKN 1 Mejayan", en: "Student Council — SMKN 1 Mejayan" },
  //   org: { id: "Organisasi Siswa Intra Sekolah", en: "Student Council (OSIS)" },
  //   period: { id: "2024 — 2025", en: "2024 — 2025" },
  //   summary: { id: "...", en: "..." },
  //   bullets: [
  //     { id: "...", en: "..." },
  //     { id: "...", en: "..." },
  //   ],
  // },
];

// Sertifikat yang sudah diunggah. Tambahkan entri seperti:
// {
//   title: { id: "Sertifikat OSIS", en: "OSIS Certificate" },
//   issuer: { id: "SMKN 1 Mejayan", en: "SMKN 1 Mejayan" },
//   year: "2025",
//   file: "/certs/osis-2025.pdf", // thumbnail: /certs/osis-2025.jpg
// },
// Selama array ini kosong, bagian sertifikat tidak dirender sama sekali.
export type Certificate = {
  title: Localised;
  issuer: Localised;
  year: string;
  file: string;
  thumbnail?: string;
};

export const certificates: Certificate[] = [];

// ─── Tech stack (text version) ──────────────────────────────────────────
// The 3D keyboard is hover-only, which makes the stack invisible on touch
// devices and to search engines. This grouped list is the readable version.

export type TechItem = { name: string; icon?: string };

export const techGroups: Array<{ title: Localised; items: TechItem[] }> = [
  {
    title: { id: "Frontend", en: "Frontend" },
    items: [
      { name: "Next.js", icon: "nextdotjs" },
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS", icon: "css" },
    ],
  },
  {
    title: { id: "Backend", en: "Backend" },
    items: [
      { name: "Laravel", icon: "laravel" },
      { name: "PHP", icon: "php" },
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Java", icon: "openjdk" },
      { name: "Python", icon: "python" },
    ],
  },
  {
    title: { id: "Database", en: "Database" },
    items: [{ name: "MySQL", icon: "mysql" }],
  },
  {
    title: { id: "Tools", en: "Tools" },
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "XAMPP", icon: "xampp" },
      { name: "Vercel", icon: "vercel" },
    ],
  },
];
