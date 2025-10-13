# Simple Static Site Generator

A lightweight, Python-based static site generator that converts modular HTML components and Markdown files into complete static websites.

## Features

- **Modular Design**: Separate content, headers, footers, and templates
- **YAML Configuration**: Easy page management with YAML files
- **Blog Support**: Convert Markdown files with YAML front matter to HTML
- **Template System**: Simple placeholder-based templating
- **Page-Specific Customization**: Override headers/footers per page
- **Clean Code**: Simple, readable Python with minimal dependencies

## Installation

### Requirements

- Python 3.6+
- PyYAML
- markdown (for blog posts)

### Install Dependencies

```bash
pip install PyYAML markdown
```

## Quick Start

### 1. Initialize a New Project

```bash
python3 init.py my-website
cd my-website
```

This creates the directory structure and starter files.

### 2. Configure Your Site

Edit `config.yaml` to define your pages:

```yaml
index.html:
  title: "My Website"
  description: "Welcome to my website"
  robots: "index, follow"
  author: "Your Name"

about.html:
  title: "About | My Website"
  description: "Learn more about me"
  robots: "index, follow"
  author: "Your Name"
```

### 3. Create Content

Create HTML content files in the `content/` directory:

- `content/index_content.html`
- `content/about_content.html`

### 4. Build Your Site

```bash
python3 build.py
```

Generated pages appear in the current directory (or specify output directory):

```bash
python3 build.py config.yaml output/
```

## Directory Structure

```
your-project/
├── config.yaml           # Page configuration
├── templates/            # HTML templates
│   ├── page_template.html
│   └── blog_template.html
├── content/              # Page content
│   ├── index_content.html
│   └── about_content.html
├── headers/              # Header sections
│   ├── header.html       # General header
│   └── about_header.html # Page-specific header
├── footers/              # Footer sections
│   └── footer.html
├── markdowns/            # Markdown blog posts
│   └── my-post.md
└── blogs/                # Generated blog posts
    └── my-post.html
```

## How It Works

### Page Generation

1. Reads `config.yaml` for page definitions
2. Loads appropriate template (`page_template.html` or custom)
3. Gets header (page-specific or general from `headers/`)
4. Gets footer from `footers/`
5. Gets content from `content/`
6. Replaces placeholders with actual content
7. Writes final HTML to output directory

### Template Placeholders

Templates use double-brace syntax for placeholders:

- `{{title}}` - Page title
- `{{description}}` - Meta description
- `{{robots}}` - Robots meta tag
- `{{header}}` - Header content
- `{{footer}}` - Footer content
- `{{body}}` - Main content
- Any custom fields from `config.yaml`

### Blog Posts

Create Markdown files with YAML front matter:

```markdown
---
title: "My Blog Post"
summary: "A brief summary"
date: "2025-01-15"
author: "Your Name"
---

# Hello World

Your content here...
```

Generate blog posts:

```bash
python3 build_blog.py
```

Or specify custom directories:

```bash
python3 build_blog.py markdowns/ blogs/ templates/blog_template.html
```

## Customization

### Page-Specific Headers

Create a header file named `{page}_header.html`:

- `about_header.html` will be used for `about.html`
- Falls back to `header.html` if page-specific not found

### Custom Templates

Create page-specific templates:

- `about_template.html` for `about.html`
- Falls back to `page_template.html`

### Multiple Configurations

Use different config files for different builds:

```bash
python3 build.py dev-config.yaml dev-output/
python3 build.py prod-config.yaml production/
```

## Examples

See the `examples/` directory for:

- Sample configuration files
- Example templates
- Sample content and headers
- Markdown blog post examples

## Development

### Testing Locally

Use Python's built-in HTTP server:

```bash
python3 -m http.server 8000
```

Visit `http://localhost:8000`

### Making Changes

1. Edit content files in `content/`
2. Update `config.yaml` if needed
3. Run `python3 build.py`
4. Refresh browser to see changes

## Comparison to Original Code

### Improvements

- **Object-Oriented**: Uses classes for better organization
- **Error Handling**: Comprehensive error messages
- **Pathlib**: Modern path handling with `pathlib`
- **Cleaner Code**: Removed debug print statements
- **Better Structure**: Separated concerns into methods
- **Extensible**: Easy to add new features
- **Documentation**: Comprehensive comments and docstrings

### Kept Simple

- No complex dependencies
- Plain Python with standard library
- Simple placeholder replacement
- Easy to understand and modify

## Troubleshooting

**No pages generated?**
- Check that `config.yaml` exists and is valid YAML
- Ensure content files exist in `content/` directory

**Missing template error?**
- Verify `templates/page_template.html` exists
- Check template filename matches expectations

**Placeholders not replaced?**
- Ensure placeholders use double braces: `{{key}}`
- Check config.yaml has the required fields

## License

MIT License - Feel free to use, modify, and distribute.

## Contributing

This is a simple tool meant to be customized for your needs. Fork it, modify it, make it your own!
