// @vitest-environment happy-dom
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HomeView, PostView, PostsView, SubjectsView, mdxComponents, readTime } from "@/components/art-views";
import { renderMdx } from "@/lib/render-mdx";
import type { Post } from "@/lib/mdx";
import { SUBJECTS } from "@/lib/subjects";
import Home from "@/app/page";
import PostsPage from "@/app/posts/page";
import PostPage, * as postRoute from "@/app/posts/[slug]/page";
import CategoriesPage from "@/app/categories/page";
import ArtPage, * as artRoute from "@/app/arts/[category]/page";
import AboutPage from "@/app/about/page";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

const page = (node: React.ReactNode) => {
  const host = document.createElement("div");
  host.innerHTML = renderToStaticMarkup(<>{node}</>);
  return host;
};
const texts = (host: Element, selector: string) => [...host.querySelectorAll(selector)].map((el) => el.textContent);
const post = (slug: string, tags: string[], date: string): Post => ({ slug, title: slug, date, tags, coverImage: "", author: "Bookchaowalit", readTime: "5 min", summary: "s", content: "c" });
const sample = [post("c", ["Color"], "2025-12-03"), post("b", ["Color", "Design"], "2025-12-02"), post("a", ["Design"], "2025-12-01")];

describe("home", () => {
  it("shows the three newest posts, every subject and the shell frame", async () => {
    const host = page(await Home());
    expect(host.querySelectorAll("h1").length).toBe(1);
    expect(host.querySelectorAll("#latest ~ .rs-list .rs-entry, section:first-of-type .rs-entry").length).toBeGreaterThan(0);
    expect(host.querySelectorAll('[data-layout="cards"] .rs-entry').length).toBe(8);
    expect(host.querySelector('.rs-foot a[href="https://bookchaowalit.com/"]')?.textContent).toBe("More projects");
    expect(host.textContent).not.toContain("Five notes, eight fields");
    expect(host.textContent).not.toContain("ชื่อผู้เขียน");
  });

  it("has empty states and no counts when there is nothing", () => {
    const host = page(<HomeView posts={[]} subjects={[]} />);
    expect(texts(host, ".rs-empty h3")).toEqual(["ยังไม่มีบทความ", "ยังไม่มีหน้าสาขา"]);
    expect(host.querySelector(".rs-head .rs-button")).toBeNull();
  });
});

describe("posts", () => {
  it("lists every real post newest first with tag chips", async () => {
    const host = page(await PostsPage({ searchParams: Promise.resolve({}) }));
    expect(host.querySelector('.rs-nav a[aria-current="page"]')?.textContent).toBe("บทความ");
    expect(host.querySelector(".rs-count")?.textContent).toBe("5 บทความ");
    expect(host.querySelector(".rs-entry-link")?.getAttribute("href")).toMatch(/^\/posts\/2025-12-10-photography\/$/);
  });

  it("filters by tag and ignores an unknown tag", async () => {
    const host = page(<PostsView posts={sample} tag="Design" />);
    expect(texts(host, ".rs-chip")).toEqual(["ทั้งหมด3", "Color2", "Design2"]);
    expect(host.querySelector(".rs-count")?.textContent).toBe("แสดง 2 จาก 3 บทความ ในหัวข้อ “Design”");
    expect(host.querySelector('.rs-chip[aria-current="page"]')?.getAttribute("href")).toBe("/posts/?tag=Design");
    const odd = page(await PostsPage({ searchParams: Promise.resolve({ tag: ["nope"] }) }));
    expect(odd.querySelector(".rs-count")?.textContent).toBe("5 บทความ");
    expect(page(<PostsView posts={[]} />).querySelector(".rs-empty h2")?.textContent).toBe("ยังไม่มีบทความ");
  });

  it("renders every real post with one h1, Thai read time and a pager, and 404s an unknown slug", async () => {
    const params = await postRoute.generateStaticParams();
    expect(params.length).toBe(5);
    for (const { slug } of params) {
      const host = page(await PostPage({ params: Promise.resolve({ slug }) }));
      expect(host.querySelectorAll("h1").length).toBe(1);
      expect(host.textContent).toMatch(/อ่าน \d+ นาที/);
      expect(host.querySelector(".rs-pager")).not.toBeNull();
      expect((await postRoute.generateMetadata({ params: Promise.resolve({ slug }) })).title).toBeTruthy();
    }
    expect(await postRoute.generateMetadata({ params: Promise.resolve({ slug: "missing" }) })).toEqual({});
    await expect(PostPage({ params: Promise.resolve({ slug: "missing" }) })).rejects.toThrow();
  });
});

