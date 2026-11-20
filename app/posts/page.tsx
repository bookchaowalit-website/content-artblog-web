import type { Metadata } from "next";
import { PostsView } from "@/components/art-views";
import { getAllPosts } from "@/lib/mdx";
import { shareMetadata } from "@/lib/share";

export const metadata: Metadata = shareMetadata("/posts/", "บทความ", "โน้ตเรื่องการมอง การจัดวาง และการลงมือสร้างงาน");

// Pre-rendered. A known ?tag= is rewritten to topic/[tag] (next.config.ts); an unknown one lands here.
export default async function PostsPage() {
  return <PostsView posts={await getAllPosts()} />;
}
