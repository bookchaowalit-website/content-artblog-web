import type { Metadata } from "next";
import { PostsView } from "@/components/art-views";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = { title: "บทความ", description: "โน้ตเรื่องการมอง การจัดวาง และการลงมือสร้างงาน", alternates: { canonical: "/posts/" } };

type Search = { tag?: string | string[] };

export default async function PostsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { tag } = await searchParams;
  return <PostsView posts={await getAllPosts()} tag={(Array.isArray(tag) ? tag[0] : tag) ?? ""} />;
}
