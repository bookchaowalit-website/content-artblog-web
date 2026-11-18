import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostView, SITE } from "@/components/art-views";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { renderMdx } from "@/lib/render-mdx";

interface PageProps { params: Promise<{ slug: string }>; searchParams?: Promise<{ tag?: string | string[] }> }
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getAllPosts()).find((p) => p.slug === slug);
  if (!post) return {};
  // Each post shares as itself (layout.tsx sets the home page's Open Graph data).
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/posts/${post.slug}/` },
    openGraph: { type: "article", locale: "th_TH", url: `${SITE}/posts/${post.slug}/`, title: post.title, description: post.summary, siteName: "Creative Arts Knowledge" },
    twitter: { card: "summary", title: post.title, description: post.summary },
  };
}

export default async function PostPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) notFound();
  const { tag } = (await searchParams) ?? {};
  return <PostView post={post} posts={await getAllPosts()} tag={(Array.isArray(tag) ? tag[0] : tag) ?? ""}>{await renderMdx(post.content)}</PostView>;
}
