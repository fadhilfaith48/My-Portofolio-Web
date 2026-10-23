import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Single-page portfolio. Project case-study routes (/projects/[slug]) get
// appended here once they land in phase 2.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
