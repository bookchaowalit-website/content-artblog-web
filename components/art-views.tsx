import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import {
  ArticleHeader, EmptyState, EntryList, Pager, Prose, Reader, ReaderFoot, ReaderHead, ReaderTop, TableScroll, TagFilter,
  neighbours, type Entry, type PagerLink,
} from "@/components/reader-shell";
import type { Post } from "@/lib/mdx";
import type { Subject } from "@/lib/subjects";

// The art notebook on the Reader shell. The content is Thai, so the site is Thai-first (<html lang="th">);
// the shell's own hub links stay in English. Route files stay thin; these views take plain data.

export const SITE = "https://artblog.bookchaowalit.com";
const SOURCE = "https://github.com/bookchaowalit-website/content-artblog-web";

type Section = "home" | "posts" | "subjects" | "about";

export function ArtFrame({ current, children }: { current: Section; children: ReactNode }) {
  return (
    <Reader>
      <ReaderTop
        name="Creative Arts Knowledge"
        tagline="สมุดโน้ตศิลปะ"
        links={[
          { href: "/posts/", label: "บทความ", current: current === "posts" },
          { href: "/categories/", label: "สาขาศิลปะ", current: current === "subjects" },
          { href: "/about/", label: "เกี่ยวกับ", current: current === "about" },
        ]}
      />
      <main id="main" className="rs-main">{children}</main>
      <ReaderFoot source={SOURCE} note="บทความและหน้าสาขาเขียนเป็นไฟล์ในรีโพสาธารณะ ไม่มีระบบสมาชิกหรือการเก็บข้อมูลผู้อ่าน" />
    </Reader>
  );
}

/** The MDX components for post and subject bodies: one h1 per page, tables scroll inside themselves, inline <Meta> is dropped. */
export const mdxComponents = {
  Meta: () => null,
  h1: (props: ComponentProps<"h2">) => <h2 {...props} />,
  table: (props: ComponentProps<"table">) => <TableScroll label="ตาราง"><table {...props} /></TableScroll>,
  pre: (props: ComponentProps<"pre">) => <pre tabIndex={0} {...props} />,
};

/** "5 min" → "อ่าน 5 นาที"; anything else is shown as written. */
export const readTime = (value: string) => value.replace(/^(\d+)\s*min$/, "อ่าน $1 นาที");

export const postEntry = (post: Post): Entry => ({ href: `/posts/${post.slug}/`, title: post.title, summary: post.summary, date: post.date, meta: [readTime(post.readTime)], tags: post.tags });
export const subjectEntry = (subject: Subject): Entry => ({ href: `/arts/${subject.id}/`, title: subject.title, summary: subject.definition });

const postsHref = (tag = "") => (tag ? `/posts/?${new URLSearchParams({ tag })}` : "/posts/");

export function HomeView({ posts, subjects }: { posts: Post[]; subjects: Subject[] }) {
  return (
    <ArtFrame current="home">
      <ReaderHead
        eyebrow="สมุดโน้ตศิลปะและงานสร้างสรรค์"
        title="ดัชนีความรู้เรื่องศิลปะและการลงมือทำ"
        lede="คำจำกัดความ เทคนิค และโน้ตสั้น ๆ สำหรับคนที่อยากมองให้ละเอียดขึ้นและสร้างงานอย่างตั้งใจ"
      >
        {posts.length > 0 ? <Link className="rs-button" href="/posts/">อ่านบทความทั้งหมด ({posts.length})</Link> : null}
        <Link className="rs-plain" href="/categories/">ดูสาขาศิลปะ</Link>
      </ReaderHead>
      <section aria-labelledby="latest">
        <div className="rs-section-head"><h2 id="latest">บทความล่าสุด</h2>{posts.length > 3 ? <Link href="/posts/">ทั้งหมด</Link> : null}</div>
        {posts.length === 0 ? (
          <EmptyState headingLevel={3} title="ยังไม่มีบทความ">บทความใหม่จะแสดงที่นี่เมื่อเผยแพร่</EmptyState>
        ) : (
          <EntryList headingLevel={3} entries={posts.slice(0, 3).map(postEntry)} />
        )}
      </section>
      <section aria-labelledby="subjects">
        <div className="rs-section-head"><h2 id="subjects">สาขาศิลปะ</h2><Link href="/categories/">ทั้งหมด</Link></div>
        {subjects.length === 0 ? (
          <EmptyState headingLevel={3} title="ยังไม่มีหน้าสาขา" />
        ) : (
          <EntryList headingLevel={3} layout="cards" entries={subjects.map(subjectEntry)} />
        )}
      </section>
    </ArtFrame>
  );
}

