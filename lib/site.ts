// Canonical origin for metadata, sitemap, and robots. Override with
// NEXT_PUBLIC_SITE_URL at build time once the custom domain is live.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://fadhilfaith.vercel.app"
).replace(/\/+$/, "");
