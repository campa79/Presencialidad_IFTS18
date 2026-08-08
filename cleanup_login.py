import re

with open('login.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove public container
html = re.sub(r'<div class="container" id="mainContainer">.*?</main>\s*</div>', '', html, flags=re.DOTALL)

# Make admin modal visible
html = html.replace('<div id="adminModal" style="display: none;', '<div id="adminModal" style="display: flex;')

# Remove logVisit() since this is only admin
html = re.sub(r'async function logVisit\(\) \{.*?logVisit\(\);', '', html, flags=re.DOTALL)

# Also remove showAdminLogin
html = re.sub(r'showAdminLogin\(\);', '', html, flags=re.DOTALL)

with open('login.html', 'w', encoding='utf-8') as f:
    f.write(html)
