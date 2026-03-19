import type { CollectionEntry } from 'astro:content';

export function getPublishedPosts(posts: CollectionEntry<'blog'>[]) {
	return posts
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export function formatDate(date: Date) {
	return new Intl.DateTimeFormat('zh-TW', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	}).format(date);
}

export function slugifyTag(tag: string) {
	return tag
		.trim()
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export function getAllTags(posts: CollectionEntry<'blog'>[]) {
	const tags = new Map<string, { name: string; slug: string; count: number }>();

	for (const post of posts) {
		for (const tag of post.data.tags) {
			const slug = slugifyTag(tag);
			const existing = tags.get(slug);

			if (existing) {
				existing.count += 1;
			} else {
				tags.set(slug, { name: tag, slug, count: 1 });
			}
		}
	}

	return [...tags.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getPostsByTag(posts: CollectionEntry<'blog'>[], tagSlug: string) {
	return posts.filter((post) => post.data.tags.some((tag) => slugifyTag(tag) === tagSlug));
}