describe("subjects", () => {
  it("lists eight subjects as cards", () => {
    const host = page(<CategoriesPage />);
    expect(host.querySelector(".rs-count")?.textContent).toBe("8 สาขา");
    expect(host.querySelectorAll(".rs-entry").length).toBe(8);
    expect(page(<SubjectsView subjects={[]} />).querySelector(".rs-empty h2")?.textContent).toBe("ยังไม่มีหน้าสาขา");
  });

  it("renders each subject body as real headings and lists (not raw Markdown), with one h1", async () => {
    for (const { category } of artRoute.generateStaticParams()) {
      const host = page(await ArtPage({ params: Promise.resolve({ category }) }));
      expect(host.querySelectorAll("h1").length).toBe(1);
      expect(host.querySelectorAll(".rs-prose h2").length).toBeGreaterThan(0);
      expect(host.querySelector(".rs-prose")?.innerHTML).not.toContain("<br>");
      expect(host.querySelector(".rs-prose")?.textContent).not.toMatch(/^#|\n## /);
      expect((await artRoute.generateMetadata({ params: Promise.resolve({ category }) })).title).toBe(SUBJECTS.find((s) => s.id === category)?.title);
    }
    expect(await artRoute.generateMetadata({ params: Promise.resolve({ category: "missing" }) })).toEqual({});
    await expect(ArtPage({ params: Promise.resolve({ category: "missing" }) })).rejects.toThrow();
  });
});

describe("follow-ups", () => {
  it("keeps the tag on post pages: links, Back and previous / next", async () => {
    const list = page(<PostsView posts={sample} tag="Design" />);
    expect(list.querySelector(".rs-entry-link")?.getAttribute("href")).toBe("/posts/b/?tag=Design");
    const view = page(<PostView post={sample[1]} posts={sample} tag="Design">body</PostView>);
    expect(view.querySelector(".rs-back")?.getAttribute("href")).toBe("/posts/?tag=Design");
    expect(view.querySelector('.rs-pager a[rel="next"]')?.getAttribute("href")).toBe("/posts/a/?tag=Design");
    expect(view.querySelector('.rs-pager a[rel="prev"]')).toBeNull();
    const plain = page(<PostView post={sample[1]} posts={sample} tag="Nope">body</PostView>);
    expect(plain.querySelector(".rs-back")?.getAttribute("href")).toBe("/posts/");
    const real = page(await PostPage({ params: Promise.resolve({ slug: "2025-12-07-color-palettes" }), searchParams: Promise.resolve({ tag: ["Illustration"] }) }));
    expect(real.querySelector(".rs-back")?.getAttribute("href")).toBe("/posts/?tag=Illustration");
  });

  it("gives each post and subject its own share URL", async () => {
    const post = await postRoute.generateMetadata({ params: Promise.resolve({ slug: "2025-12-07-color-palettes" }) });
    expect(post.openGraph).toMatchObject({ url: "https://artblog.bookchaowalit.com/posts/2025-12-07-color-palettes/", type: "article" });
    const subject = await artRoute.generateMetadata({ params: Promise.resolve({ category: "typography" }) });
    expect(subject.openGraph).toMatchObject({ url: "https://artblog.bookchaowalit.com/arts/typography/", title: "Typography" });
  });
});

describe("MDX pieces and site files", () => {
  it("drops the title line, keeps one h1, wraps tables and makes code focusable", async () => {
    const host = page(await renderMdx('<Meta title="x" description="y" />\n\n# Title\n\nText\n\n# Later\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\n```js\nx\n```\n'));
    expect(host.querySelector("h1")).toBeNull();
    expect(host.querySelector("h2")?.textContent).toBe("Later");
    expect(host.querySelector('.rs-table[role="region"] table')).not.toBeNull();
    expect(host.querySelector("pre")?.getAttribute("tabindex")).toBe("0");
    expect(mdxComponents.Meta()).toBeNull();
    expect(readTime("12 min")).toBe("อ่าน 12 นาที");
    expect(readTime("short")).toBe("short");
  });

  it("has an honest about page with no placeholder contact", () => {
    const host = page(<AboutPage />);
    expect(host.textContent).not.toContain("contact@creativearts.com");
    expect(host.querySelector('a[href="https://bookchaowalit.com/"]')).not.toBeNull();
  });

  it("uses the site's own domain", async () => {
    const urls = (await sitemap()).map((u) => u.url);
    expect(urls).toContain("https://artblog.bookchaowalit.com/arts/illustration/");
    expect(urls.every((u) => u.startsWith("https://artblog.bookchaowalit.com/"))).toBe(true);
    expect(robots().sitemap).toBe("https://artblog.bookchaowalit.com/sitemap.xml");
  });
});
