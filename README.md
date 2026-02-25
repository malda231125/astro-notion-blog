# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Notion 마크다운 업로드 워크플로우

1) 노션에서 Markdown으로 내보낸 파일을 `notion-drop/` 폴더에 넣습니다.

2) 동기화 스크립트를 실행합니다.

```sh
npm run sync:notion
```

3) 생성된 글은 `src/content/blog/notion/` 아래에 저장되고, Astro blog 라우팅에 의해 자동으로 URL이 생깁니다.
- 예: `src/content/blog/notion/my-post.md` → `/blog/notion/my-post/`

참고:
- frontmatter가 없는 노션 markdown은 스크립트가 title/description/pubDate를 자동 생성합니다.
- 이미 frontmatter가 있으면 내용을 유지한 채 동기화합니다.

## Notion API 자동 동기화

사전 준비:
- GitHub Secrets
  - `NOTION_API_KEY`
  - `NOTION_DATABASE_ID`

로컬 DB 생성(최초 1회):
```sh
NOTION_API_KEY=ntn_xxx npm run setup:notion:db
```

API 동기화 실행:
```sh
NOTION_API_KEY=ntn_xxx NOTION_DATABASE_ID=xxxx npm run sync:notion:api
```

자동 동기화:
- `.github/workflows/notion-sync.yml`
- 30분마다 Notion DB를 읽어 `src/content/blog/notion-api/`를 갱신하고 커밋/푸시합니다.
- `Published` 체크박스가 해제된 글은 다음 동기화 시 사이트 콘텐츠에서 자동으로 제거됩니다.

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