/** All posts, newest first, with tag chips (?tag=). */
export function PostsView({ posts, tag = "" }: { posts: Post[]; tag?: string }) {
  const tags = [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b));
  const current = tags.includes(tag) ? tag : "";
  const shown = current ? posts.filter((post) => post.tags.includes(current)) : posts;
  return (
    <ArtFrame current="posts">
      <ReaderHead title="บทความ" lede="โน้ตเรื่องการมอง การจัดวาง และการลงมือสร้างงาน เรียงจากใหม่ไปเก่า" />
      {posts.length === 0 ? (
        <EmptyState title="ยังไม่มีบทความ">บทความใหม่จะแสดงที่นี่เมื่อเผยแพร่</EmptyState>
      ) : (
        <>
          <div className="rs-toolbar">
            <TagFilter
              label="กรองตามหัวข้อ"
              options={[{ label: "ทั้งหมด", href: postsHref(), current: !current, count: posts.length }, ...tags.map((t) => ({ label: t, href: postsHref(t), current: t === current, count: posts.filter((post) => post.tags.includes(t)).length }))]}
            />
            <p className="rs-count" role="status">{current ? `แสดง ${shown.length} จาก ${posts.length} บทความ ในหัวข้อ “${current}”` : `${posts.length} บทความ`}</p>
          </div>
          <EntryList entries={shown.map(postEntry)} />
        </>
      )}
    </ArtFrame>
  );
}

export function PostView({ post, posts, children }: { post: Post; posts: Post[]; children: ReactNode }) {
  const { previous, next } = neighbours(posts, posts.findIndex((p) => p.slug === post.slug));
  const link = (p: Post | undefined, label: string): PagerLink | undefined => (p ? { href: `/posts/${p.slug}/`, title: p.title, label } : undefined);
  return (
    <ArtFrame current="posts">
      <article className="rs-article">
        <ArticleHeader back={{ href: "/posts/", label: "บทความทั้งหมด" }} tags={post.tags} title={post.title} lede={post.summary} date={post.date} meta={[readTime(post.readTime), post.author]} />
        <Prose>{children}</Prose>
        <Pager previous={link(previous, "ก่อนหน้า")} next={link(next, "ถัดไป")} label="บทความอื่น" />
      </article>
    </ArtFrame>
  );
}

export function SubjectsView({ subjects }: { subjects: Subject[] }) {
  return (
    <ArtFrame current="subjects">
      <ReaderHead title="สาขาศิลปะและงานสร้างสรรค์" lede="แต่ละสาขามีคำจำกัดความ ประเภท เทคนิค และเครื่องมือที่ควรรู้" />
      {subjects.length === 0 ? (
        <EmptyState title="ยังไม่มีหน้าสาขา" />
      ) : (
        <>
          <p className="rs-count" role="status">{subjects.length} สาขา</p>
          <EntryList layout="cards" entries={subjects.map(subjectEntry)} />
        </>
      )}
    </ArtFrame>
  );
}

export function SubjectView({ subject, subjects, children }: { subject: Subject; subjects: Subject[]; children: ReactNode }) {
  const { previous, next } = neighbours(subjects, subjects.findIndex((s) => s.id === subject.id));
  const link = (s: Subject | undefined, label: string): PagerLink | undefined => (s ? { href: `/arts/${s.id}/`, title: s.title, label } : undefined);
  return (
    <ArtFrame current="subjects">
      <article className="rs-article">
        <ArticleHeader back={{ href: "/categories/", label: "สาขาศิลปะทั้งหมด" }} title={subject.title} lede={subject.definition} meta={[subject.description]} />
        <Prose>{children}</Prose>
        <Pager previous={link(previous, "ก่อนหน้า")} next={link(next, "ถัดไป")} label="สาขาอื่น" />
      </article>
    </ArtFrame>
  );
}
