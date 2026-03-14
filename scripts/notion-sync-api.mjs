import fs from 'node:fs/promises';
import path from 'node:path';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const token = process.env.NOTION_API_KEY;
const databaseId = process.env.NOTION_DATABASE_ID;

if (!token || !databaseId) {
	console.error('NOTION_API_KEY and NOTION_DATABASE_ID are required');
	process.exit(1);
}

const notion = new Client({ auth: token });
const n2m = new NotionToMarkdown({ notionClient: notion });

const outputDir = path.join(process.cwd(), 'src/content/blog/notion-api');
await fs.mkdir(outputDir, { recursive: true });

const toSlug = (text) =>
	text
		.toLowerCase()
		.trim()
		.replace(/[^\p{L}\p{N}\s-]/gu, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');

const normalizeSlug = (text) =>
	toSlug(text)
		.replace(/youtbue/g, 'youtube')
		.replace(/openclow/g, 'openclaw')
		.replace(/^-+|-+$/g, '');

const plain = (rich = []) => rich.map((r) => r.plain_text || '').join('').trim();
const escapeFrontmatterString = (value) => value.replaceAll('"', '\\"');

const stripFirstH1 = (content) => {
	const lines = content.replace(/\r\n/g, '\n').split('\n');
	const idx = lines.findIndex((line) => /^#\s+/.test(line));
	if (idx === -1) return content.trim() + '\n';
	lines.splice(idx, 1);
	while (lines[idx] === '') lines.splice(idx, 1);
	return lines.join('\n').trim() + '\n';
};

const sanitizeMarkdownLinks = (content) =>
	content
		.replace(/\(about:blank#/g, '(#')
		.replace(/\]\(about:blank#/g, '](#');

const normalizeBrandText = (text) => {
	if (!text) return text;
	let normalized = text;
	if (/OpenClaw/i.test(normalized) && !/오픈클로/.test(normalized)) {
		normalized = normalized.replace(/OpenClaw/gi, 'OpenClaw(오픈클로)');
	}
	if (/오픈클로/.test(normalized) && !/OpenClaw/i.test(normalized)) {
		normalized = normalized.replace(/오픈클로/g, 'OpenClaw(오픈클로)');
	}
	return normalized;
};

const formatKoreanDate = (value) => {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return '';
	return `${date.getUTCFullYear()}년 ${date.getUTCMonth() + 1}월 ${date.getUTCDate()}일`;
};

const uniqueTags = (tags) => [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))];

const deriveTags = ({ title, description }) => {
	const source = `${title}\n${description}`;
	const tags = [];

	if (/(?:openclaw|오픈클로)/i.test(source)) tags.push('OpenClaw');
	if (/유튜브/.test(source) && /트렌드/.test(source)) tags.push('유튜브 트렌드');
	if (/(?:docker|도커)/i.test(source)) tags.push('Docker');
	if (/설치/.test(source) || /가이드/.test(source)) tags.push('설치 가이드');
	if (/홈서버/.test(source)) tags.push('홈서버');
	if (/에이전트/.test(source)) tags.push('AI 에이전트');
	if (/자동화/.test(source)) tags.push('자동화');

	return uniqueTags(tags);
};

const buildSeoDescription = ({ title, description, pubDate, tags }) => {
	const normalizedDescription = normalizeBrandText(description);
	const pubDateText = formatKoreanDate(pubDate);

	if (tags.includes('유튜브 트렌드')) {
		return `${pubDateText} 기준 OpenClaw(오픈클로) 유튜브 동향과 핵심 이슈를 빠르게 훑어보는 트렌드 분석입니다.`;
	}

	if (tags.includes('Docker') || tags.includes('설치 가이드')) {
		return 'Docker 환경에서 OpenClaw(오픈클로)를 설치하고 실행하는 과정을 실무 기준으로 정리한 가이드입니다.';
	}

	if (normalizedDescription && normalizedDescription.length >= 35) {
		return normalizedDescription;
	}

	return `${normalizeBrandText(title)}에 관한 핵심 내용과 실무 관점을 정리한 글입니다.`;
};

function getTitle(properties) {
	const prop = properties?.Title;
	if (!prop || prop.type !== 'title') return 'untitled';
	return plain(prop.title) || 'untitled';
}

function getDescription(properties) {
	const prop = properties?.Description;
	if (!prop || prop.type !== 'rich_text') return 'Notion API에서 동기화된 게시글';
	return plain(prop.rich_text) || 'Notion API에서 동기화된 게시글';
}

function getSlug(properties, title, fallback) {
	const prop = properties?.Slug;
	if (prop?.type === 'rich_text') {
		const v = plain(prop.rich_text);
		if (v) return normalizeSlug(v);
	}
	return normalizeSlug(title) || fallback;
}

function getPublishDate(properties, fallback) {
	const prop = properties?.PublishDate;
	if (prop?.type === 'date' && prop.date?.start) return new Date(prop.date.start).toISOString();
	return fallback;
}

function getTags(properties) {
	const prop = properties?.Tags;
	if (prop?.type !== 'multi_select') return [];
	return uniqueTags(prop.multi_select.map((tag) => tag.name));
}

function isPublished(properties) {
	const prop = properties?.Published;
	return prop?.type === 'checkbox' ? Boolean(prop.checkbox) : false;
}

async function fetchPages() {
	const pages = [];
	let cursor = undefined;

	while (true) {
		const res = await notion.databases.query({
			database_id: databaseId,
			start_cursor: cursor,
			page_size: 100,
		});
		pages.push(...res.results);
		if (!res.has_more) break;
		cursor = res.next_cursor;
	}

	return pages.filter((p) => p.object === 'page' && isPublished(p.properties));
}

async function convertPageToMarkdown(pageId) {
	const mdblocks = await n2m.pageToMarkdown(pageId);
	return n2m.toMarkdownString(mdblocks).parent;
}

async function clearOutputDir() {
	const files = await fs.readdir(outputDir);
	for (const file of files) {
		if (file.endsWith('.md') || file.endsWith('.mdx')) {
			await fs.unlink(path.join(outputDir, file));
		}
	}
}

async function main() {
	const pages = await fetchPages();

	await clearOutputDir();

	if (pages.length === 0) {
		console.log('No published pages found in Notion database. Cleared existing generated posts.');
		return;
	}

	for (const page of pages) {
		const title = getTitle(page.properties);
		const rawDescription = getDescription(page.properties);
		const slug = getSlug(page.properties, title, page.id.replace(/-/g, '').slice(0, 8));
		const pubDate = getPublishDate(page.properties, page.created_time);
		const updatedDate = page.last_edited_time;
		const markdownBody = sanitizeMarkdownLinks(stripFirstH1(await convertPageToMarkdown(page.id)));
		const tags = uniqueTags([...getTags(page.properties), ...deriveTags({ title, description: rawDescription })]);
		const description = buildSeoDescription({
			title,
			description: rawDescription,
			pubDate,
			tags,
		});

		const fm = [
			'---',
			`title: "${escapeFrontmatterString(title)}"`,
			`description: "${escapeFrontmatterString(description)}"`,
			`pubDate: ${pubDate}`,
			`updatedDate: ${updatedDate}`,
			`slug: "${slug}"`,
			tags.length > 0
				? `tags: [${tags.map((tag) => `"${escapeFrontmatterString(tag)}"`).join(', ')}]`
				: 'tags: []',
			'---',
			'',
		].join('\n');

		const outPath = path.join(outputDir, `${slug}.md`);
		await fs.writeFile(outPath, `${fm}${markdownBody}\n`, 'utf8');
		console.log(`Synced Notion page: ${title} -> ${path.relative(process.cwd(), outPath)}`);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
