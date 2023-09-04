## My Static Portfolio Generator

### Description

This Python script generates a static website using HTML templates and YAML files for page attributes. The script is flexible, allowing for custom headers, footers, and content to be defined on a per-page basis.

### Requirements

1. Python 3.x
2. PyYAML (for handling YAML files)
3. To install PyYAML, run:

~~~
pip install PyYAML
~~~


### Features

1. Generates pages from HTML templates
2. Supports custom headers and footers
3. Fetches attributes from YAML files to populate templates
4. Handles errors gracefully, with debug output for easy troubleshooting

### How to Use

Clone this repository:

Run the script:
~~~
python3 build.py
~~~

### Adding New Pages
1. Add your HTML template into the templates folder.
2. Add the corresponding YAML file with page attributes in the attributes folder.
3. If you want a custom header or footer, add those into the headers and footers folders respectively.
4. Run build.py to generate the new page.


To test on **local environment.**
Run the comand below in the website directory
~~~
python3 -m http.server
~~~

You can now view thew website by navigating to http://127.0.0.1:8000 or http://localhost:8000 in your web browser.

You also test using VS Code Live Server: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer