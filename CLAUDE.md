# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Frantz Augustin — research, writing, and creative work. Built with **Astro 5.x** (static site generation), deployed from `docs/` to both GitHub Pages and Netlify.

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Build to docs/ and verify artifacts
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Architecture

### Stack
- **Astro 5.x** — static site generator with file-based routing
- **React** — used only for 2 interactive islands (`NavIsland.tsx`, `ShareButton.tsx`)
- **Tailwind CSS v4** — via PostCSS (no `@astrojs/tailwind` — incompatible with v4)
- **Content Collections** — essays and field notes stored as Markdown with Zod schemas

### Key Directories
- `src/pages/` — file-based routing (each `.astro` file = one page)
- `src/layouts/` — `BaseLayout.astro` (shell) + `EssayLayout.astro` (article chrome)
- `src/components/` — Astro components (static) + React islands (interactive)
- `src/content/` — Markdown content collections (essays, field-notes)
- `src/data/` — TypeScript data files (site config, research interests, social links, creative cards, technical writing, timeline, projects)
- `src/styles/` — `global.css` with Tailwind imports and custom animations
- `src/assets/` — Images processed by Astro's `<Image>` component
- `public/` — Static assets served as-is (favicon, homepage.jpg, robots.txt, CNAME)
- `docs/` — Build output (do not edit directly)

### Content Collections
- `src/content/essays/` — Markdown essays with frontmatter: title, date, excerpt, slug, draft (optional boolean)
- `src/content/field-notes/` — Field notes with frontmatter: title, lastUpdated, quote
- Schema defined in `src/content.config.ts`
- Essays with `draft: true` are filtered from `/writing/` listing and slug route generation — they exist in the repo but are not rendered on the site

### Drafts Workspace
- `drafts/` at project root is a symlink to the "Writing Drafts" Obsidian vault in iCloud
- Contains `tasks.md` (writing checklist), `references.md` (index of published work), and `outlines/` folder
- Gitignored — local-only, not committed to the repo

### Key Patterns
- **Islands architecture**: Only `NavIsland.tsx` (`client:load`) and `ShareButton.tsx` (`client:visible`) ship JS to the browser
- **Inline SVG**: Astro components use inline SVG paths instead of icon libraries
- **`lucide-react`** is only imported inside React island components
- **Trailing slashes**: All internal links end with `/` (`trailingSlash: 'always'` in config)
- **Fonts**: Google Fonts loaded via `<link>` in `BaseHead.astro` (Golos Text + Playfair Display)

### Deployment
- `outDir: 'docs'` for GitHub Pages compatibility
- Netlify reads `netlify.toml` (publish: docs)
- Sitemap generated at `/sitemap-index.xml` via `@astrojs/sitemap`
- RSS feed at `/rss.xml`
- Contact form uses Netlify Forms (`data-netlify="true"` on static HTML)

## Adding Content

### New Essay
1. Create `src/content/essays/{slug}.md` with frontmatter: title, date, excerpt, slug
2. Build — the essay auto-appears on `/writing/` and gets its own page at `/writing/{slug}/`

### New Page
1. Create `src/pages/{name}.astro`
2. Import and use `BaseLayout` as the wrapper
3. Add nav link in `src/data/site.ts` if needed

### Timeline (`/timeline/`)
The learning timeline lives at `/timeline/` and is linked from the About page ("See my full technical journey →"). It is **not** in the main nav — it's a secondary page for research collaborators.

**Data file**: `src/data/timeline.ts`
**Page file**: `src/pages/timeline.astro`

#### Adding a timeline event
Add an object to the `timelineEvents` array in `src/data/timeline.ts`:
```typescript
{
  year: '2025',           // Events are grouped and sorted by year
  title: 'Project Name',
  icon: 'code',           // One of: spark, brain, pen, code, lab, eye, mic, blocks, search
  description: 'One or two sentences about what was built or achieved.',
  links: [                // Optional — omit if no external links
    { label: 'GitHub', href: 'https://...' },
  ],
}
```
Insert it in chronological order within the array. Events within the same year display in array order (top to bottom = first to last).

#### Removing a timeline event
Delete the object from the `timelineEvents` array. If the event also exists in `src/data/projects.ts`, decide whether to remove it there too — timeline and projects are independent datasets.

#### How the page works
- Events are grouped by `year` and sorted chronologically
- The meta description includes a dynamic year range: `${firstYear}–${currentYear}` (computed at build time via `new Date().getFullYear()`)
- Desktop: year labels on left (sticky), event cards on right
- Mobile: single column with vertical line and dot markers
- External links render as small arrow-icon buttons matching the project page pattern

### Projects (`/projects/`)
**Data file**: `src/data/projects.ts`

Each project has a `tier` field (`'featured'` | `'experiment'` | `'notebook'`) that controls which section it appears in on the projects page. The `links` field uses the same `{ label, href }` format as timeline events.

### Writing Page (`/writing/`)
The writing page displays three sections in this order:
1. **Selected Essays** — from `src/content/essays/` (drafts filtered out)
2. **Technical Writing & Analysis** — from `src/data/technical-writing.ts`
3. **Research Interests** — from `src/data/research-interests.ts`

### Style Guidelines
- Avoid acronyms and internal jargon in public-facing titles and descriptions
- Write in plain, accessible language — describe what things do, not what they're called
- Don't use self-aggrandizing words like "novel" — prefer "original" or just describe the work
