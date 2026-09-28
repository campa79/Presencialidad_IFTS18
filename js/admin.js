        // CRUD Logic
        let currentCrudType = '';
        let currentCrudId = null;

        
        function renderAdminMatrix() {
            const weekSelect = document.getElementById('matrixWeekSelect');
            const thead = document.getElementById('adminMatrixHead');
            const tbody = document.getElementById('adminMatrixBody');
            
            if (!schedule || schedule.length === 0) {
                tbody.innerHTML = '<tr><td style="text-align:center;">No hay cronograma disponible.</td></tr>';
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
            
            // Base Aulas + Custom Aulas
            const baseAulas = ["SALÓN PB", "201 2° Piso", "202 2° Piso", "203 2° Piso", "204 2° Piso", "Laboratorio 3° Piso"];
            let customAulas = [];
            try {
                customAulas = JSON.parse(localStorage.getItem('customAulas') || '[]');
            } catch(e) {}
            
            // Extract all unique aulas from schedule in case there are implicit ones not in the list
            let allAulasSet = new Set([...baseAulas, ...customAulas]);
            schedule.forEach(w => {
                allComisiones.forEach(com => {
                    const aulaStr = w[com];
                    if (isPresencial(aulaStr)) {
                        allAulasSet.add(aulaStr.trim());
                    }
                });
            });
            
            // To respect user sorting: first baseAulas in order, then customAulas in order, then any other found
            let orderedAulas = [];
            baseAulas.forEach(a => { if(allAulasSet.has(a)) { orderedAulas.push(a); allAulasSet.delete(a); } });
            customAulas.forEach(a => { if(allAulasSet.has(a)) { orderedAulas.push(a); allAulasSet.delete(a); } });
            orderedAulas = orderedAulas.concat(Array.from(allAulasSet).sort());
            
            if (orderedAulas.length === 0) {
                tbody.innerHTML = '<tr><td style="text-align:center;">No hay aulas presenciales registradas.</td></tr>';
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
            
            // Generate Headers (Columns are Dias)
            let headHtml = '<tr><th style="background-color: var(--primary); color: white;">Aula</th>';
            dias.forEach(dia => {
                headHtml += `<th style="background-color: var(--primary); color: white; text-align: center;">${dia}</th>`;
            });
            headHtml += '</tr>';
            thead.innerHTML = headHtml;

            // Generate Body (Rows are Aulas)
            let html = '';
            orderedAulas.forEach(aula => {
                html += `<tr><td style="font-weight:bold; text-align:center; vertical-align:middle; font-size:1.1rem; background:#f4f7f6;">${aula}</td>`;
                
                dias.forEach(dia => {
                    // calculate YYYY-MM-DD for this cell (row)
                    let cellYMD = '';
                    const match = week.FECHAS.match(/(\d+)\/(\d+)/);
                    if(match) {
                        const d = new Date(globalYear, parseInt(match[2]) - 1, parseInt(match[1]));
                        const dayMap = { 'Lunes': 0, 'Martes': 1, 'Miércoles': 2, 'Jueves': 3, 'Viernes': 4 };
                        d.setDate(d.getDate() + (dayMap[dia] || 0));
                        
                        const yr = d.getFullYear();
                        const m = String(d.getMonth() + 1).padStart(2, '0');
                        const day = String(d.getDate()).padStart(2, '0');
                        cellYMD = `${yr}-${m}-${day}`;
                    }

                    let assignedClasses = [];

                    if (aulaToComisiones[aula]) {
                        aulaToComisiones[aula].forEach(com => {
                            if (professors[com] && professors[com][dia]) {
                                professors[com][dia].forEach(clase => {
                                    // Check if canceled
                                    let isCanceled = canceledClasses.some(cc => {
                                        const sameSemana = String(cc.semana) === String(week.SEMANA);
                                        const sameComision = cc.comision.trim().toLowerCase() === com.trim().toLowerCase();
                                        
                                        const sameDia = cc.dia.trim().toLowerCase() === dia.trim().toLowerCase() || 
                                                        (dia === 'Miércoles' && cc.dia.toLowerCase().includes('rcoles'));
                                                        
                                        const sameMateriaOrProfesor = 
                                            (cc.materia && cc.materia.trim().toLowerCase() === clase.Materia.trim().toLowerCase()) ||
                                            (cc.profesor && cc.profesor.trim().toLowerCase() === clase.Profesor.trim().toLowerCase());
                                            
                                        return sameSemana && sameDia && sameComision && sameMateriaOrProfesor;
                                    });
                                    
                                    if ((String(week.SEMANA) === "1" && com === "TSAS 1C" && (dia === "Lunes" || dia === "Martes")) ||
                                        (String(week.SEMANA) === "1" && com.endsWith("1C") && dia === "Miércoles")) {
                                        isCanceled = true;
                                    }
                                    if (!isCanceled) {
                                        assignedClasses.push({
                                            comision: com,
                                            profesor: clase.Profesor,
                                            materia: clase.Materia,
                                            isDailyEvent: false,
                                            isCanceled: false
                                        });
                                    } else {
                                        assignedClasses.push({
                                            comision: com,
                                            profesor: clase.Profesor,
                                            materia: clase.Materia,
                                            isDailyEvent: false,
                                            isCanceled: true
                                        });
                                    }
                                });
                            }
                        });
                    }
                    
                    // Add Daily Events matching this cell
                    dailyEvents.forEach(ev => {
                        if (ev.fecha === cellYMD && ev.aula === aula) {
                            assignedClasses.push({
                                comision: ev.comision,
                                profesor: ev.profesor,
                                materia: ev.materia + " (Evento)",
                                isDailyEvent: true
                            });
                        }
                    });

                    if (assignedClasses.length > 0) {
                        // Reserved
                        let cellContent = assignedClasses.map(c => {
                            if(c.isDailyEvent) {
                                return `
                                <div onclick="alert('Este es un Evento Diario. Para editarlo o borrarlo, ve a la pestaña Eventos Diarios.')" style="margin-bottom: 0.25rem; border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 0.25rem; line-height: 1.1; cursor: pointer; background-color: #fff3cd; border-radius: 4px; padding: 2px;" title="Evento único">
                                    <div class="reserved-title" style="font-size: 0.85rem; margin-bottom: 0.15rem; color: #856404;">${c.comision}</div>
                                    <div class="reserved-info" style="font-size: 0.75rem; margin-bottom: 0.1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #856404;" title="${c.materia}"><i class="fas fa-book"></i> ${c.materia}</div>
                                    <div class="reserved-info" style="font-size: 0.75rem; margin-bottom: 0; color: #856404;"><i class="fas fa-user-tie"></i> ${c.profesor}</div>
                                </div>
                                `;
                            } else if (c.isCanceled) {
                                return `
                                <div onclick="restoreClassException('${week.SEMANA}', '${dia}', '${c.comision}', '${c.materia}')" style="margin-bottom: 0.25rem; border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 0.25rem; line-height: 1.1; cursor: pointer; opacity: 0.65; background-color: #f8d7da; border-radius: 4px; padding: 2px;" title="Clase Cancelada. Haz clic para RESTAURAR.">
                                    <div class="reserved-title" style="font-size: 0.85rem; margin-bottom: 0.15rem; text-decoration: line-through; color: #721c24;">${c.comision}</div>
                                    <div class="reserved-info" style="font-size: 0.75rem; margin-bottom: 0.1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-decoration: line-through; color: #721c24;" title="${c.materia}"><i class="fas fa-book"></i> ${c.materia}</div>
                                    <div class="reserved-info" style="font-size: 0.75rem; margin-bottom: 0; text-decoration: line-through; color: #721c24;"><i class="fas fa-user-tie"></i> ${c.profesor}</div>
                                </div>
                                `;
                            } else {
                                return `
                                <div onclick="openExceptionModal('${week.SEMANA}', '${dia}', '${c.comision}', '${c.materia}', '${c.profesor}')" style="margin-bottom: 0.25rem; border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 0.25rem; line-height: 1.1; cursor: pointer;" title="Click para cancelar o reprogramar esta clase">
                                    <div class="reserved-title" style="font-size: 0.85rem; margin-bottom: 0.15rem;">${c.comision}</div>
                                    <div class="reserved-info" style="font-size: 0.75rem; margin-bottom: 0.1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${c.materia}"><i class="fas fa-book"></i> ${c.materia}</div>
                                    <div class="reserved-info" style="font-size: 0.75rem; margin-bottom: 0;"><i class="fas fa-user-tie"></i> ${c.profesor}</div>
                                </div>
                                `;
                            }
                        }).join('');
                        html += `<td class="cell-reserved">${cellContent}</td>`;
                    } else {
                        // Free
                        html += `<td class="cell-free" onclick="addDailyEventFromMatrix('${aula}', '${dia}', '${week.FECHAS}')" style="cursor: pointer;" title="Click para asignar clase única"><i class="fas fa-check-circle" style="font-size:1.2rem; margin-bottom:0.25rem;"></i><br>Libre</td>`;
                    }
                });
                html += `</tr>`;
            });
            
            tbody.innerHTML = html;
        }


function openAulaModal() {
            document.getElementById('newAulaName').value = '';
            document.getElementById('aulaModal').style.display = 'flex';
        }

        function closeAulaModal() {
            document.getElementById('aulaModal').style.display = 'none';
        }

        function saveNewAula() {
            const name = document.getElementById('newAulaName').value.trim();
            if (!name) return;
            
            let customAulas = [];
            try {
                customAulas = JSON.parse(localStorage.getItem('customAulas') || '[]');
            } catch(e) {}
            
            if (!customAulas.includes(name)) {
                customAulas.push(name);
                localStorage.setItem('customAulas', JSON.stringify(customAulas));
            }
            
            closeAulaModal();
            renderAdminMatrix();
        }

        function switchAdminTab(tabId) {
            document.querySelectorAll('.admin-section').forEach(sec => sec.style.display = 'none');
            document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
            document.getElementById(tabId).style.display = 'block';
            if (typeof event !== 'undefined' && event && event.target) {
                event.target.classList.add('active');
            } else {
                // Find the tab that controls this section and activate it
                const tab = Array.from(document.querySelectorAll('.admin-tab')).find(t => t.getAttribute('onclick') && t.getAttribute('onclick').includes(tabId));
                if (tab) tab.classList.add('active');
            }
            const wrapper = document.getElementById('adminMainWrapper');
            
            if(tabId === 'tab-matrix') {
                wrapper.classList.add('matrix-mode');
            } else {
                wrapper.classList.remove('matrix-mode');
            }

            if(tabId === 'tab-professors') renderAdminProfessors();
            if(tabId === 'tab-schedule') renderAdminSchedule();
            if(tabId === 'tab-matrix') renderAdminMatrix();
            if(tabId === 'tab-stats') renderAdminStats();
            if(tabId === 'tab-daily-events') renderAdminDailyEvents();
        }

        function renderAdminProfessors() {
            const tbody = document.getElementById('adminProfessorsBody');
            let flatClasses = [];
            
            Object.keys(professors).sort((a, b) => a.localeCompare(b)).forEach(comision => {
                ['Lunes','Martes','Miércoles','Jueves','Viernes'].forEach(dia => {
                    if(professors[comision][dia]) {
                        professors[comision][dia].forEach((clase, idx) => {
                            flatClasses.push({
                                profesor: clase.Profesor,
                                materia: clase.Materia,
                                comision: comision,
                                dia: dia,
                                idx: idx
                            });
                        });
                    }
                });
            });

            flatClasses.sort((a, b) => a.profesor.localeCompare(b.profesor));

            let html = '';
            flatClasses.forEach(item => {
                html += `
                    <tr>
                        <td><strong>${item.profesor}</strong></td>
                        <td>${item.materia}</td>
                        <td>${item.comision}</td>
                        <td>${item.dia}</td>
                        <td>
                            <button class="action-btn edit" onclick="openProfessorModal('${item.comision}', '${item.dia}', ${item.idx})"><i class="fas fa-edit"></i></button>
                            <button class="action-btn delete" onclick="deleteProfessor('${item.comision}', '${item.dia}', ${item.idx})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `;
            });
            tbody.innerHTML = html;
        }

        function renderAdminSchedule() {
            const tbody = document.getElementById('adminScheduleBody');
            let html = '';
            schedule.forEach((week, idx) => {
                let aulas = Object.keys(week).filter(k => k !== 'SEMANA' && k !== 'FECHAS' && week[k]).sort((a, b) => a.localeCompare(b)).map(k => `${k}: ${week[k]}`).join(', ');
                html += `
                    <tr>
                        <td>Semana ${week.SEMANA}</td>
                        <td>${week.FECHAS}</td>
                        <td style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${aulas}">${aulas || '-'}</td>
                        <td>
                            <button class="action-btn edit" onclick="openScheduleModal(${idx})"><i class="fas fa-edit"></i></button>
                            <button class="action-btn delete" onclick="deleteSchedule(${idx})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `;
            });
            tbody.innerHTML = html;
        }

        async function renderAdminStats() {
            const tbody = document.getElementById('adminStatsBody');
            tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Cargando estadísticas...</td></tr>';
            
            try {
                // Get the last 1000 visits to compute stats locally
                const snapshot = await db.collection('visits').orderBy('timestamp', 'desc').limit(1000).get();
                
                let html = '';
                let countToday = 0;
                let countWeek = 0;
                let countMonth = 0;
                let countAllTime = snapshot.size;
                
                const now = new Date();
                const todayStr = now.toDateString();
                
                const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                
                snapshot.forEach(doc => {
                    const data = doc.data();
                    const ts = data.timestamp ? data.timestamp.toDate() : new Date();
                    
                    if (ts.toDateString() === todayStr) countToday++;
                    if (ts >= oneWeekAgo) countWeek++;
                    if (ts >= oneMonthAgo) countMonth++;
                    
                    const dateFmt = ts.toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });
                    
                    let uaShort = data.userAgent || 'Desconocido';
                    if(uaShort.includes('Windows')) uaShort = 'Windows';
                    else if(uaShort.includes('Mac OS')) uaShort = 'Mac OS';
                    else if(uaShort.includes('Linux')) uaShort = 'Linux';
                    else if(uaShort.includes('Android')) uaShort = 'Android';
                    else if(uaShort.includes('iPhone')) uaShort = 'iPhone';
                    
                    html += `
                        <tr>
                            <td>${dateFmt}</td>
                            <td>${data.ip || '-'}</td>
                            <td>${data.city || '-'}, ${data.country || '-'}</td>
                            <td title="${data.userAgent}">${uaShort}</td>
                        </tr>
                    `;
                });
                
                if (html === '') {
                    html = '<tr><td colspan="4" style="text-align:center;">No hay visitas registradas aún.</td></tr>';
                }
                
                document.getElementById('statToday').innerText = countToday;
                document.getElementById('statWeek').innerText = countWeek;
                document.getElementById('statMonth').innerText = countMonth;
                document.getElementById('statAllTime').innerText = countAllTime + (countAllTime === 1000 ? '+' : '');
                
                tbody.innerHTML = html;
            } catch (err) {
                console.error("Error fetching stats:", err);
                tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:red;">Error cargando estadísticas. Revisa la consola.</td></tr>';
            }
        }

        function closeCrudModal() {
            document.getElementById('crudModal').style.display = 'none';
        }

        function openProfessorModal(comision = '', dia = '', idx = -1) {
            currentCrudType = 'professor';
            currentCrudId = { comision, dia, idx };
            
            let prof = '', mat = '';
            if(idx !== -1) {
                prof = professors[comision][dia][idx].Profesor;
                mat = professors[comision][dia][idx].Materia;
            }

            document.getElementById('crudModalTitle').innerText = idx === -1 ? 'Nueva Clase' : 'Editar Clase';
            document.getElementById('crudModalBody').innerHTML = `
                <div class="modal-form-group">
                    <label>Comisión</label>
                    <input type="text" id="crudComision" value="${comision}" placeholder="Ej: TSAS 1C">
                </div>
                <div class="modal-form-group">
                    <label>Día</label>
                    <select id="crudDia">
                        <option value="Lunes" ${dia==='Lunes'?'selected':''}>Lunes</option>
                        <option value="Martes" ${dia==='Martes'?'selected':''}>Martes</option>
                        <option value="Miércoles" ${dia==='Miércoles'?'selected':''}>Miércoles</option>
                        <option value="Jueves" ${dia==='Jueves'?'selected':''}>Jueves</option>
                        <option value="Viernes" ${dia==='Viernes'?'selected':''}>Viernes</option>
                    </select>
                </div>
                <div class="modal-form-group">
                    <label>Profesor</label>
                    <input type="text" id="crudProfesor" value="${prof}">
                </div>
                <div class="modal-form-group">
                    <label>Materia</label>
                    <input type="text" id="crudMateria" value="${mat}">
                </div>
            `;
            document.getElementById('crudModal').style.display = 'flex';
        }

        function deleteProfessor(comision, dia, idx) {
            if(!confirm('Seguro que deseas eliminar esta clase?')) return;
            professors[comision][dia].splice(idx, 1);
            saveProfessorsToFirebase();
        }

        function updateScheduleDropdowns() {
            const selects = Array.from(document.querySelectorAll('.crud-sch-select'));
            let selectedAulas = selects.map(s => s.value.trim()).filter(v => v !== "" && v !== "Virtual" && v !== "Feriado" && v !== "Cancelado");

            selects.forEach(select => {
                const currentVal = select.value.trim();
                Array.from(select.options).forEach(opt => {
                    const optVal = opt.value.trim();
                    if (optVal !== "" && optVal !== "Virtual" && optVal !== "Feriado" && optVal !== "Cancelado") {
                        if (selectedAulas.includes(optVal) && optVal !== currentVal) {
                            opt.disabled = true;
                            opt.style.color = "var(--danger)";
                            opt.text = optVal + " (Ocupada)";
                        } else {
                            opt.disabled = false;
                            opt.style.color = "";
                            opt.text = optVal;
                        }
                    }
                });
            });
        }

        function openScheduleModal(idx = -1) {
            currentCrudType = 'schedule';
            currentCrudId = idx;
            
            let week = idx !== -1 ? schedule[idx] : { SEMANA: schedule.length + 1, FECHAS: '' };
            let comisionesInputs = '';
            
            const baseAulas = ["SALÓN PB", "201 2° Piso", "202 2° Piso", "203 2° Piso", "204 2° Piso", "Laboratorio 3° Piso"];
            let customAulas = [];
            try { customAulas = JSON.parse(localStorage.getItem('customAulas') || '[]'); } catch(e) {}
            const allAulas = [...baseAulas, ...customAulas];

            allComisiones.forEach(c => {
                let val = week[c] || '';
                let isCustomVal = val && !allAulas.includes(val) && val !== "Virtual" && val !== "Feriado" && val !== "Cancelado" ? true : false;
                
                let optionsHtml = `<option value="">-- Sin Asignar --</option>`;
                optionsHtml += `<option value="Virtual" ${val === 'Virtual' ? 'selected' : ''}>Virtual</option>`;
                optionsHtml += `<option value="Feriado" ${val === 'Feriado' ? 'selected' : ''}>Feriado</option>`;
                optionsHtml += `<option value="Cancelado" ${val === 'Cancelado' ? 'selected' : ''}>Cancelado</option>`;
                
                allAulas.forEach(a => {
                    optionsHtml += `<option value="${a}" ${val === a ? 'selected' : ''}>${a}</option>`;
                });
                
                if (isCustomVal) {
                    optionsHtml += `<option value="${val}" selected>${val}</option>`;
                }
                
                comisionesInputs += `
                    <div class="modal-form-group" style="margin-bottom: 0.5rem;">
                        <label style="font-size: 0.9rem;">${c}</label>
                        <select id="crud_sch_${c}" class="crud-sch-select" onchange="updateScheduleDropdowns()" style="width: 100%; padding: 0.85rem; border-radius: 8px; border: 1px solid var(--border-color);">
                            ${optionsHtml}
                        </select>
                    </div>
                `;
            });

            document.getElementById('crudModalTitle').innerText = idx === -1 ? 'Nueva Semana' : `Editar Semana ${week.SEMANA}`;
            document.getElementById('crudModalBody').innerHTML = `
                <div class="modal-form-group">
                    <label>Número de Semana</label>
                    <input type="text" id="crudSemana" value="${week.SEMANA}">
                </div>
                <div class="modal-form-group">
                    <label>Fechas (ej: 10/8 al 14/8)</label>
                    <input type="text" id="crudFechas" value="${week.FECHAS}">
                </div>
                <h4 style="margin: 1rem 0 0.5rem 0;">Aulas por Comisión</h4>
                <div style="max-height: 300px; overflow-y: auto; border: 1px solid var(--border-color); padding: 1rem; border-radius: 8px;">
                    ${comisionesInputs}
                </div>
            `;
            document.getElementById('crudModal').style.display = 'flex';
            updateScheduleDropdowns();
        }

        function deleteSchedule(idx) {
            if(!confirm('Seguro que deseas eliminar esta semana?')) return;
            schedule.splice(idx, 1);
            saveScheduleToFirebase();
        }

        function saveCrudForm() {
            if(currentCrudType === 'professor') {
                const com = document.getElementById('crudComision').value.trim();
                const dia = document.getElementById('crudDia').value;
                const prof = document.getElementById('crudProfesor').value.trim();
                const mat = document.getElementById('crudMateria').value.trim();
                
                if(!com || !prof || !mat) return alert('Completa todos los campos');

                if(!professors[com]) {
                    professors[com] = { 'Lunes':[], 'Martes':[], 'Miércoles':[], 'Jueves':[], 'Viernes':[] };
                    if(!allComisiones.includes(com)) allComisiones.push(com);
                }

                // If editing and moved to another day/comision, delete old
                if(currentCrudId.idx !== -1) {
                    const oldCom = currentCrudId.comision;
                    const oldDia = currentCrudId.dia;
                    if(oldCom !== com || oldDia !== dia) {
                        professors[oldCom][oldDia].splice(currentCrudId.idx, 1);
                        professors[com][dia].push({ Profesor: prof, Materia: mat });
                    } else {
                        professors[com][dia][currentCrudId.idx] = { Profesor: prof, Materia: mat };
                    }
                } else {
                    professors[com][dia].push({ Profesor: prof, Materia: mat });
                }
                saveProfessorsToFirebase();

            } else if(currentCrudType === 'schedule') {
                let weekObj = {
                    SEMANA: document.getElementById('crudSemana').value.trim(),
                    FECHAS: document.getElementById('crudFechas').value.trim()
                };
                allComisiones.forEach(c => {
                    let val = document.getElementById(`crud_sch_${c}`).value.trim();
                    if(val) weekObj[c] = val;
                    else weekObj[c] = "";
                });

                if(currentCrudId !== -1) {
                    schedule[currentCrudId] = weekObj;
                } else {
                    schedule.push(weekObj);
                }
                saveScheduleToFirebase();
            }
            closeCrudModal();
        }

        async function saveProfessorsToFirebase() {
            try {
                await db.collection('config').doc('professors').set({data: professors});
                renderAdminProfessors();
                renderResults();
                alert('Profesores guardados correctamente');
            } catch(e) {
                console.error(e);
                alert('Error al guardar en Firebase');
            }
        }

        async function saveScheduleToFirebase() {
            try {
                await db.collection('config').doc('schedule').set({data: schedule});
                renderAdminSchedule();
                renderAdminMatrix();
                renderResults();
                alert('Cronograma guardado correctamente');
            } catch(e) {
                console.error(e);
                alert('Error al guardar en Firebase');
            }
        }
        
        function renderAdminDailyEvents() {
            const tbody = document.getElementById('adminDailyEventsBody');
            let html = '';
            
            // Sort events by date descending or ascending
            const sortedEvents = [...dailyEvents].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            
            sortedEvents.forEach((ev, i) => {
                const originalIndex = dailyEvents.indexOf(ev);
                html += `
                    <tr>
                        <td>${ev.fecha}</td>
                        <td>${ev.comision}</td>
                        <td>${ev.materia}</td>
                        <td>${ev.profesor}</td>
                        <td>${ev.aula}</td>
                        <td>
                            <button class="action-btn action-delete" onclick="deleteDailyEvent(${originalIndex})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `;
            });
            
            if (sortedEvents.length === 0) {
                html = `<tr><td colspan="6" style="text-align:center; padding: 2rem;">
                    <p style="color: var(--text-muted); margin-bottom: 1rem;">No hay eventos diarios registrados.</p>
                    <button class="download-btn" onclick="openDailyEventModal()" style="background: var(--primary);"><i class="fas fa-plus"></i> Añadir tu primer Evento</button>
                </td></tr>`;
            }
            tbody.innerHTML = html;
        }

        function openDailyEventModal() {
            document.getElementById('crudDailyFecha').value = '';
            
            // Populate Dropdowns
            let allMaterias = new Set();
            let allProfesores = new Set();
            Object.values(professors).forEach(diasObj => {
                Object.values(diasObj).forEach(clasesArr => {
                    clasesArr.forEach(c => {
                        if (c.Materia) allMaterias.add(c.Materia.trim());
                        if (c.Profesor) allProfesores.add(c.Profesor.trim());
                    });
                });
            });
            allMaterias = Array.from(allMaterias).sort((a, b) => a.localeCompare(b));
            allProfesores = Array.from(allProfesores).sort((a, b) => a.localeCompare(b));

            let comHtml = '<option value="">-- Seleccionar Comisión --</option>';
            allComisiones.forEach(c => comHtml += `<option value="${c}">${c}</option>`);
            document.getElementById('crudDailyComision').innerHTML = comHtml;

            let matHtml = '<option value="">-- Seleccionar Materia --</option>';
            allMaterias.forEach(m => matHtml += `<option value="${m}">${m}</option>`);
            document.getElementById('crudDailyMateria').innerHTML = matHtml;

            let profHtml = '<option value="">-- Seleccionar Profesor --</option>';
            allProfesores.forEach(p => profHtml += `<option value="${p}">${p}</option>`);
            document.getElementById('crudDailyProfesor').innerHTML = profHtml;

            document.getElementById('crudDailyComision').value = '';
            document.getElementById('crudDailyMateria').value = '';
            document.getElementById('crudDailyProfesor').value = '';
            
            const baseAulas = ["SALÓN PB", "201 2° Piso", "202 2° Piso", "203 2° Piso", "204 2° Piso", "Laboratorio 3° Piso"];
            let customAulas = [];
            try { customAulas = JSON.parse(localStorage.getItem('customAulas') || '[]'); } catch(e) {}
            const allAulas = [...baseAulas, ...customAulas];
            
            let optionsHtml = '<option value="">-- Seleccionar Aula --</option><option value="Virtual">Virtual</option>';
            allAulas.forEach(a => optionsHtml += `<option value="${a}">${a}</option>`);
            
            document.getElementById('crudDailyAula').innerHTML = optionsHtml;
            document.getElementById('dailyEventModal').style.display = 'flex';
        }

        function closeDailyEventModal() {
            document.getElementById('dailyEventModal').style.display = 'none';
        }

        async function saveDailyEvent() {
            const fecha = document.getElementById('crudDailyFecha').value;
            const comision = document.getElementById('crudDailyComision').value.trim();
            const materia = document.getElementById('crudDailyMateria').value.trim();
            const profesor = document.getElementById('crudDailyProfesor').value.trim();
            const aula = document.getElementById('crudDailyAula').value;

            if(!fecha || !comision || !materia || !profesor || !aula) return alert('Completa todos los campos');

            const newEvent = {
                id: Date.now().toString(),
                fecha: fecha,
                comision: comision,
                materia: materia,
                profesor: profesor,
                aula: aula
            };

            dailyEvents.push(newEvent);
            await saveDailyEventsToFirebase();
            closeDailyEventModal();
        }

        async function deleteDailyEvent(idx) {
            if(!confirm('Seguro que deseas eliminar este evento?')) return;
            dailyEvents.splice(idx, 1);
            await saveDailyEventsToFirebase();
        }

        async function saveDailyEventsToFirebase() {
            try {
                await db.collection('config').doc('daily_events').set({data: dailyEvents});
                renderAdminDailyEvents();
                renderResults();
                alert('Eventos guardados correctamente');
            } catch(e) {
                console.error(e);
                alert('Error al guardar en Firebase');
            }
        }
        
        let currentExceptionTarget = null;
        function openExceptionModal(semana, dia, comision, materia, profesor) {
            currentExceptionTarget = { semana, dia, comision, materia, profesor };
            document.getElementById('exceptionModalDetails').innerHTML = `
                <strong>Semana:</strong> ${semana} - <strong>Día:</strong> ${dia}<br>
                <strong>Comisión:</strong> ${comision}<br>
                <strong>Materia:</strong> ${materia}<br>
                <strong>Profesor:</strong> ${profesor}
            `;
            document.getElementById('exceptionModal').style.display = 'flex';
        }

        function closeExceptionModal() {
            document.getElementById('exceptionModal').style.display = 'none';
            currentExceptionTarget = null;
        }

        async function saveCanceledClassesToFirebase() {
            try {
                await db.collection('config').doc('canceled_classes').set({data: canceledClasses});
            } catch(e) {
                console.error(e);
            }
        }

        async function cancelClassException() {
            if(!currentExceptionTarget) return;
            // Normalize semana to string for consistent comparisons
            const entry = { ...currentExceptionTarget, semana: String(currentExceptionTarget.semana) };
            canceledClasses.push(entry);
            await saveCanceledClassesToFirebase();
            closeExceptionModal();
            renderAdminMatrix();
            renderResults(); // Refresh public-facing search immediately
            alert('Clase cancelada correctamente para ese día.');
        }

        async function restoreClassException(semana, dia, comision, materia) {
            if(!confirm(`¿Estás seguro de RESTAURAR la clase de ${materia} de la comisión ${comision} para la semana ${semana}?`)) return;
            
            canceledClasses = canceledClasses.filter(cc => !(
                String(cc.semana) === String(semana) &&
                cc.dia.trim().toLowerCase() === dia.trim().toLowerCase() &&
                cc.comision.trim().toLowerCase() === comision.trim().toLowerCase() &&
                cc.materia.trim().toLowerCase() === materia.trim().toLowerCase()
            ));
            await saveCanceledClassesToFirebase();
            
            renderAdminMatrix();
            renderResults(); // Refresh public-facing search immediately
            alert('Clase restaurada correctamente.');
        }

        function rescheduleClassException() {
            if(!currentExceptionTarget) return;
            // 1. Cancel original class
            canceledClasses.push(currentExceptionTarget);
            saveCanceledClassesToFirebase(); // Async, don't block
            
            // 2. Open Daily Event modal with prefilled data
            switchAdminTab('tab-daily-events'); // Switch to daily events tab
            openDailyEventModal();
            
            document.getElementById('crudDailyComision').value = currentExceptionTarget.comision;
            document.getElementById('crudDailyMateria').value = currentExceptionTarget.materia;
            document.getElementById('crudDailyProfesor').value = currentExceptionTarget.profesor;
            
            closeExceptionModal();
            alert('La clase original fue cancelada. Ahora selecciona la Fecha y el Aula para la reprogramación.');
        }

        function addDailyEventFromMatrix(aula, dia, fechasStr) {
            // Get date
            const dateDetails = getExactDate(dia, fechasStr);
            let ymd = '';
            
            const match = fechasStr.match(/(\d+)\/(\d+)/);
            if(match) {
                const d = new Date(globalYear, parseInt(match[2]) - 1, parseInt(match[1]));
                const dayMap = { 'Lunes': 0, 'Martes': 1, 'Miércoles': 2, 'Jueves': 3, 'Viernes': 4 };
                d.setDate(d.getDate() + (dayMap[dia] || 0));
                
                // Format YYYY-MM-DD
                const yr = d.getFullYear();
                const m = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                ymd = `${yr}-${m}-${day}`;
            }

            switchAdminTab('tab-daily-events');
            openDailyEventModal();
            
            document.getElementById('crudDailyFecha').value = ymd;
            document.getElementById('crudDailyAula').value = aula;
            
            alert("Fecha y Aula pre-cargadas. Completa Comisión, Materia y Profesor.");
        }

        function handleExcelUpload(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {type: 'array'});
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const rows = XLSX.utils.sheet_to_json(worksheet, {header: 1, defval: ""});
                
                // Parse schedule
                let semanaIdx = rows.findIndex(r => r[0] === 'SEMANA');
                let headers_1 = rows[semanaIdx];
                let newSchedule = [];
                for(let i = semanaIdx + 1; i < semanaIdx + 17; i++) {
                    let r = rows[i];
                    if(r && r[0] && !isNaN(r[0])) {
                        let obj = {};
                        for(let j=0; j<headers_1.length; j++) {
                            if(headers_1[j]) {
                                obj[headers_1[j]] = r[j] ? String(r[j]).trim() : '';
                            }
                        }
                        newSchedule.push(obj);
                    }
                }
                
                // Parse professors
                let profIdx = rows.findIndex(r => r[2] === 'Profesor');
                let newProfessors = {};
                let currentComision = null;
                
                for(let i = profIdx + 1; i < rows.length; i++) {
                    let r = rows[i];
                    if(!r) continue;
                    
                    let comision = r[1] ? String(r[1]).trim() : '';
                    if(comision) {
                        currentComision = comision;
                        newProfessors[currentComision] = {
                            'Lunes': [], 'Martes': [], 'Miércoles': [], 'Jueves': [], 'Viernes': []
                        };
                    }
                    
                    if(!currentComision) continue;
                    
                    if(r[2] || r[3]) newProfessors[currentComision]['Lunes'].push({'Profesor': String(r[2]||'').trim(), 'Materia': String(r[3]||'').trim()});
                    if(r[4] || r[5]) newProfessors[currentComision]['Martes'].push({'Profesor': String(r[4]||'').trim(), 'Materia': String(r[5]||'').trim()});
                    if(r[6] || r[7]) newProfessors[currentComision]['Miércoles'].push({'Profesor': String(r[6]||'').trim(), 'Materia': String(r[7]||'').trim()});
                    if(r[8] || r[9]) newProfessors[currentComision]['Jueves'].push({'Profesor': String(r[8]||'').trim(), 'Materia': String(r[9]||'').trim()});
                    if(r[10] || r[11]) newProfessors[currentComision]['Viernes'].push({'Profesor': String(r[10]||'').trim(), 'Materia': String(r[11]||'').trim()});
                }
                
                // Upload to Firebase
                Promise.all([
                    db.collection('config').doc('schedule').set({data: newSchedule}),
                    db.collection('config').doc('professors').set({data: newProfessors})
                ]).then(() => {
                    alert('Base de datos actualizada exitosamente con el Excel.');
                    schedule = newSchedule;
                    professors = newProfessors;
                    allComisiones = Object.keys(professors).sort((a, b) => a.localeCompare(b));
                    renderResults();
                }).catch(err => {
                    console.error(err);
                    alert('Error al subir a Firebase.');
                });
            };
            reader.readAsArrayBuffer(file);
        }

        function showAdminLogin(e) {
            if (e) e.preventDefault();
            document.getElementById('adminModal').style.display = 'flex';
            document.getElementById('adminError').style.display = 'none';
        }

        function closeAdminLogin() {
            document.getElementById('adminModal').style.display = 'none';
            document.getElementById('adminUser').value = '';
            document.getElementById('adminPass').value = '';
        }

        function doAdminLogin() {
            const u = document.getElementById('adminUser').value;
            const p = document.getElementById('adminPass').value;
            const remember = document.getElementById('rememberMe').checked;
            
            const persistence = remember 
                ? firebase.auth.Auth.Persistence.LOCAL 
                : firebase.auth.Auth.Persistence.SESSION;
                
            firebase.auth().setPersistence(persistence)
                .then(() => firebase.auth().signInWithEmailAndPassword(u, p))
                .then(() => {
                    closeAdminLogin();
                    const mc = document.getElementById('mainContainer');
                    if (mc) mc.style.display = 'none';
                    document.getElementById('adminPanel').style.display = 'flex';
                    if (typeof renderDataPanel === 'function') renderDataPanel();
                })
                .catch(error => alert("Error al iniciar sesión: " + error.message));
        }

        function logoutAdmin() {
            firebase.auth().signOut().then(() => {
                document.getElementById('adminPanel').style.display = 'none';
                const mc = document.getElementById('mainContainer');
                if (mc) mc.style.display = 'flex';
                const usersBtn = document.getElementById('tabUsersBtn');
                if (usersBtn) usersBtn.style.display = 'none';
            });
        }

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
                                    const match = week.FECHAS.match(/(\d+)\/(\d+)/);
                                    if(match) {
                                        const d = new Date(globalYear, parseInt(match[2]) - 1, parseInt(match[1]));
                                        const dayMap = { 'Lunes': 0, 'Martes': 1, 'Miércoles': 2, 'Jueves': 3, 'Viernes': 4 };
                                        d.setDate(d.getDate() + (dayMap[diaName] || 0));
                                        const classYMD = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
                                        
                                        if (classYMD === targetYMD) {
                                            const isCanceled = canceledClasses.some(cc => cc.semana === week.SEMANA && cc.dia === diaName && cc.comision === com && cc.materia === c.Materia);
                                            if (!isCanceled) {
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
                                }
                            });
                        }
                    }
                });
            });

            // Include single day events for the target date
            dailyEvents.forEach(ev => {
                if(!ev.fecha) return;
                const parts = ev.fecha.split('-');
                if(parts.length === 3) {
                    // Check if YMD matches target Date
                    const evY = parseInt(parts[0]);
                    const evM = parseInt(parts[1]) - 1; // getMonth() is 0-indexed
                    const evD = parseInt(parts[2]);
                    
                    if (evY === targetDateObj.getFullYear() && evM === targetDateObj.getMonth() && evD === targetDateObj.getDate()) {
                        results.push({
                            fecha: `${evD}/${evM + 1}`,
                            carrera: ev.comision,
                            materia: ev.materia,
                            profesor: ev.profesor,
                            aula: ev.aula
                        });
                    }
                }
            });

            return results;
        }

        async function renderAndDownloadCartelera(targetDateObj) {
    const classes = getClassesForDate(targetDateObj);
    
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    
    const formattedTitle = `Clases IFTS 18 - ${dayNames[targetDateObj.getDay()]} ${targetDateObj.getDate()} de ${monthNames[targetDateObj.getMonth()]}`;
    document.getElementById('carteleraTitle').innerText = formattedTitle;
    
    const tbody = document.getElementById('carteleraBody');
    if (classes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">No hay clases presenciales este día.</td></tr>';
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

    const wrapper = document.querySelector('.cartelera-wrapper');
    const canvasObj = document.getElementById('carteleraCanvas');
    
    // Make wrapper fully visible and on top for html2canvas
    const origOpacity = wrapper.style.opacity;
    const origZIndex = wrapper.style.zIndex;
    const origLeft = wrapper.style.left;
    wrapper.style.opacity = '1';
    wrapper.style.left = '0';
    wrapper.style.zIndex = '99999';
    canvasObj.style.display = 'flex';
    
    // Small delay to ensure browser renders the DOM changes
    await new Promise(r => setTimeout(r, 200));

    try {
        const canvas = await html2canvas(wrapper, { scale: 1, useCORS: true, backgroundColor: '#ffffff', width: 1920, height: 1080 });
        const dataUrl = canvas.toDataURL('image/png');
        
        const link = document.createElement('a');
        link.download = `Cartelera_${targetDateObj.getFullYear()}-${targetDateObj.getMonth()+1}-${targetDateObj.getDate()}.png`;
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error("Error generating canvas", err);
        alert("Hubo un error al generar la imagen.");
    } finally {
        wrapper.style.opacity = origOpacity;
        wrapper.style.left = origLeft;
        wrapper.style.zIndex = origZIndex;
        canvasObj.style.display = 'none';
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


// User Maúnagement Logic
const SUPER_ADMINS = ['alberto.campagna@bue.edu.ar', 'alberto.campagna@ifts18.edu.ar'];

function checkSuperAdminAccess(user) {
    if (user && SUPER_ADMINS.includes(user.email)) {
        document.getElementById('tabUsersBtn').style.display = 'inline-block';
        loadAdminUsers();
    }
}

async function loadAdminUsers() {
    try {
        const usersSnap = await db.collection('users').get();
        const tbody = document.getElementById('usersTableBody');
        tbody.innerHTML = '';
        usersSnap.forEach(doc => {
            const data = doc.data();
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="text-align: left;">${doc.id}</td>
                <td>${data.role || 'admin'}</td>
                <td>
                    <button class="download-btn" style="background: var(--primary); padding: 0.5rem; margin: 0.2rem;" onclick="resetAdminPassword('${doc.id}')"><i class="fas fa-key"></i> Restablecer</button>
                    <button class="download-btn" style="background: var(--danger); padding: 0.5rem; margin: 0.2rem;" onclick="revokeAdminUser('${doc.id}')"><i class="fas fa-trash"></i> Revocar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch(e) {
        console.error("Error loading users", e);
    }
}

async function createAdminUser() {
    const email = document.getElementById('newUserEmail').value;
    const pass = document.getElementById('newUserPass').value;
    const msg = document.getElementById('userCreateMsg');
    
    if (!email || !pass) {
        msg.textContent = 'Ingresa correo y contraseña.';
        msg.style.color = 'var(--danger)';
        return;
    }
    if (pass.length < 6) {
        msg.textContent = 'La contraseña debe tener al menos 6 caracteres.';
        msg.style.color = 'var(--danger)';
        return;
    }

    msg.textContent = 'Creando usuario...';
    msg.style.color = 'var(--primary)';

    try {
        const secondaryApp = firebase.initializeApp(firebaseConfig, "SecondaryApp");
        await secondaryApp.auth().createUserWithEmailAndPassword(email, pass);
        await secondaryApp.auth().signOut();
        secondaryApp.delete();

        await db.collection('users').doc(email).set({ role: 'admin' });
        
        document.getElementById('newUserEmail').value = '';
        document.getElementById('newUserPass').value = '';
        msg.textContent = 'Usuario creado exitosamente.';
        msg.style.color = 'green';
        
        loadAdminUsers();
    } catch(e) {
        console.error("Error creating user", e);
        msg.textContent = 'Error: ' + e.message;
        msg.style.color = 'var(--danger)';
    }
}

async function revokeAdminUser(email) {
    if(confirm('¿Estás seguro de revocar el acceso a ' + email + '? No podrán acceder al panel de administración.')) {
        try {
            await db.collection('users').doc(email).delete();
            alert('Acceso revocado.');
            loadAdminUsers();
        } catch(e) {
            console.error("Error revoking user", e);
            alert('Error: ' + e.message);
        }
    }
}

async function resetAdminPassword(email) {
    if(confirm('¿Enviar correo de restablecimiento de contraseña a ' + email + '?')) {
        try {
            await firebase.auth().sendPasswordResetEmail(email);
            alert('Correo de restablecimiento enviado exitosamente.');
        } catch(e) {
            console.error("Error sending reset email", e);
            alert('Error: ' + e.message);
        }
    }
}




function renderDailyEventMatrix() {
    const dateStr = document.getElementById('dailyEventMatrixDate').value;
    if (!dateStr) {
        alert("Por favor selecciona una fecha");
        return;
    }
    
    const [y, m, d] = dateStr.split('-');
    const dateObj = new Date(parseInt(y), parseInt(m)-1, parseInt(d));
    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const dayName = dayNames[dateObj.getDay()];
    
    if (dayName === "Domingo" || dayName === "Sábado") {
        alert("El instituto no dicta clases presenciales los fines de semana.");
        return;
    }

    const classesForDay = getClassesForDate(dateObj);
    
    const header = document.getElementById('dailyEventMatrixHeader');
    header.innerHTML = `<th>AULA</th><th>${dayName} ${dateObj.getDate()}</th>`;
    
    let html = '';
    
    baseAulas.forEach(aula => {
        const c = classesForDay.find(cls => cls.aula === aula);
        if (c) {
            html += `<tr><td style="font-weight:bold;">${aula}</td>
                     <td class="cell-occupied">
                        <strong>${c.carrera}</strong><br>
                        ${c.materia}<br>
                        <small>${c.profesor}</small>
                     </td></tr>`;
        } else {
            html += `<tr><td style="font-weight:bold;">${aula}</td>
                     <td class="cell-free" onclick="addDailyEventSpecific('${dateStr}', '${aula}')" style="cursor: pointer;" title="Click para añadir evento">
                        <i class="fas fa-check-circle" style="font-size:1.2rem; margin-bottom:0.25rem;"></i><br>Libre
                     </td></tr>`;
        }
    });
    
    document.getElementById('dailyEventMatrixBody').innerHTML = html;
    document.getElementById('dailyEventMatrixContainer').style.display = 'block';
}

function addDailyEventSpecific(dateStr, aula) {
    openDailyEventModal();
    document.getElementById('crudDailyFecha').value = dateStr;
    document.getElementById('crudDailyAula').value = aula;
    alert("Fecha y Aula pre-cargadas. Completa Comisión, Materia y Profesor.");
}

