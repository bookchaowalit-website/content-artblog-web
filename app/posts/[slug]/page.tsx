import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostView } from "@/components/art-views";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { renderMdx } from "@/lib/render-mdx";

interface PageProps { params: Promise<{ slug: string }> }
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getAllPosts()).find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.summary, alternates: { canonical: `/posts/${post.slug}/` }, openGraph: { title: post.title, description: post.summary, type: "article" } };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) notFound();
  return <PostView post={post} posts={await getAllPosts()}>{await renderMdx(post.content)}</PostView>;
}
