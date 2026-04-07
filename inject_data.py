import json
import os

data_path = r"c:\Users\Campa\Downloads\Presencialidad 1C 2026\data.json"
html_path = r"c:\Users\Campa\Downloads\Presencialidad 1C 2026\index.html"

if not os.path.exists(data_path):
    print(f"Error: {data_path} not found.")
    exit(1)

with open(data_path, "r", encoding="utf-8") as f:
    data = json.load(f)

with open(html_path, "r", encoding="utf-8") as f:
    html_content = f.read()

# Generate the JS object string
db_js = f"const DB = {json.dumps(data, indent=8, ensure_ascii=False)};"

# Find the DB block and replace it
import re
# We know the object starts with `const DB = {` and ends before `        const schedule = DB.schedule;`
pattern = r"const DB = \{\s*\"schedule\"[\s\S]*?\};\n\s*const schedule = DB\.schedule;"
new_html = re.sub(pattern, db_js + "\n        const schedule = DB.schedule;", html_content)

if new_html != html_content:
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(new_html)
    print("Successfully updated DB in index.html")
else:
    print("No changes needed or DB pattern not found.")
