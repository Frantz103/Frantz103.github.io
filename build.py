import os
import yaml

def read_file(directory, filename):
    filepath = os.path.join(directory, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            return f.read()
    else:
        print(f"Error: {filepath} not found.")
        return None

header_dir = './headers'
footer_dir = './footers'
content_dir = './content'
template_dir = './templates'
config_file = 'config.yaml'

general_header = read_file(header_dir, 'header.html')
footer = read_file(footer_dir, 'footer.html')

page_template = read_file(template_dir, 'page_template.html')
blog_template = read_file(template_dir, 'blog_template.html')

try:
    with open(config_file, 'r') as f:
        config = yaml.safe_load(f)
except FileNotFoundError:
    print(f"Error: {config_file} not found.")
    exit(1)
except yaml.YAMLError:
    print(f"Error: {config_file} contains invalid YAML.")
    exit(1)

for page, attributes in config.items():
    # Initialize with general header
    header_to_use = general_header

    # Try to find a specific header for this page
    specific_header_name = f"{page.replace('.html', '')}_header.html"
    specific_header = read_file(header_dir, specific_header_name)

    # Use specific header if found
    if specific_header:
        header_to_use = specific_header
    
    # Start with the base template
    template_to_use = blog_template if 'blog' in page else page_template

    # Debugging: Print attributes to replace and initial state
    print(f"Debug: Page = {page}, attributes = {attributes}")
    print(f"Debug: Initial template_to_use = {template_to_use[:100]}")

    for key, value in attributes.items():
        print(f"Debug: Attributes dict = {attributes}")
        print(f"Debug: Trying to replace {{{{ {key} }}}}")
        template_to_use = template_to_use.replace(f"{{{{{key}}}}}", str(value))
        print(f"Debug: After replacement = {template_to_use[:300]}")

    
    # Convert page to its corresponding content filename
    content_page = page.replace('.html', '_content.html')
    
    # Then proceed to read the content using this new filename
    content = read_file(content_dir, content_page)
    
    # Check if the content is None
    if content is None:
        print(f"Skipping {page} as content is not found.")
        continue
    
    # Replace header, footer, and content
    filled_template = template_to_use
    filled_template = filled_template.replace("{{header}}", header_to_use)
    filled_template = filled_template.replace("{{footer}}", footer)
    filled_template = filled_template.replace("{{body}}", content)
    
    
    # Write to file
    output_filename = page
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.write(filled_template)
        print(f"Generated {output_filename}")
