#!/usr/bin/env python3
"""
Simple Static Site Generator - Main Build Script
Generates static HTML pages from templates, content, and configuration.
"""

import os
import sys
import yaml
from pathlib import Path


class SiteBuilder:
    """Builds static HTML pages from modular components."""

    def __init__(self, config_file='config.yaml', output_dir='.'):
        self.config_file = config_file
        self.output_dir = output_dir
        self.base_dir = Path.cwd()

        # Directory paths
        self.dirs = {
            'templates': self.base_dir / 'templates',
            'content': self.base_dir / 'content',
            'headers': self.base_dir / 'headers',
            'footers': self.base_dir / 'footers'
        }

    def read_file(self, directory, filename):
        """Read a file and return its contents."""
        filepath = directory / filename
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return f.read()
        except FileNotFoundError:
            print(f"Warning: {filepath} not found")
            return None
        except Exception as e:
            print(f"Error reading {filepath}: {e}")
            return None

    def load_config(self):
        """Load configuration from YAML file."""
        try:
            with open(self.config_file, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f)
        except FileNotFoundError:
            print(f"Error: {self.config_file} not found")
            sys.exit(1)
        except yaml.YAMLError as e:
            print(f"Error: Invalid YAML in {self.config_file}: {e}")
            sys.exit(1)

    def get_template(self, page_name):
        """Get the appropriate template for a page."""
        # Check for page-specific template
        page_template = self.read_file(self.dirs['templates'], f"{page_name}_template.html")
        if page_template:
            return page_template

        # Use blog template if 'blog' in page name
        if 'blog' in page_name.lower():
            return self.read_file(self.dirs['templates'], 'blog_template.html')

        # Default to page template
        return self.read_file(self.dirs['templates'], 'page_template.html')

    def get_header(self, page_name):
        """Get header for a page (page-specific or general)."""
        # Try page-specific header first
        specific_header = self.read_file(self.dirs['headers'], f"{page_name}_header.html")
        if specific_header:
            return specific_header

        # Fall back to general header
        return self.read_file(self.dirs['headers'], 'header.html') or ''

    def get_footer(self):
        """Get general footer."""
        return self.read_file(self.dirs['footers'], 'footer.html') or ''

    def get_content(self, page_name):
        """Get content for a page."""
        # Try with _content suffix
        content = self.read_file(self.dirs['content'], f"{page_name}_content.html")
        if content:
            return content

        # Try without suffix
        content = self.read_file(self.dirs['content'], f"{page_name}.html")
        return content

    def replace_placeholders(self, template, replacements):
        """Replace placeholders in template with actual values."""
        result = template
        for key, value in replacements.items():
            placeholder = f"{{{{{key}}}}}"
            result = result.replace(placeholder, str(value))
        return result

    def build_page(self, page_filename, page_config):
        """Build a single page."""
        page_name = page_filename.replace('.html', '')

        print(f"Building {page_filename}...")

        # Get components
        template = self.get_template(page_name)
        if not template:
            print(f"  Error: No template found for {page_filename}")
            return False

        header = self.get_header(page_name)
        footer = self.get_footer()
        content = self.get_content(page_name)

        if not content:
            print(f"  Error: No content found for {page_filename}")
            return False

        # Build replacements dictionary
        replacements = {
            'header': header,
            'footer': footer,
            'body': content,
            **page_config  # Add all config values
        }

        # Replace placeholders
        final_html = self.replace_placeholders(template, replacements)

        # Write output file
        output_path = Path(self.output_dir) / page_filename
        try:
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(final_html)
            print(f"  ✓ Generated {page_filename}")
            return True
        except Exception as e:
            print(f"  Error writing {page_filename}: {e}")
            return False

    def build_all(self):
        """Build all pages defined in config."""
        print("=" * 50)
        print("Static Site Generator - Building Pages")
        print("=" * 50)

        config = self.load_config()

        if not config:
            print("No pages found in config")
            return

        success_count = 0
        total_count = len(config)

        for page_filename, page_config in config.items():
            if self.build_page(page_filename, page_config):
                success_count += 1

        print("=" * 50)
        print(f"Build complete: {success_count}/{total_count} pages generated")
        print("=" * 50)


def main():
    """Main entry point."""
    # Check for command line arguments
    config_file = sys.argv[1] if len(sys.argv) > 1 else 'config.yaml'
    output_dir = sys.argv[2] if len(sys.argv) > 2 else '.'

    builder = SiteBuilder(config_file, output_dir)
    builder.build_all()


if __name__ == '__main__':
    main()
