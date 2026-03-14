import type { CollectionEntry } from 'astro:content';

export type BlogEntry = CollectionEntry<'blog'>;

export const slugifySegment = (text: string) =>
	text
		.toLowerCase()
		.trim()
		.replace(/[^\p{L}\p{N}\s-]/gu, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');

const normalizeTag = (tag?: string | null) => tag?.trim() ?? '';
export const isUsableTag = (tag?: string | null) => {
	const normalized = normalizeTag(tag);
	return Boolean(normalized) && Boolean(slugifySegment(normalized));
};

export const getPostSlug = (post: BlogEntry) => {
	const customSlug = post.data.slug?.trim();
	if (customSlug) return customSlug;
	const fallback = post.id.split('/').pop() ?? post.id;
	return fallback.trim();
};

export const getPostUrl = (post: BlogEntry) => `/blog/${getPostSlug(post)}/`;

export const getTagSlug = (tag: string) => slugifySegment(normalizeTag(tag));
export const getTagUrl = (tag: string) => `/tags/${getTagSlug(tag)}/`;
export const tagMatchesSlug = (tag: string, slug: string) => getTagSlug(tag) === slug;

export const sortBlogPosts = (posts: BlogEntry[]) =>
	[...posts].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

export const getAllTags = (posts: BlogEntry[]) =>
	[
		...new Set(
			posts.flatMap((post) => (post.data.tags ?? []).map((tag) => normalizeTag(tag)).filter(isUsableTag)),
		),
	].sort((a, b) => a.localeCompare(b, 'ko'));

const getSharedTagCount = (left: BlogEntry, right: BlogEntry) => {
	const leftTags = new Set((left.data.tags ?? []).filter(isUsableTag));
	return (right.data.tags ?? []).filter((tag) => leftTags.has(tag)).length;
};

export const getRelatedPosts = (posts: BlogEntry[], current: BlogEntry, limit = 3) =>
	sortBlogPosts(posts)
		.filter((post) => getPostSlug(post) !== getPostSlug(current))
		.map((post) => ({
			post,
			sharedTagCount: getSharedTagCount(current, post),
		}))
		.sort((a, b) => {
			if (b.sharedTagCount !== a.sharedTagCount) return b.sharedTagCount - a.sharedTagCount;
			return b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf();
		})
		.slice(0, limit)
		.map((entry) => entry.post);
