import { notFound } from "next/navigation";
import { PostView } from "@/components/art-views";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { renderMdx } from "@/lib/render-mdx";

/** One post page, shared by /posts/[slug] and its topic/[tag] twin (tag "" = none). */
export async function renderPost(slug: string, tag = "") {
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) notFound();
  return <PostView post={post} posts={await getAllPosts()} tag={tag}>{await renderMdx(post.content)}</PostView>;
}
