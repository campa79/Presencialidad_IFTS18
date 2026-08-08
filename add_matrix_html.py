import sys

with open('login.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add CSS
css_to_add = '''
        .matrix-aulas-table th { background: #5b9bd5; color: white; text-align: center; }
        .cell-free { background-color: #d4edda !important; color: #155724; text-align: center; vertical-align: middle; }
        .cell-reserved { background-color: #f8d7da !important; color: #721c24; vertical-align: top; }
        .reserved-info { font-size: 0.85rem; margin-bottom: 0.25rem; }
        .reserved-title { font-weight: bold; font-size: 0.95rem; }
'''
html = html.replace('    </style>', css_to_add + '\n    </style>', 1)

# 2. Replace the #tab-matrix HTML
old_matrix_html = '''            <!-- Tab Matrix -->
            <div id="tab-matrix" class="admin-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h2>Matriz General</h2>
                    <button class="download-btn" onclick="renderAdminMatrix()" style="margin:0;"><i class="fas fa-sync"></i> Refrescar</button>
                </div>
                <div class="table-responsive">
                    <table class="admin-table">
                        <thead id="adminMatrixHead"></thead>
                        <tbody id="adminMatrixBody"></tbody>
                    </table>
                </div>
            </div>'''

new_matrix_html = '''            <!-- Tab Matrix -->
            <div id="tab-matrix" class="admin-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h2>Ocupación de Aulas</h2>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <select id="matrixWeekSelect" onchange="renderAdminMatrix()" style="padding: 0.5rem; border-radius: 6px; border: 1px solid var(--border-color);">
                            <!-- Options injected by JS -->
                        </select>
                        <button class="download-btn" onclick="renderAdminMatrix()" style="margin:0; background: var(--secondary);"><i class="fas fa-sync"></i> Refrescar</button>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="admin-table matrix-aulas-table">
                        <thead id="adminMatrixHead">
                            <tr>
                                <th>Aula</th>
                                <th>Lunes</th>
                                <th>Martes</th>
                                <th>Miércoles</th>
                                <th>Jueves</th>
                                <th>Viernes</th>
                            </tr>
                        </thead>
                        <tbody id="adminMatrixBody"></tbody>
                    </table>
                </div>
            </div>'''
html = html.replace(old_matrix_html, new_matrix_html, 1)


with open('login.html', 'w', encoding='utf-8') as f:
    f.write(html)
