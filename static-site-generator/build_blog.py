#!/usr/bin/env python3
"""
Simple Static Site Generator - Blog Builder
Converts Markdown files with YAML front matter to HTML blog posts.
"""

import os
import sys
import yaml
import markdown
from pathlib import Path


class BlogBuilder:
    """Builds blog posts from Markdown files."""

    def __init__(self, markdown_dir='markdowns', output_dir='blogs', template_file='templates/blog_template.html'):
        self.markdown_dir = Path(markdown_dir)
        self.output_dir = Path(output_dir)
        self.template_file = Path(template_file)
        self.headers_dir = Path('headers')

    def read_file(self, filepath):
        """Read a file and return its contents."""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return f.read()
        except FileNotFoundError:
            print(f"Warning: {filepath} not found")
            return None
        except Exception as e:
            print(f"Error reading {filepath}: {e}")
            return None

    def parse_markdown(self, markdown_file):
        """Parse Markdown file with YAML front matter."""
        content = self.read_file(markdown_file)
        if not content:
            return None, None

        lines = content.split('\n')

        # Check for YAML front matter
        if not lines[0].strip() == '---':
            print(f"Warning: No YAML front matter found in {markdown_file}")
            return None, None

        # Extract YAML front matter
        yaml_lines = []
        i = 1
        while i < len(lines) and lines[i].strip() != '---':
            yaml_lines.append(lines[i])
            i += 1

        if i >= len(lines):
            print(f"Error: YAML front matter not closed in {markdown_file}")
            return None, None

        # Parse YAML metadata
        try:
            metadata = yaml.safe_load('\n'.join(yaml_lines))
        except yaml.YAMLError as e:
            print(f"Error parsing YAML in {markdown_file}: {e}")
            return None, None

        # Convert remaining Markdown to HTML
        markdown_text = '\n'.join(lines[i + 1:])
        html_body = markdown.markdown(markdown_text, extensions=['extra', 'codehilite'])

        return html_body, metadata

    def get_header(self, post_slug):
        """Get header for a blog post (post-specific or general)."""
        # Try post-specific header first
        specific_header_path = self.headers_dir / f"{post_slug}_header.html"
        specific_header = self.read_file(specific_header_path)
        if specific_header:
            return specific_header

        # Fall back to general header
        general_header_path = self.headers_dir / 'header.html'
        return self.read_file(general_header_path) or ''

    def build_post(self, markdown_file):
        """Build a single blog post."""
        post_slug = markdown_file.stem
        print(f"Building {post_slug}...")

        # Parse Markdown
        html_body, metadata = self.parse_markdown(markdown_file)
        if not html_body or not metadata:
            print(f"  Error: Could not parse {markdown_file}")
            return False

        # Validate required metadata
        if 'title' not in metadata:
            print(f"  Error: No 'title' in front matter of {markdown_file}")
            return False

        # Load template
        template = self.read_file(self.template_file)
        if not template:
            print(f"  Error: Could not load template {self.template_file}")
            return False

        # Get header
        header = self.get_header(post_slug)

        # Build replacements
        replacements = {
            'header': header,
            'body': html_body,
            'title': metadata.get('title', 'Blog Post'),
            'summary': metadata.get('summary', ''),
            'date': metadata.get('date', ''),
            'author': metadata.get('author', ''),
        }

        # Replace placeholders
        final_html = template
        for key, value in replacements.items():
            placeholder = f"{{{{{key}}}}}"
            final_html = final_html.replace(placeholder, str(value))

        # Create output directory if needed
        self.output_dir.mkdir(parents=True, exist_ok=True)

        # Write output file
        output_file = self.output_dir / f"{post_slug}.html"
        try:
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(final_html)
            print(f"  ✓ Generated {output_file}")
            return True
        except Exception as e:
            print(f"  Error writing {output_file}: {e}")
            return False

    def build_all(self):
        """Build all blog posts from Markdown files."""
        print("=" * 50)
        print("Static Site Generator - Building Blog Posts")
        print("=" * 50)

        if not self.markdown_dir.exists():
            print(f"Error: Markdown directory '{self.markdown_dir}' not found")
            return

        # Find all Markdown files
        markdown_files = list(self.markdown_dir.glob('*.md'))

        if not markdown_files:
            print(f"No Markdown files found in {self.markdown_dir}")
            return

        success_count = 0
        for md_file in markdown_files:
            if self.build_post(md_file):
                success_count += 1

        print("=" * 50)
        print(f"Build complete: {success_count}/{len(markdown_files)} posts generated")
        print("=" * 50)


def main():
    """Main entry point."""
    markdown_dir = sys.argv[1] if len(sys.argv) > 1 else 'markdowns'
    output_dir = sys.argv[2] if len(sys.argv) > 2 else 'blogs'
    template_file = sys.argv[3] if len(sys.argv) > 3 else 'templates/blog_template.html'

    builder = BlogBuilder(markdown_dir, output_dir, template_file)
    builder.build_all()


if __name__ == '__main__':
    main()
