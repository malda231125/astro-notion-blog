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
    .replace(/[^\w\s-가-힣]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const plain = (rich = []) => rich.map((r) => r.plain_text || '').join('').trim();

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
    if (v) return toSlug(v);
  }
  return toSlug(title) || fallback;
}

function getPublishDate(properties, fallback) {
  const prop = properties?.PublishDate;
  if (prop?.type === 'date' && prop.date?.start) return new Date(prop.date.start).toISOString();
  return fallback;
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

async function main() {
  const pages = await fetchPages();

  if (pages.length === 0) {
    console.log('No published pages found in Notion database.');
    return;
  }

  for (const page of pages) {
    const title = getTitle(page.properties);
    const description = getDescription(page.properties);
    const slug = getSlug(page.properties, title, page.id.replace(/-/g, '').slice(0, 8));
    const pubDate = getPublishDate(page.properties, page.created_time);
    const updatedDate = page.last_edited_time;

    const markdownBody = await convertPageToMarkdown(page.id);

    const fm = [
      '---',
      `title: "${title.replaceAll('"', '\\"')}"`,
      `description: "${description.replaceAll('"', '\\"')}"`,
      `pubDate: ${pubDate}`,
      `updatedDate: ${updatedDate}`,
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
