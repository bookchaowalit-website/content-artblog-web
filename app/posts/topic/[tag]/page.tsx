import { PostsView } from "@/components/art-views";
import { getAllPosts } from "@/lib/mdx";
import { tagFromSlug, tagRoutes } from "@/lib/tag-routes";

// The post list filtered to one tag, served for /posts/?tag=<tag> by a rewrite (next.config.ts), so the filtered
// list is pre-rendered too. Shares and canonicalises as /posts/.
export { metadata } from "@/app/posts/page";
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await tagRoutes()).map(({ slug }) => ({ tag: slug }));
}

export default async function TopicPage({ params }: { params: Promise<{ tag: string }> }) {
  return <PostsView posts={await getAllPosts()} tag={await tagFromSlug((await params).tag)} />;
}
