import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Post {
    slug: string
    title: string
    date: string
    tags: string[]
    coverImage: string
    author: string
    readTime: string
    summary: string
    content: string
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

const REQUIRED_TEXT_FIELDS = ['title', 'summary', 'author', 'readTime', 'coverImage'] as const

function isCalendarDate(value: unknown): boolean {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
    const parsed = new Date(`${value}T00:00:00Z`)
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value
}

/** Problems with a post's frontmatter; an empty list means the post can be published. */
export function validatePostFrontmatter(slug: string, data: Record<string, unknown>): string[] {
    const problems: string[] = []
    for (const field of REQUIRED_TEXT_FIELDS) {
        const value = data[field]
        if (typeof value !== 'string' || value.trim() === '') problems.push(`${slug}: ${field} is missing`)
    }
    if (!isCalendarDate(data.date)) problems.push(`${slug}: date "${String(data.date)}" is not a valid YYYY-MM-DD date`)
    const tags = data.tags
    if (!Array.isArray(tags) || tags.length === 0 || !tags.every(tag => typeof tag === 'string' && tag.trim() !== '')) {
        problems.push(`${slug}: tags must be a non-empty list`)
    }
    return problems
}

export async function getPostSlugs() {
    const fileNames = fs.readdirSync(postsDirectory).filter(fileName => fileName.endsWith('.mdx'))
    return fileNames.map(fileName => fileName.replace(/\.mdx$/, ''))
}

export async function getPostBySlug(slug: string): Promise<Post> {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    // Fail the build on a broken post instead of rendering "undefined" on the page.
    const problems = validatePostFrontmatter(slug, data)
    if (problems.length > 0) throw new Error(`Invalid post frontmatter:\n${problems.join('\n')}`)

    return {
        slug,
        ...data,
        content,
    } as Post
}

export async function getAllPosts(): Promise<Post[]> {
    const slugs = await getPostSlugs()
    const posts = await Promise.all(slugs.map(slug => getPostBySlug(slug)))
    return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}
