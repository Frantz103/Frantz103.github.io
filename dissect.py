import os

# Markers to identify where the header, body, and footer start and end
header_end_marker = "</head>"
body_end_marker = "</html>"
footer_start_marker = "<!-- FOOTER_START -->"

# Loop through all HTML files in the current directory
for filename in os.listdir('.'):
    if filename.endswith('.html'):
        with open(filename, 'r') as f:
            content = f.read()

        # Find the positions of the markers
        header_end_pos = content.find(header_end_marker)
        body_end_pos = content.find(body_end_marker)
        footer_start_pos = content.find(footer_start_marker)

        # Extract and save the header if it exists
        if header_end_pos != -1:
            header_content = content[:header_end_pos]
            with open(f"{filename}_header.html", 'w') as f:
                f.write(header_content)
        
        # Extract and save the body if both header and body markers exist
        if header_end_pos != -1 and body_end_pos != -1:
            body_content = content[header_end_pos + len(header_end_marker):body_end_pos]
            with open(f"{filename}_body.html", 'w') as f:
                f.write(body_content)
        
        # Extract and save the footer if it exists
        if footer_start_pos != -1:
            footer_content = content[footer_start_pos:]
            with open(f"{filename}_footer.html", 'w') as f:
                f.write(footer_content)

        print(f"Dissected {filename} into available sections.")
