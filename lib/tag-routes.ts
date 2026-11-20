import { getAllPosts } from "./mdx";

// `?tag=` is how the site links a topic (chips, post links, Back, previous / next). Reading `searchParams` in a
// page makes every request render on the server, so next.config.ts rewrites each known tag to a pre-rendered
// path segment (its slug) and the pages read `params`. The visible URL keeps `?tag=`.

export type TagRoute = { tag: string; slug: string };

/** "Graphic Design" → "graphic-design". */
export const tagSlug = (tag: string) => tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** Every tag with a usable, unique slug; a tag without one is not rewritten and falls through to the plain page. */
export async function tagRoutes(): Promise<TagRoute[]> {
  const tags = [...new Set((await getAllPosts()).flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b));
  const routes = tags.map((tag) => ({ tag, slug: tagSlug(tag) })).filter((route) => route.slug !== "");
  return routes.filter((route) => routes.filter((other) => other.slug === route.slug).length === 1);
}

export async function tagFromSlug(slug: string): Promise<string> {
  return (await tagRoutes()).find((route) => route.slug === slug)?.tag ?? "";
}

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** beforeFiles rewrites: /posts/?tag=x and /posts/<slug>/?tag=x to their pre-rendered twins. */
export async function tagRewrites() {
  return (await tagRoutes()).flatMap(({ tag, slug }) => {
    const has = [{ type: "query" as const, key: "tag", value: escapeRegex(tag) }];
    return [
      { source: "/posts/", has, destination: `/posts/topic/${slug}/` },
      { source: "/posts/:slug([0-9a-z-]+)/", has, destination: `/posts/:slug/topic/${slug}/` },
    ];
  });
}
