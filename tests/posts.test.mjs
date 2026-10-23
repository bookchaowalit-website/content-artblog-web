import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getAllPosts, getPostBySlug, getPostSlugs } from '../lib/mdx.ts';

test('every published post is valid, reachable by slug and listed newest first', async () => {
  const slugs = await getPostSlugs();
  assert.ok(slugs.length >= 5);
  assert.equal(new Set(slugs).size, slugs.length);
  const posts = await getAllPosts();
  assert.deepEqual(posts.map(p => p.slug).sort(), [...slugs].sort());
  for (let i = 1; i < posts.length; i++) assert.ok(posts[i - 1].date >= posts[i].date, 'sorted newest first');
  for (const post of posts) {
    assert.ok(post.content.trim().length > 500, post.slug);
    assert.equal((await getPostBySlug(post.slug)).title, post.title);
  }
});

test('an unknown slug is rejected instead of reading outside content/posts', async () => {
  await assert.rejects(getPostBySlug('../../package'));
  await assert.rejects(getPostBySlug('does-not-exist'));
});
