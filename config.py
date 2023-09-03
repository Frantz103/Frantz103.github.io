import os
import yaml
from bs4 import BeautifulSoup

# Function to generate default YAML configuration for an HTML page
def generate_default_config(filename, directory_path):
    full_path = os.path.join(directory_path, filename)
    config = {
        "title": "Frantz Augustin Portfolio",
        "description": "",
        "robots": "index, follow",
        "social_media_tags": "",
        "schemas": "",
        "custom_head": "",
        "inline_js": "",
        "html_class": ""  # Add this new field
    }

    with open(full_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')
        
    html_tag = soup.find('html')
    if html_tag and 'class' in html_tag.attrs:
        config['html_class'] = html_tag['class'][0] if isinstance(html_tag['class'], list) else html_tag['class']
        

    if soup.title and soup.title.string:
        config['title'] = str(soup.title.string)
    
    description_tag = soup.find('meta', attrs={'name': 'description'})
    if description_tag and 'content' in description_tag.attrs:
        config['description'] = str(description_tag['content'])
    
    robots_tag = soup.find('meta', attrs={'name': 'robots'})
    if robots_tag and 'content' in robots_tag.attrs:
        config['robots'] = str(robots_tag['content'])

    # Add additional parsing logic for social_media_tags, schemas, custom_head, inline_js, etc.

    return config

# Main function
def main():
    config = {}
    directory_path = "./"  # Replace with the path of your HTML files

    # Iterate through all files in the folder
    for filename in os.listdir(directory_path):
        if filename.endswith(".html"):
            config[filename] = generate_default_config(filename, directory_path)

    # Write the configuration to a YAML file
    with open('config.yaml', 'w') as f:
        print(config)
        yaml.dump(config, f, default_flow_style=False)

if __name__ == '__main__':
    main()
