#!/usr/bin/env python3
"""
Simple Static Site Generator - Initialization Script
Creates the directory structure and starter files for a new project.
"""

import os
import sys
from pathlib import Path


def create_directory_structure(base_dir='.'):
    """Create the necessary directories for the static site generator."""
    base_path = Path(base_dir)

    directories = [
        'templates',
        'content',
        'headers',
        'footers',
        'markdowns',
        'blogs',
        'output'
    ]

    print("Creating directory structure...")
    for directory in directories:
        dir_path = base_path / directory
        dir_path.mkdir(parents=True, exist_ok=True)
        print(f"  ✓ Created {directory}/")

    return base_path


def create_starter_files(base_path):
    """Create starter template and configuration files."""
    print("\nCreating starter files...")

    # Create config.yaml
    config_content = """# Static Site Generator Configuration
index.html:
  title: "My Website"
  description: "Welcome to my website"
  robots: "index, follow"
  author: "Your Name"
"""
    config_file = base_path / 'config.yaml'
    if not config_file.exists():
        with open(config_file, 'w') as f:
            f.write(config_content)
        print(f"  ✓ Created config.yaml")

    # Create page template
    page_template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <meta name="description" content="{{description}}">
    <meta name="robots" content="{{robots}}">
    {{header}}
</head>
<body>
    {{body}}
    {{footer}}
</body>
</html>
"""
    template_file = base_path / 'templates' / 'page_template.html'
    if not template_file.exists():
        with open(template_file, 'w') as f:
            f.write(page_template)
        print(f"  ✓ Created templates/page_template.html")

    # Create blog template
    blog_template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <meta name="description" content="{{summary}}">
    {{header}}
</head>
<body class="blog">
    <main>
        <article>
            <h1>{{title}}</h1>
            <p class="meta"><time>{{date}}</time></p>
            {{body}}
        </article>
    </main>
    {{footer}}
</body>
</html>
"""
    blog_template_file = base_path / 'templates' / 'blog_template.html'
    if not blog_template_file.exists():
        with open(blog_template_file, 'w') as f:
            f.write(blog_template)
        print(f"  ✓ Created templates/blog_template.html")

    # Create header
    header_content = """    <link rel="stylesheet" href="/style.css">
"""
    header_file = base_path / 'headers' / 'header.html'
    if not header_file.exists():
        with open(header_file, 'w') as f:
            f.write(header_content)
        print(f"  ✓ Created headers/header.html")

    # Create footer
    footer_content = """    <footer>
        <p>&copy; 2025 Your Name. All rights reserved.</p>
    </footer>
"""
    footer_file = base_path / 'footers' / 'footer.html'
    if not footer_file.exists():
        with open(footer_file, 'w') as f:
            f.write(footer_content)
        print(f"  ✓ Created footers/footer.html")

    # Create sample content
    content_html = """    <header>
        <nav>
            <a href="/">Home</a>
        </nav>
    </header>
    <main>
        <h1>Welcome!</h1>
        <p>This is your new static site. Edit the content files to customize it.</p>
    </main>
"""
    content_file = base_path / 'content' / 'index_content.html'
    if not content_file.exists():
        with open(content_file, 'w') as f:
            f.write(content_html)
        print(f"  ✓ Created content/index_content.html")

    # Create sample markdown
    markdown_content = """---
title: "My First Post"
summary: "This is my first blog post"
date: "2025-01-15"
author: "Your Name"
---

# Hello World

This is my first blog post using the static site generator!

## Features

- Easy to use
- Markdown support
- Customizable templates
"""
    markdown_file = base_path / 'markdowns' / 'first-post.md'
    if not markdown_file.exists():
        with open(markdown_file, 'w') as f:
            f.write(markdown_content)
        print(f"  ✓ Created markdowns/first-post.md")


def main():
    """Main entry point."""
    print("=" * 50)
    print("Simple Static Site Generator - Initialization")
    print("=" * 50)

    base_dir = sys.argv[1] if len(sys.argv) > 1 else '.'

    base_path = create_directory_structure(base_dir)
    create_starter_files(base_path)

    print("\n" + "=" * 50)
    print("Initialization complete!")
    print("=" * 50)
    print("\nNext steps:")
    print("1. Edit config.yaml to add your pages")
    print("2. Create content files in content/ directory")
    print("3. Run 'python3 build.py' to generate your site")
    print("4. Run 'python3 build_blog.py' to generate blog posts")


if __name__ == '__main__':
    main()
