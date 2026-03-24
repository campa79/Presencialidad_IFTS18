import base64

image_path = r"c:\Users\Campa\Downloads\Presencialidad 1C 2026\IFTS_18.jpg"
html_path = r"c:\Users\Campa\Downloads\Presencialidad 1C 2026\index.html"

try:
    with open(image_path, "rb") as img_file:
        b64_string = base64.b64encode(img_file.read()).decode('utf-8')
except Exception as e:
    print(f"Error reading image: {e}")
    exit(1)

img_tag = f'<img src="data:image/jpeg;base64,{b64_string}" alt="Logo IFTS 18" style="max-height: 100px; width: auto; margin-bottom: 1.5rem; object-fit: contain;">\n            <h1>'

with open(html_path, "r", encoding="utf-8") as f:
    html_content = f.read()

if '<img src="data:image' not in html_content:
    new_html = html_content.replace('<h1>Consulta de Presencialidad</h1>', img_tag + 'Consulta de Presencialidad</h1>')
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(new_html)
    print("Logo successfully injected into index.html")
else:
    print("Logo already present.")
