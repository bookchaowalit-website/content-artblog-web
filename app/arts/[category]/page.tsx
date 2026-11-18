import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE, SubjectView } from "@/components/art-views";
import { renderMdx } from "@/lib/render-mdx";
import { SUBJECTS, subjectById } from "@/lib/subjects";

interface PageProps { params: Promise<{ category: string }> }
export const dynamicParams = false;

export function generateStaticParams() {
  return SUBJECTS.map((subject) => ({ category: subject.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const subject = subjectById((await params).category);
  if (!subject) return {};
  // Each subject shares as itself (layout.tsx sets the home page's Open Graph data).
  return {
    title: subject.title,
    description: subject.definition,
    alternates: { canonical: `/arts/${subject.id}/` },
    openGraph: { type: "article", locale: "th_TH", url: `${SITE}/arts/${subject.id}/`, title: subject.title, description: subject.definition, siteName: "Creative Arts Knowledge" },
    twitter: { card: "summary", title: subject.title, description: subject.definition },
  };
}

export default async function ArtPage({ params }: PageProps) {
  const subject = subjectById((await params).category);
  if (!subject) notFound();
  return <SubjectView subject={subject} subjects={SUBJECTS}>{await renderMdx(subject.content)}</SubjectView>;
}
