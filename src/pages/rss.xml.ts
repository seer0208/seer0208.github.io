import { getCollection } from 'astro:content';
import {
	SITE_DESCRIPTION,
	SITE_TITLE,
	SITE_URL,
} from '../consts';
import { getPublishedPosts } from '../utils/blog';

function escapeXml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

export async function GET() {
	const site = new URL(SITE_URL);
	const posts = getPublishedPosts(await getCollection('blog'));
	const blogUrl = new URL('/blog/', site).toString();
	const feedUrl = new URL('/rss.xml', site).toString();
	const lastBuildDate = posts.reduce((latest, post) => {
		const candidate = post.data.updatedDate ?? post.data.pubDate;
		return candidate > latest ? candidate : latest;
	}, new Date(0));

	const items = posts
		.map((post) => {
			const url = new URL(`/blog/${post.id}/`, site).toString();
			const categories = post.data.tags
				.map((tag) => `			<category>${escapeXml(tag)}</category>`)
				.join('\n');

			return `		<item>
			<title>${escapeXml(post.data.title)}</title>
			<link>${url}</link>
			<guid isPermaLink="true">${url}</guid>
			<description>${escapeXml(post.data.description)}</description>
			<pubDate>${post.data.pubDate.toUTCString()}</pubDate>
${categories}
		</item>`;
		})
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(`${SITE_TITLE} Blog`)}</title>
		<link>${blogUrl}</link>
		<description>${escapeXml(`Latest posts from ${SITE_TITLE}. ${SITE_DESCRIPTION}`)}</description>
		<language>zh-TW</language>
		<generator>Astro</generator>
		<docs>https://www.rssboard.org/rss-specification</docs>
		<lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>
		<atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
		${items}
	</channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
}
