import sys

with open('login.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add CSS
css_to_add = '''
        .cartelera-preview { background: #ffffff; padding: 2rem; width: 1000px; display: none; }
        .cartelera-title { font-size: 1.8rem; font-weight: bold; color: #000; margin-bottom: 1.5rem; text-align: left; }
        .cartelera-table { width: 100%; border-collapse: collapse; font-family: 'Arial', sans-serif; font-size: 1.2rem; }
        .cartelera-table th { background-color: #5b9bd5; color: white; padding: 1rem; border: 1px solid #dae3f3; font-weight: bold; text-align: left; }
        .cartelera-table td { padding: 1rem; border: 1px solid #dae3f3; text-align: left; color: #000; font-weight: bold; }
        .cartelera-table tr:nth-child(even) { background-color: #e9f0f8; }
        .cartelera-table tr:nth-child(odd) { background-color: #ffffff; }
    </style>
'''
html = html.replace('    </style>', css_to_add, 1)

# 2. Add Tab Button
tab_to_add = '''<div class="admin-tab" onclick="switchAdminTab('tab-stats')">Estadísticas</div>
                <div class="admin-tab" onclick="switchAdminTab('tab-cartelera')">Cartelera</div>'''
html = html.replace('<div class="admin-tab" onclick="switchAdminTab(\'tab-stats\')">Estadísticas</div>', tab_to_add, 1)

# 3. Add Tab Content after tab-stats
tab_content = '''
            <!-- Tab Cartelera -->
            <div id="tab-cartelera" class="admin-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h2>Generador de Cartelera</h2>
                </div>
                
                <div style="background: var(--bg-card); padding: 2rem; border-radius: 12px; border: 1px solid var(--border-color); text-align: left; margin-bottom: 2rem;">
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; font-weight: 600; margin-bottom: 0.5rem;">Seleccionar Fecha</label>
                        <input type="date" id="carteleraDate" style="width: 100%; max-width: 300px; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 8px;">
                    </div>
                    
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <button class="download-btn" onclick="generateDailyCartelera()" style="background: var(--primary); margin: 0;"><i class="fas fa-image"></i> Generar del Día</button>
                        <button class="download-btn" onclick="generateWeeklyCartelera()" style="background: var(--success); margin: 0;"><i class="fas fa-images"></i> Generar Semana Completa</button>
                    </div>
                </div>

                <!-- Hidden element for html2canvas -->
                <div style="position: absolute; left: -9999px; top: 0;">
                    <div id="carteleraCanvas" class="cartelera-preview" style="display: block;">
                        <div id="carteleraTitle" class="cartelera-title">Clases Presenciales</div>
                        <table class="cartelera-table">
                            <thead>
                                <tr>
                                    <th style="width: 10%;">Fecha</th>
                                    <th style="width: 15%;">Carrera</th>
                                    <th style="width: 35%;">Materia</th>
                                    <th style="width: 25%;">Profesores</th>
                                    <th style="width: 15%;">Aula</th>
                                </tr>
                            </thead>
                            <tbody id="carteleraBody">
                                <!-- JS injected rows -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
'''
html = html.replace('        </main>', tab_content, 1)

# 4. Add JavaScript Logic before </script>
js_to_add = '''
        function getClassesForDate(targetDateObj) {
            let results = [];
            const targetYMD = targetDateObj.getFullYear() + '-' + targetDateObj.getMonth() + '-' + targetDateObj.getDate();
            const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            const diaName = dayNames[targetDateObj.getDay()];

            if (targetDateObj.getDay() === 0 || targetDateObj.getDay() === 6) return results;

            schedule.forEach(week => {
                allComisiones.forEach(com => {
                    const aula = week[com];
                    if (isPresencial(aula)) {
                        if (professors[com] && professors[com][diaName]) {
                            professors[com][diaName].forEach(c => {
                                const dateDetails = getExactDate(diaName, week.FECHAS);
                                if (!dateDetails.isHoliday && dateDetails.formatted) {
                                    const match = week.FECHAS.match(/(\\d+)\\/(\\d+)/);
                                    if(match) {
                                        const d = new Date(2026, parseInt(match[2]) - 1, parseInt(match[1]));
                                        const dayMap = { 'Lunes': 0, 'Martes': 1, 'Miércoles': 2, 'Jueves': 3, 'Viernes': 4 };
                                        d.setDate(d.getDate() + (dayMap[diaName] || 0));
                                        const classYMD = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
                                        
                                        if (classYMD === targetYMD) {
                                            results.push({
                                                fecha: `${d.getDate()}/${d.getMonth()+1}`,
                                                carrera: com.split(' ')[0],
                                                materia: c.Materia,
                                                profesor: c.Profesor,
                                                aula: aula
                                            });
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
            });
            return results;
        }

        async function renderAndDownloadCartelera(targetDateObj) {
            const classes = getClassesForDate(targetDateObj);
            
            const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            
            const formattedTitle = `Clases Presenciales - ${dayNames[targetDateObj.getDay()]} ${targetDateObj.getDate()} de ${monthNames[targetDateObj.getMonth()]}`;
            document.getElementById('carteleraTitle').innerText = formattedTitle;
            
            const tbody = document.getElementById('carteleraBody');
            if (classes.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No hay clases presenciales este día.</td></tr>';
            } else {
                tbody.innerHTML = classes.map(c => `
                    <tr>
                        <td>${c.fecha}</td>
                        <td>${c.carrera}</td>
                        <td>${c.materia}</td>
                        <td>${c.profesor}</td>
                        <td>${c.aula}</td>
                    </tr>
                `).join('');
            }

            const canvasObj = document.getElementById('carteleraCanvas');
            canvasObj.style.display = 'block'; 

            try {
                const canvas = await html2canvas(canvasObj, { scale: 2 });
                const dataUrl = canvas.toDataURL('image/png');
                
                const link = document.createElement('a');
                link.download = `Cartelera_${targetDateObj.getFullYear()}-${targetDateObj.getMonth()+1}-${targetDateObj.getDate()}.png`;
                link.href = dataUrl;
                link.click();
            } catch (err) {
                console.error("Error generating canvas", err);
                alert("Hubo un error al generar la imagen.");
            }
        }

        async function generateDailyCartelera() {
            const dateStr = document.getElementById('carteleraDate').value;
            if(!dateStr) {
                alert('Por favor selecciona una fecha');
                return;
            }
            
            const [y, m, d] = dateStr.split('-');
            const targetDateObj = new Date(parseInt(y), parseInt(m)-1, parseInt(d));
            
            await renderAndDownloadCartelera(targetDateObj);
        }

        async function generateWeeklyCartelera() {
            const dateStr = document.getElementById('carteleraDate').value;
            if(!dateStr) {
                alert('Por favor selecciona una fecha de la semana que deseas generar');
                return;
            }
            
            const [y, m, d] = dateStr.split('-');
            let baseDate = new Date(parseInt(y), parseInt(m)-1, parseInt(d));
            
            const dayOfWeek = baseDate.getDay();
            if(dayOfWeek === 0) baseDate.setDate(baseDate.getDate() - 6);
            else if(dayOfWeek !== 1) baseDate.setDate(baseDate.getDate() - (dayOfWeek - 1));

            for(let i=0; i<5; i++) {
                const targetDate = new Date(baseDate);
                targetDate.setDate(baseDate.getDate() + i);
                await renderAndDownloadCartelera(targetDate);
                await new Promise(r => setTimeout(r, 500));
            }
        }
    </script>
'''
html = html.replace('    </script>', js_to_add, 1)

with open('login.html', 'w', encoding='utf-8') as f:
    f.write(html)
