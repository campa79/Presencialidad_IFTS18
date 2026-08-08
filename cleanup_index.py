import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove adminModal
html = re.sub(r'<!-- Admin Login Modal -->.*?</div>\s*</div>', '', html, flags=re.DOTALL)

# Remove adminPanel
html = re.sub(r'<!-- Admin Panel -->.*?</main>\s*</div>', '', html, flags=re.DOTALL)

# Remove CRUD Modal
html = re.sub(r'<!-- CRUD Modal -->.*?</div>\s*</div>', '', html, flags=re.DOTALL)

# Remove some admin JS functions
html = re.sub(r'function doAdminLogin\(\) \{.*?(?=function logoutAdmin\(\))', '', html, flags=re.DOTALL)
html = re.sub(r'function logoutAdmin\(\) \{.*?(?=function updateConfig\()', '', html, flags=re.DOTALL)
html = re.sub(r'async function updateConfig\(.*?\}', '', html, flags=re.DOTALL)
html = re.sub(r'function renderAdminMatrix\(\) \{.*?(?=function switchAdminTab\()', '', html, flags=re.DOTALL)
html = re.sub(r'function switchAdminTab\(\w+\) \{.*?(?=function renderAdminProfessors\()', '', html, flags=re.DOTALL)
html = re.sub(r'function renderAdminProfessors\(\) \{.*?(?=function renderAdminSchedule\()', '', html, flags=re.DOTALL)
html = re.sub(r'function renderAdminSchedule\(\) \{.*?(?=async function renderAdminStats\()', '', html, flags=re.DOTALL)
html = re.sub(r'async function renderAdminStats\(\) \{.*?(?=function closeCrudModal\()', '', html, flags=re.DOTALL)
html = re.sub(r'function closeCrudModal\(\) \{.*?(?=function openProfessorModal\()', '', html, flags=re.DOTALL)
html = re.sub(r'function openProfessorModal\(.*?\}', '', html, flags=re.DOTALL)
html = re.sub(r'function openScheduleModal\(.*?\}', '', html, flags=re.DOTALL)
html = re.sub(r'function saveCrud\(.*?\}', '', html, flags=re.DOTALL)
html = re.sub(r'function deleteProfessor\(.*?\}', '', html, flags=re.DOTALL)
html = re.sub(r'function deleteSchedule\(.*?\}', '', html, flags=re.DOTALL)

# Remove the showAdminLogin call from window.onload or similar
html = re.sub(r'function showAdminLogin\(e\) \{.*?\}', '', html, flags=re.DOTALL)
html = re.sub(r'document\.addEventListener\("keydown", function\(e\) \{.*?(?=const inputSearch)', '', html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
