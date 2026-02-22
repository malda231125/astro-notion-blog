import { Client } from '@notionhq/client';

const token = process.env.NOTION_API_KEY;
if (!token) {
  console.error('NOTION_API_KEY is required');
  process.exit(1);
}

const notion = new Client({ auth: token });

async function main() {
  const parentPageId = process.env.NOTION_PARENT_PAGE_ID;

  let parentId = parentPageId;

  if (!parentId) {
    const rootPage = await notion.pages.create({
      parent: { workspace: true },
      properties: {
        title: {
          title: [{ text: { content: 'Astro Notion Blog Workspace' } }],
        },
      },
      children: [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{ type: 'text', text: { content: 'Blog post source DB for Astro auto-sync.' } }],
          },
        },
      ],
    });

    parentId = rootPage.id;
    console.log(`Created parent page: ${parentId}`);
  }

  const db = await notion.databases.create({
    parent: { type: 'page_id', page_id: parentId },
    title: [{ type: 'text', text: { content: 'Astro Blog Posts' } }],
    properties: {
      Title: { title: {} },
      Description: { rich_text: {} },
      Slug: { rich_text: {} },
      Published: { checkbox: {} },
      PublishDate: { date: {} },
      Tags: { multi_select: {} },
    },
  });

  console.log(`Created database: ${db.id}`);
  console.log('\nSet this as env/secret:');
  console.log(`NOTION_DATABASE_ID=${db.id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
