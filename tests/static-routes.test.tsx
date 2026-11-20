// @vitest-environment happy-dom
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import PostsPage, { metadata as postsMetadata } from "@/app/posts/page";
import TopicPage, { generateStaticParams as topicParams, metadata as topicMetadata } from "@/app/posts/topic/[tag]/page";
import PostPage from "@/app/posts/[slug]/page";
import PostInTopicPage, { generateStaticParams as postTopicParams } from "@/app/posts/[slug]/topic/[tag]/page";
import { metadata as categoriesMetadata } from "@/app/categories/page";
import { metadata as aboutMetadata } from "@/app/about/page";
import NotFound, { metadata as notFoundMetadata } from "@/app/not-found";
import { tagFromSlug, tagSlug } from "@/lib/tag-routes";
import nextConfig from "../next.config";

const page = (node: React.ReactNode) => {
  const host = document.createElement("div");
  host.innerHTML = renderToStaticMarkup(<>{node}</>);
  return host;
};

describe("tag pages stay pre-rendered", () => {
  it("no list or post page takes searchParams (reading them makes every request dynamic)", () => {
    expect(PostsPage.length).toBe(0);
    expect(PostPage.toString()).not.toContain("searchParams");
  });

  it("rewrites each known ?tag= to its pre-rendered twin, before the filesystem routes", async () => {
    const { beforeFiles } = (await nextConfig.rewrites!()) as { beforeFiles: { source: string; has: { value: string }[]; destination: string }[] };
    const design = beforeFiles.filter((rule) => rule.has[0].value === "Graphic Design");
    expect(design).toEqual([
      { source: "/posts/", has: [{ type: "query", key: "tag", value: "Graphic Design" }], destination: "/posts/topic/graphic-design/" },
      { source: "/posts/:slug([0-9a-z-]+)/", has: [{ type: "query", key: "tag", value: "Graphic Design" }], destination: "/posts/:slug/topic/graphic-design/" },
    ]);
  });

  it("slugs tags and maps a slug back to its tag", async () => {
    expect(tagSlug("Color Theory")).toBe("color-theory");
    expect(tagSlug("!!")).toBe("");
    expect(await tagFromSlug("color-theory")).toBe("Color Theory");
    expect(await tagFromSlug("nope")).toBe("");
  });

  it("pre-renders each tag list and every post × tag pair", async () => {
    const topics = await topicParams();
    expect(topics).toContainEqual({ tag: "illustration" });
    expect(await postTopicParams()).toHaveLength(5 * topics.length);
  });

  it("filters the list from the path segment and keeps the tag on post pages", async () => {
    const list = page(await TopicPage({ params: Promise.resolve({ tag: "graphic-design" }) }));
    expect(list.querySelector(".rs-count")?.textContent).toBe("แสดง 1 จาก 5 บทความ ในหัวข้อ “Graphic Design”");
    const post = page(await PostInTopicPage({ params: Promise.resolve({ slug: "2025-12-09-graphic-design", tag: "graphic-design" }) }));
    expect(post.querySelector(".rs-back")?.getAttribute("href")).toBe("/posts/?tag=Graphic+Design");
    expect(topicMetadata).toBe(postsMetadata);
  });
});

describe("share data per page", () => {
  it("/posts/, /categories/ and /about/ share as themselves, not as the home page", () => {
    for (const [meta, path, title] of [[postsMetadata, "/posts/", "บทความ"], [categoriesMetadata, "/categories/", "สาขาศิลปะ"], [aboutMetadata, "/about/", "เกี่ยวกับ"]] as const) {
      expect(meta.openGraph).toMatchObject({ url: `https://artblog.bookchaowalit.com${path}`, title, locale: "th_TH" });
      expect(meta.twitter).toMatchObject({ title });
      expect(meta.alternates).toEqual({ canonical: path });
    }
  });
});

describe("404", () => {
  it("keeps the site frame and offers a way back", () => {
    const host = page(<NotFound />);
    expect(host.querySelector("h1")?.textContent).toBe("ไม่พบหน้านี้");
    // next/link drops the trailing slash outside a Next build, so match the start.
    expect(host.querySelector('.rs-head a[href^="/posts"]')).not.toBeNull();
    expect(host.querySelector('.rs-head a[href="/"]')).not.toBeNull();
    expect(host.querySelector('.rs-nav a[href="/posts/"]')).not.toBeNull();
    expect(notFoundMetadata.robots).toEqual({ index: false });
  });
});

describe("every topic chip has a route", () => {
  it("each tag in content gets its own pre-rendered route (a Thai-only or slug-clashing tag would show a chip that cannot filter)", async () => {
    const { getAllPosts } = await import("@/lib/mdx");
    const { tagRoutes } = await import("@/lib/tag-routes");
    const tags = [...new Set((await getAllPosts()).flatMap((post) => post.tags))];
    const routed = new Set((await tagRoutes()).map((route) => route.tag));
    expect(tags.length).toBeGreaterThan(0);
    // Give such a tag an ASCII name, or rename one of the clashing pair.
    expect(tags.filter((tag) => !routed.has(tag))).toEqual([]);
  });
});
