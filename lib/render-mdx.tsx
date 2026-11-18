import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/art-views";

/** Compile a post or subject body. A leading `# Title` is dropped: the page header already holds the one h1. */
export async function renderMdx(source: string) {
  const body = source.replace(/^\s*(<Meta[^>]*\/>\s*)?#\s[^\n]*\n/, "$1");
  const { content } = await compileMDX({ source: body, components: mdxComponents, options: { mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeHighlight] } } });
  return content;
}
