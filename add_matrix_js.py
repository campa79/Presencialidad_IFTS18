import sys
import re

with open('login.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace JS function
old_js = r'''        function renderAdminMatrix\(\) \{.*?// Render Dashboard initially'''
new_js = '''        function renderAdminMatrix() {
            const weekSelect = document.getElementById('matrixWeekSelect');
            const tbody = document.getElementById('adminMatrixBody');
            
            if (!schedule || schedule.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No hay cronograma disponible.</td></tr>';
                return;
            }

            // Populate week select if empty
            if (weekSelect.options.length === 0) {
                schedule.forEach((w, i) => {
                    const opt = document.createElement('option');
                    opt.value = i;
                    opt.text = `Semana ${w.SEMANA} (${w.FECHAS})`;
                    weekSelect.appendChild(opt);
                });
            }
            
            const selectedWeekIndex = parseInt(weekSelect.value) || 0;
            const week = schedule[selectedWeekIndex];
            
            // Extract all unique aulas across the entire schedule to keep rows consistent
            let allAulasSet = new Set();
            schedule.forEach(w => {
                allComisiones.forEach(com => {
                    const aulaStr = w[com];
                    if (isPresencial(aulaStr)) {
                        allAulasSet.add(aulaStr.trim());
                    }
                });
            });
            
            let allAulas = Array.from(allAulasSet).sort();
            
            if (allAulas.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No hay aulas presenciales registradas.</td></tr>';
                return;
            }

            // For the selected week, map which comisiones use which aula
            let aulaToComisiones = {};
            allComisiones.forEach(com => {
                const aulaStr = week[com];
                if (isPresencial(aulaStr)) {
                    const aula = aulaStr.trim();
                    if (!aulaToComisiones[aula]) aulaToComisiones[aula] = [];
                    aulaToComisiones[aula].push(com);
                }
            });

            const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
            let html = '';

            allAulas.forEach(aula => {
                html += `<tr><td style="font-weight:bold; text-align:center; vertical-align:middle; font-size:1.1rem; background:#f4f7f6;">${aula}</td>`;
                
                dias.forEach(dia => {
                    let assignedClasses = [];
                    
                    if (aulaToComisiones[aula]) {
                        aulaToComisiones[aula].forEach(com => {
                            if (professors[com] && professors[com][dia]) {
                                professors[com][dia].forEach(clase => {
                                    assignedClasses.push({
                                        comision: com,
                                        profesor: clase.Profesor,
                                        materia: clase.Materia
                                    });
                                });
                            }
                        });
                    }
                    
                    if (assignedClasses.length > 0) {
                        // Reserved
                        let cellContent = assignedClasses.map(c => `
                            <div style="margin-bottom: 0.5rem; border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 0.5rem;">
                                <div class="reserved-title">${c.comision}</div>
                                <div class="reserved-info"><i class="fas fa-book"></i> ${c.materia}</div>
                                <div class="reserved-info"><i class="fas fa-user-tie"></i> ${c.profesor}</div>
                            </div>
                        `).join('');
                        html += `<td class="cell-reserved">${cellContent}</td>`;
                    } else {
                        // Free
                        html += `<td class="cell-free"><i class="fas fa-check-circle" style="font-size:1.2rem; margin-bottom:0.25rem;"></i><br>Libre</td>`;
                    }
                });
                
                html += `</tr>`;
            });
            
            tbody.innerHTML = html;
        }

        // Render Dashboard initially'''

html = re.sub(old_js, new_js, html, flags=re.DOTALL)

with open('login.html', 'w', encoding='utf-8') as f:
    f.write(html)
