import { getPostSlugs } from "@/lib/mdx";
import { renderPost } from "@/lib/post-page";
import { tagFromSlug, tagRoutes } from "@/lib/tag-routes";
import { generateMetadata } from "@/app/posts/[slug]/page";

// A post opened from a tag, served for /posts/<slug>/?tag=<tag> by a rewrite (next.config.ts). Every post × tag
// pair is pre-rendered; PostView ignores a tag the post does not have, as the plain page would. Shares and
// canonicalises as the plain post URL.
export { generateMetadata };
export const dynamicParams = false;

export async function generateStaticParams() {
  const [slugs, tags] = await Promise.all([getPostSlugs(), tagRoutes()]);
  return slugs.flatMap((slug) => tags.map((route) => ({ slug, tag: route.slug })));
}

export default async function PostInTopicPage({ params }: { params: Promise<{ slug: string; tag: string }> }) {
  const { slug, tag } = await params;
  return renderPost(slug, await tagFromSlug(tag));
}
