import type { Metadata } from "next";
import { Geist, IBM_Plex_Sans_Thai } from "next/font/google";
import { SITE } from "@/components/art-views";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// Geist has no Thai glyphs; globals.css puts this Thai face right after it in the shell's font stack.
const thai = IBM_Plex_Sans_Thai({ variable: "--font-thai", subsets: ["thai"], weight: ["400", "500", "600", "700"] });

const title = "Creative Arts Knowledge — สมุดโน้ตศิลปะ";
const description = "คำจำกัดความ เทคนิค และโน้ตสั้น ๆ เรื่องศิลปะ การออกแบบ และการถ่ายภาพ";

export const metadata: Metadata = {
  title: { default: title, template: "%s — Creative Arts Knowledge" },
  description,
  metadataBase: new URL(SITE),
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "th_TH", url: SITE, title, description, siteName: "Creative Arts Knowledge" },
  twitter: { card: "summary", title, description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Font variables sit on <html>: the Reader shell tokens live on :root and read them from there.
  return <html lang="th" className={`${geistSans.variable} ${thai.variable}`}><body>{children}</body></html>;
}
