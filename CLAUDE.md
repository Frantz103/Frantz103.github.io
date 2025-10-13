# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Python-based static portfolio website generator that assembles HTML pages from modular components. It's hosted on GitHub Pages and uses a template-driven approach where content, headers, and footers are combined through Python scripts to generate final HTML pages.

## Build System

### Generate All Pages
```bash
python3 build.py
```
This is the primary build command. It reads `config.yaml`, processes templates from `templates/`, combines them with content from `content/`, headers from `headers/`, and footers from `footers/` to generate HTML pages in the root directory.

### Generate Blog Posts
```bash
python3 build_blog.py
```
Converts Markdown files from `markdowns/` to HTML blog posts in `blogs/`. Expects YAML front matter with `title` and `summary` fields in each Markdown file.

### Local Development Server
```bash
python3 -m http.server
```
Run in project root to test locally at http://localhost:8000

### Dependencies
```bash
pip install PyYAML markdown beautifulsoup4
```

## Architecture

### Template System
The build process uses a placeholder replacement strategy:
- `page_template.html` - Base template for standard pages
- `blog_template.html` - Base template for blog posts
- Placeholders like `{{title}}`, `{{description}}`, `{{header}}`, `{{footer}}`, `{{body}}` are replaced during build

### Directory Structure
- `templates/` - HTML template files with placeholder variables
- `content/` - Page body content (named as `{page}_content.html`)
- `headers/` - Header sections (page-specific headers use `{page}_header.html` naming)
- `footers/` - Footer sections (shared across pages)
- `markdowns/` - Markdown source files for blog posts with YAML front matter
- `blogs/` - Generated HTML blog posts
- Root directory - Final generated HTML pages served by GitHub Pages

### Configuration
`config.yaml` maps HTML filenames to their metadata (title, description, robots meta). Each page entry defines the attributes that will be injected into the template during build.

### Build Logic (build.py)
1. Loads `config.yaml` to get page definitions
2. For each page, checks for page-specific header (`{page}_header.html`), falls back to `header.html`
3. Selects appropriate template (blog_template for blog pages, page_template for others)
4. Replaces placeholders in template with values from config
5. Loads content from `content/{page}_content.html`
6. Assembles final HTML: template + header + content + footer
7. Writes output to root directory

### Build Logic (build_blog.py)
1. Scans `markdowns/` for `.md` files
2. Parses YAML front matter for metadata (title, summary)
3. Converts Markdown body to HTML using `markdown` library
4. Injects into `blog_template.html`
5. Writes to `blogs/` directory

## Utility Scripts

### config.py
Reverse-engineers existing HTML pages to generate default `config.yaml` entries. Useful when adding new pages or regenerating config.

### create_dirs.py
Bootstraps the directory structure for new projects (`headers/`, `footers/`, `content/`, `templates/`, `markdowns/`, `blogs/`).

### setup.py
Helper script to migrate existing HTML files to content directory with `_content.html` suffix.

### dissect.py
Extracts header, body, and footer sections from existing monolithic HTML files (useful for breaking down legacy pages).

## Adding New Pages

1. Create content file in `content/{pagename}_content.html`
2. Add page entry to `config.yaml` with title, description, robots metadata
3. (Optional) Create page-specific header in `headers/{pagename}_header.html`
4. Run `python3 build.py` to generate the page

## Adding New Blog Posts

1. Create Markdown file in `markdowns/{slug}.md` with YAML front matter:
```markdown
---
title: "Post Title"
summary: "Brief description"
---
Content here...
```
2. Run `python3 build_blog.py` to generate HTML in `blogs/`

## Key Conventions

- Content files must follow the naming pattern: `{page}_content.html` for a page called `{page}.html`
- Page-specific headers override the general header when named `{page}_header.html`
- The build scripts include debug print statements for troubleshooting placeholder replacement
- All generated pages are written to the root directory for GitHub Pages compatibility
- The site uses custom CSS in `style.css` and JavaScript in `js/` directory for navigation and interactions
