import sys

with open('login.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace Admin Modal HTML
old_modal_html = '''    <!-- Admin Login Modal -->
    <div id="adminModal" style="display: flex; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 2000; align-items: center; justify-content: center;">
        <div style="background: white; padding: 2rem; border-radius: 12px; width: 100%; max-width: 400px; box-shadow: var(--shadow);">
            <h2 style="margin-bottom: 1rem;"><i class="fas fa-lock"></i> Acceso Admin</h2>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Usuario</label>
                <input type="text" id="adminUser" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color);">
            </div>
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Contraseña</label>
                <input type="password" id="adminPass" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color);">
            </div>
            <div style="color: var(--danger); margin-bottom: 1rem; font-size: 0.9rem; display: none;" id="adminError">Credenciales incorrectas</div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button onclick="closeAdminLogin()" style="background: transparent; color: var(--text-muted); border: none; cursor: pointer; padding: 0.5rem 1rem; font-weight: 600;">Cancelar</button>
                <button onclick="doAdminLogin()" class="download-btn" style="margin: 0; background: var(--primary);">Ingresar</button>
            </div>
        </div>
    </div>'''

new_modal_html = '''    <!-- Admin Login Page -->
    <div id="adminModal" style="display: flex; min-height: 60vh; align-items: center; justify-content: center; background: #f4f7f6; padding: 2rem;">
        <div style="background: white; padding: 2.5rem; border-radius: 12px; width: 100%; max-width: 420px; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
            <h2 style="margin-bottom: 1.5rem; color: var(--primary); text-align: center;"><i class="fas fa-lock"></i> Acceso Admin</h2>
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #4a5568;">Usuario</label>
                <input type="text" id="adminUser" style="width: 100%; padding: 0.85rem; border-radius: 8px; border: 1px solid var(--border-color); font-size: 1rem;">
            </div>
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #4a5568;">Contraseña</label>
                <input type="password" id="adminPass" style="width: 100%; padding: 0.85rem; border-radius: 8px; border: 1px solid var(--border-color); font-size: 1rem;" onkeypress="if(event.key === 'Enter') doAdminLogin();">
            </div>
            <div style="color: var(--danger); margin-bottom: 1rem; font-size: 0.95rem; display: none; text-align: center; font-weight: 500;" id="adminError"><i class="fas fa-exclamation-circle"></i> Credenciales incorrectas</div>
            <div style="display: flex; justify-content: center; margin-top: 2rem;">
                <button onclick="doAdminLogin()" class="download-btn" style="margin: 0; width: 100%; padding: 0.85rem; background: var(--primary); font-size: 1.05rem;">Iniciar Sesión</button>
            </div>
        </div>
    </div>'''
html = html.replace(old_modal_html, new_modal_html, 1)

with open('login.html', 'w', encoding='utf-8') as f:
    f.write(html)
