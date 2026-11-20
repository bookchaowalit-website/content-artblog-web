import type { Metadata } from "next";
import { SITE } from "@/components/art-views";

// Share data per page: Next replaces the layout's openGraph / twitter objects instead of merging them, so every
// page that is not the home page sets its own, or a shared link would preview as the home page.

export function shareMetadata(path: string, title: string, description: string, type: "website" | "article" = "website"): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type, locale: "th_TH", url: `${SITE}${path}`, title, description, siteName: "Creative Arts Knowledge" },
    twitter: { card: "summary", title, description },
  };
}
