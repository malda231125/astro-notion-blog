import type { CollectionEntry } from 'astro:content';

export type BlogEntry = CollectionEntry<'blog'>;

export const slugifySegment = (text: string) =>
	text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-가-힣]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');

export const getPostSlug = (post: BlogEntry) => {
	const customSlug = post.data.slug?.trim();
	if (customSlug) return customSlug;
	const fallback = post.id.split('/').pop() ?? post.id;
	return fallback.trim();
};

export const getPostUrl = (post: BlogEntry) => `/blog/${getPostSlug(post)}/`;

export const getTagSlug = (tag: string) => slugifySegment(tag);
export const getTagUrl = (tag: string) => `/tags/${getTagSlug(tag)}/`;
export const tagMatchesSlug = (tag: string, slug: string) => getTagSlug(tag) === slug;

export const getAllTags = (posts: BlogEntry[]) =>
	[...new Set(posts.flatMap((post) => post.data.tags ?? []).filter(Boolean))].sort((a, b) =>
		a.localeCompare(b, 'ko'),
	);
