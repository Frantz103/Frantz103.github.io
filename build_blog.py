import os
import markdown
import yaml


def parse_markdown_to_html(markdown_file_path):
    with open(markdown_file_path, 'r') as f:
        lines = f.readlines()
    
    # Extract YAML front matter
    if lines[0] != '---\n':
        print("No YAML front matter found.")
        return None, None
    
    yaml_lines = []
    i = 1
    while lines[i] != '---\n':
        yaml_lines.append(lines[i])
        i += 1
    metadata = yaml.safe_load(''.join(yaml_lines))
    
    # Convert Markdown to HTML
    md_text = ''.join(lines[i+1:])
    html_body = markdown.markdown(md_text)
    
    return html_body, metadata


def read_file(directory, filename):
    try:
        with open(f"{directory}/{filename}", 'r') as f:
            return f.read()
    except FileNotFoundError:
        print(f"Error: {directory}/{filename} not found.")
        return None

# Paths
header_dir = "./headers"
markdown_dir = "./markdowns"
output_dir = "./blogs"

# Read the general header
general_header = read_file(header_dir, "header.html")

# Loop through each Markdown file in the markdown directory
for markdown_file in os.listdir(markdown_dir):
    if markdown_file.endswith(".md"):
        # Parse the Markdown to HTML, and any metadata like title, summary, etc.
        html_body, metadata = parse_markdown_to_html(f"{markdown_dir}/{markdown_file}")
        
        # Initialize with general header
        header_to_use = general_header

        # Try to find a specific header for this page
        specific_header_name = f"{markdown_file.replace('.md', '')}_header.html"
        specific_header = read_file(header_dir, specific_header_name)

        # Use specific header if found
        if specific_header:
            header_to_use = specific_header
        
        # Your HTML template for blogs
        blog_template = read_file("./templates", "blog_template.html")

        # Replace placeholders in template
        final_html = blog_template.replace("{{body}}", html_body)
        final_html = final_html.replace("{{title}}", metadata["title"])
        final_html = final_html.replace("{{header}}", header_to_use)
        final_html = final_html.replace("{{summary}}", metadata["summary"])
        # ... (other replacements)

        # Save to output directory
        output_filename = f"{output_dir}/{markdown_file.replace('.md', '.html')}"
        with open(output_filename, 'w') as f:
            f.write(final_html)
