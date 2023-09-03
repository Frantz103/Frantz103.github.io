template = "<title>{{title}}</title>"
key = "title"
value = "My Web Page"

template = template.replace(f"{{{{{key}}}}}", value)
print(template)  # Should output "<title>My Web Page</title>"
