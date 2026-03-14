import fs from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const inputDir = path.join(projectRoot, 'notion-drop');
const outputDir = path.join(projectRoot, 'src/content/blog/notion');

const toSlug = (text) =>
	text
		.toLowerCase()
		.trim()
		.replace(/\.[^.]+$/, '')
		.replace(/[^\w\s-가-힣]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');

const normalizeSlug = (text) =>
	toSlug(text)
		.replace(/youtbue/g, 'youtube')
		.replace(/openclow/g, 'openclaw')
		.replace(/^-+|-+$/g, '');

const hasFrontmatter = (content) => content.trimStart().startsWith('---\n');

const extractTitle = (content, fallback) => {
	const headingMatch = content.match(/^#\s+(.+)$/m);
	if (headingMatch?.[1]) return headingMatch[1].trim();
	return fallback;
};

const stripFirstH1 = (content) => {
	const lines = content.split('\n');
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

async function main() {
	await fs.mkdir(inputDir, { recursive: true });
	await fs.mkdir(outputDir, { recursive: true });

	const files = await fs.readdir(inputDir);
	const markdownFiles = files.filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

	if (markdownFiles.length === 0) {
		console.log('No markdown files found in notion-drop/.');
		return;
	}

	for (const file of markdownFiles) {
		const inputPath = path.join(inputDir, file);
		const raw = await fs.readFile(inputPath, 'utf8');
		const baseName = path.basename(file, path.extname(file));

		let outputContent = sanitizeMarkdownLinks(raw);
		let slug = normalizeSlug(baseName);

		if (!hasFrontmatter(raw)) {
			const title = extractTitle(raw, baseName);
			slug = normalizeSlug(title) || slug;
			const body = sanitizeMarkdownLinks(stripFirstH1(raw));
			const today = new Date().toISOString();
			outputContent = `---\ntitle: "${title.replaceAll('"', '\\"')}"\ndescription: "Notion에서 가져온 초안"\npubDate: ${today}\nslug: "${slug}"\ntags: []\n---\n\n${body}`;
		}

		const outputPath = path.join(outputDir, `${slug}.md`);
		await fs.writeFile(outputPath, outputContent, 'utf8');
		console.log(`Synced: ${file} -> src/content/blog/notion/${slug}.md`);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
