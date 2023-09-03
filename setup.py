import os
import shutil

def move_and_rename_html_files():
    # Define source and destination directories
    source_dir = './'
    dest_dir = './content/'

    # Create the destination directory if it doesn't exist
    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)

    # Loop through all files in the source directory
    for filename in os.listdir(source_dir):
        if filename.endswith('.html'):
            # Construct the new filename
            new_filename = filename.replace('.html', '_content.html')

            # Construct full file paths for source and destination
            source = os.path.join(source_dir, filename)
            destination = os.path.join(dest_dir, new_filename)

            # Move and rename the file
            shutil.move(source, destination)
            print(f"Moved and renamed {filename} to {new_filename} in content folder.")

if __name__ == '__main__':
    move_and_rename_html_files()
