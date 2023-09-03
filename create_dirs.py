import os

def create_directory_structure():
    # List of directories to create
    dirs_to_create = ['headers', 'footers', 'content', 'templates', 'markdowns', 'blogs']
    
    # Create each directory
    for dir_name in dirs_to_create:
        if not os.path.exists(dir_name):
            os.makedirs(dir_name)
            print(f"Created directory: {dir_name}")
        else:
            print(f"Directory {dir_name} already exists.")

    # Create files
    with open("build.py", "w") as f:
        f.write("# Python script to add headers and footers to all content files.")
        
    with open("blog_generator.py", "w") as f:
        f.write("# Python script to convert Markdown blog posts to HTML.")
        
    with open("dissect.py", "w") as f:
        f.write("# Python script to dissect existing HTML pages into header, body, and footer.")

# Execute the function to create directory structure
create_directory_structure()