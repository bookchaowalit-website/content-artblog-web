import type { MetadataRoute } from "next";
import { SITE } from "@/components/art-views";
import { getAllPosts } from "@/lib/mdx";
import { SUBJECTS } from "@/lib/subjects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  return [
    { url: `${SITE}/`, lastModified: posts[0]?.date },
    { url: `${SITE}/posts/`, lastModified: posts[0]?.date },
    { url: `${SITE}/categories/` },
    { url: `${SITE}/about/` },
    ...posts.map((post) => ({ url: `${SITE}/posts/${post.slug}/`, lastModified: post.date })),
    ...SUBJECTS.map((subject) => ({ url: `${SITE}/arts/${subject.id}/` })),
  ];
}
