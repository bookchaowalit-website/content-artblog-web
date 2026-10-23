import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validatePostFrontmatter } from '../lib/mdx.ts';

const valid = {
  title: 'Colour basics',
  date: '2025-12-07',
  tags: ['Color Theory'],
  coverImage: '/images/covers/c.jpg',
  author: 'Book',
  readTime: '5 min',
  summary: 'How to pick a palette.',
};

test('a complete post frontmatter has no problems', () => {
  assert.deepEqual(validatePostFrontmatter('colour', valid), []);
});

test('missing title, summary or tags are reported by name', () => {
  const problems = validatePostFrontmatter('colour', { ...valid, title: '', summary: undefined, tags: [] });
  assert.deepEqual(problems, ['colour: title is missing', 'colour: summary is missing', 'colour: tags must be a non-empty list']);
});

test('dates must be real calendar days in YYYY-MM-DD form', () => {
  assert.deepEqual(validatePostFrontmatter('p', { ...valid, date: '2025-02-30' }), ['p: date "2025-02-30" is not a valid YYYY-MM-DD date']);
  assert.deepEqual(validatePostFrontmatter('p', { ...valid, date: '7 Dec 2025' }), ['p: date "7 Dec 2025" is not a valid YYYY-MM-DD date']);
  assert.deepEqual(validatePostFrontmatter('p', { ...valid, date: undefined }), ['p: date "undefined" is not a valid YYYY-MM-DD date']);
});

test('every post in content/posts passes the frontmatter check', async () => {
  const { getAllPosts } = await import('../lib/mdx.ts');
  for (const post of await getAllPosts()) assert.deepEqual(validatePostFrontmatter(post.slug, post), [], post.slug);
});
