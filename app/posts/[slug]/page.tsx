import type { Metadata } from "next";
import { getAllPosts, getPostSlugs } from "@/lib/mdx";
import { renderPost } from "@/lib/post-page";
import { shareMetadata } from "@/lib/share";

interface PageProps { params: Promise<{ slug: string }> }
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getAllPosts()).find((p) => p.slug === slug);
  if (!post) return {};
  // Each post shares as itself (layout.tsx sets the home page's Open Graph data).
  return shareMetadata(`/posts/${post.slug}/`, post.title, post.summary, "article");
}

// Pre-rendered. A known ?tag= is rewritten to [slug]/topic/[tag] (next.config.ts).
export default async function PostPage({ params }: PageProps) {
  return renderPost((await params).slug);
}
