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
- `src/data/` — TypeScript data files (site config, research interests, social links, creative cards)
- `src/styles/` — `global.css` with Tailwind imports and custom animations
- `src/assets/` — Images processed by Astro's `<Image>` component
- `public/` — Static assets served as-is (favicon, homepage.jpg, robots.txt, CNAME)
- `docs/` — Build output (do not edit directly)

### Content Collections
- `src/content/essays/` — Markdown essays with frontmatter: title, date, excerpt, slug
- `src/content/field-notes/` — Field notes with frontmatter: title, lastUpdated, quote
- Schema defined in `src/content.config.ts`

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
