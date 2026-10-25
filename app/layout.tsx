import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import FrozenBackground from "@/components/FrozenBackground";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticTargets from "@/components/MagneticTargets";
import SeasonProvider, {
  SEASON_BOOT_SCRIPT,
} from "@/components/SeasonProvider";
import LanguageProvider, {
  LANG_BOOT_SCRIPT,
} from "@/components/LanguageProvider";
import { SITE_URL } from "@/lib/site";
import {
  EMAIL,
  FULL_NAME,
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_NAME,
} from "@/lib/content";

// Structured data so search engines can connect the name, role, school, and
// social profiles. It lives in the server-rendered <head> because a
// <script> inside the client page component is ignored by React on the
// client (and triggers a console warning).
const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: FULL_NAME,
  alternateName: SITE_NAME,
  jobTitle: "Website Developer & Software Engineer",
  email: `mailto:${EMAIL}`,
  url: "/",
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "SMKN 1 Mejayan",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Madiun",
    addressRegion: "East Java",
    addressCountry: "ID",
  },
  knowsAbout: [
    "Laravel",
    "Next.js",
    "React",
    "TypeScript",
    "PHP",
    "MySQL",
    "Node.js",
    "Web Development",
  ],
  sameAs: [GITHUB_URL, LINKEDIN_URL],
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-heading",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fadhil Faith — Website Developer & Software Engineer",
    template: "%s — Fadhil Faith",
  },
  description:
    "Portfolio of Fadhil Faith Al Abrisam Dewanto — Website Developer from Madiun, East Java. Building web apps with Laravel, Next.js, and more.",
  applicationName: "Fadhil Faith — Portfolio",
  authors: [{ name: "Fadhil Faith Al Abrisam Dewanto" }],
  creator: "Fadhil Faith Al Abrisam Dewanto",
  keywords: [
    "Fadhil Faith",
    "portfolio",
    "website developer",
    "web developer Madiun",
    "Laravel developer",
    "Next.js developer",
    "SMKN 1 Mejayan",
    "RPL",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Fadhil Faith — Website Developer & Software Engineer",
    description:
      "Immersive 3D portfolio. Laravel, Next.js, Node.js, Python.",
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: "Fadhil Faith",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fadhil Faith — Website Developer & Software Engineer",
    description:
      "Immersive 3D portfolio. Laravel, Next.js, Node.js, Python.",
  },
};

export const viewport: Viewport = {
  themeColor: "#060e1c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Run synchronously before hydration to apply the user's stored
            season + language — avoids a flash of the default values. */}
        <script dangerouslySetInnerHTML={{ __html: SEASON_BOOT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        <LanguageProvider>
          <SeasonProvider>
            <FrozenBackground />
            <ScrollProgress />
            {children}
            <CustomCursor />
            <MagneticTargets />
          </SeasonProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
