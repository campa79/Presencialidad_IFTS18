        let schedule = DB.schedule;
        let professors = DB.professors;
        let allComisiones = Object.keys(professors).sort((a, b) => a.localeCompare(b));
        let canceledClasses = [];
        let dailyEvents = [];
        let globalYear = 2026;
        let globalHolidays = ["23/3", "24/4", "2/4", "3/4", "1/5", "25/5", "15/6", "9/7", "10/7", "17/8", "12/10", "23/11"];
        
        let currentView = { type: 'search', value: '' };

        // Fetch real-time data from Firebase
        function sanitizeFirebaseData(obj) {
    if (typeof obj === 'string') {
        return obj.replace(/2� Piso/g, '2° Piso')
                  .replace(/3� Piso/g, '3° Piso')
                  .replace(/SAL�N PB/g, 'SALÓN PB')
                  .replace(/Gesti�n/g, 'Gestión')
                  .replace(/2 Piso/g, '2° Piso')
                  .replace(/3 Piso/g, '3° Piso')
                  .replace(/SALN PB/g, 'SALÓN PB');
    } else if (Array.isArray(obj)) {
        return obj.map(sanitizeFirebaseData);
    } else if (typeof obj === 'object' && obj !== null) {
        const newObj = {};
        for (let key in obj) {
            newObj[key] = sanitizeFirebaseData(obj[key]);
        }
        return newObj;
    }
    return obj;
}

async function fetchFromFirebase() {
            try {
                const scheduleSnap = await db.collection('config').doc('schedule').get();
                const professorsSnap = await db.collection('config').doc('professors').get();
                const canceledClassesSnap = await db.collection('config').doc('canceled_classes').get();
                const dailyEventsSnap = await db.collection('config').doc('daily_events').get();
                const generalConfigSnap = await db.collection('config').doc('general').get();
                
                if (generalConfigSnap.exists) {
                    const data = generalConfigSnap.data();
                    if(data.year) globalYear = data.year;
                    if(data.holidays) globalHolidays = data.holidays;
                }
                
                if (scheduleSnap.exists) {
                    schedule = sanitizeFirebaseData(scheduleSnap.data().data);
                }
                if (professorsSnap.exists) {
                    professors = sanitizeFirebaseData(professorsSnap.data().data);
                    allComisiones = Object.keys(professors).sort((a, b) => a.localeCompare(b));
                }
                if (canceledClassesSnap.exists) {
                    canceledClasses = canceledClassesSnap.data().data || [];
                }
                if (dailyEventsSnap.exists) {
                    dailyEvents = dailyEventsSnap.data().data || [];
                }
                
                // Refresh UI with Firebase data preserving current view
                if (currentView.type === 'career') {
                    showCareer(currentView.value);
                } else {
                    renderResults();
                }
            } catch(e) {
                console.error("Error fetching from Firebase", e);
            }
        }
        fetchFromFirebase();

        async function logVisit() {
            // Check if we already logged this session
            if (sessionStorage.getItem('visitLogged')) return;
            
            try {
                // Ignore admin visits if they are already logged in (optional)
                
                const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
                const geoData = await res.json();
                
                await db.collection('visits').add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    ip: geoData.ip || 'Desconocida',
                    country: geoData.country || 'Desconocido',
                    city: geoData.city || 'Desconocida',
                    region: geoData.region || '',
                    userAgent: navigator.userAgent,
                    platform: navigator.platform
                });
                
                sessionStorage.setItem('visitLogged', 'true');
            } catch (error) {
                console.error("Error logging visit", error);
            }
        }
        
        // Log visit immediately
        logVisit();

        const inputSearch = document.getElementById('s-profesor');
        const container = document.getElementById('results');
        const summary = document.getElementById('filtersSummary');

        function isPresencial(value) {
            if (!value) return false;
            // Evaluamos Disp. Docente como no requiere aula presencial estándar.
            if (value.toLowerCase().includes("docente")) return false; 
            return true;
        }

        function removeAccents(str) {
            if (!str) return '';
            return str.normalize("NFD").replace(/[̀-ͯ]/g, "");
        }

        function getExactDate(dia, rangeStr) {
            const dayMap = { 'Lunes': 0, 'Martes': 1, 'Miércoles': 2, 'Jueves': 3, 'Viernes': 4 };
            const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            // Specific holidays provided by user
            const holidays = globalHolidays;
            
            // Extract HH/MM from range "DD/MM al DD/MM" or similar
            const match = rangeStr.match(/(\d+)\/(\d+)/);
            if (!match) return { short: dia, full: dia, isHoliday: false }; 

            let day = parseInt(match[1]);
            let month = parseInt(match[2]) - 1; // 0-indexed month
            
            // We use globalYear as the reference year for date arithmetic
            const d = new Date(globalYear, month, day);
            
            // Add offset based on day of week
            const offset = dayMap[dia] || 0;
            d.setDate(d.getDate() + offset);
            
            const finalDay = d.getDate();
            const finalMonthNum = d.getMonth();
            const finalMonthName = monthNames[finalMonthNum];
            
            // Check if this date is in our holiday list
            const dateStr = `${finalDay}/${finalMonthNum + 1}`;
            const isHoliday = holidays.includes(dateStr);
            
            const fullDate = `${dia} ${finalDay} de ${finalMonthName}`;
            return {
                short: `${dia} ${finalDay}`,
                full: fullDate,
                formatted: fullDate,
                isHoliday: isHoliday
            };
        }

        function renderResults() {
            if (typeof inputSearch === 'undefined' || !inputSearch) return;
            const sDate = document.getElementById('s-date');
            if (sDate) sDate.value = ''; // clear date picker if it exists
            const searchStr = removeAccents(inputSearch.value.trim().toLowerCase());
            currentView = { type: 'search', value: searchStr };
            
            if (!searchStr) {
                summary.innerHTML = '';
                container.innerHTML = `
                    <div class="empty-state" style="grid-column: 1/-1;">
                        <i class="fas fa-keyboard"></i>
                        Ingresa un nombre de profesor para visualizar el cronograma presencial. <br><br>También podés clickear sobre <a href="tsas.html" style="color:var(--primary); font-weight:bold; text-decoration:underline;">Ver TSAS</a>, <a href="tsds.html" style="color:var(--primary); font-weight:bold; text-decoration:underline;">Ver TSDS</a> y <a href="tscdia.html" style="color:var(--primary); font-weight:bold; text-decoration:underline;">Ver TSCDIA</a> para ver la presencialidad a lo largo de todo el cuatrimestre.
                    </div>
                `;
                return;
            }

            let teacherClasses = [];
            let foundNames = new Set();
            
            allComisiones.forEach(com => {
                Object.entries(professors[com]).forEach(([dia, clases]) => {
                    clases.forEach(c => {
                        if (removeAccents(c.Profesor.toLowerCase()).includes(searchStr)) {
                            foundNames.add(c.Profesor);
                            teacherClasses.push({
                                profesor: c.Profesor,
                                materia: c.Materia,
                                comision: com,
                                dia: dia
                            });
                        }
                    });
                });
            });

            // Also check daily events
            let dailyTeacherClasses = [];
            dailyEvents.forEach(ev => {
                if (removeAccents(ev.profesor.toLowerCase()).includes(searchStr)) {
                    // Skip if this event matches a cancelled class
                    const isCanceled = canceledClasses.some(cc =>
                        cc.comision.trim().toLowerCase() === ev.comision.trim().toLowerCase() &&
                        cc.dia.trim().toLowerCase() === (ev.dia || '').trim().toLowerCase() &&
                        cc.materia.trim().toLowerCase() === ev.materia.trim().toLowerCase()
                    );
                    if (isCanceled) return;
                    foundNames.add(ev.profesor);
                    dailyTeacherClasses.push(ev);
                }
            });

            if (teacherClasses.length === 0 && dailyTeacherClasses.length === 0) {
                summary.innerHTML = '';
                container.innerHTML = `
                    <div class="empty-state" style="grid-column: 1/-1; color: var(--danger)">
                        <i class="fas fa-search-minus" style="color: var(--danger)"></i>
                        No se encontró ningún resultado que coincida con "${searchStr}".
                    </div>
                `;
                return;
            }

            let presencialAssignments = [];
            
            teacherClasses.forEach(tc => {
                let hasPresencial = false;
                schedule.forEach(week => {
                    const value = week[tc.comision];
                    if (isPresencial(value)) {
                        hasPresencial = true;
                        const dateDetails = getExactDate(tc.dia, week.FECHAS);
                        
                        let displayAula = value;
                        let isCancelled = false;
                        if ((week.SEMANA === "1" && tc.comision === "TSAS 1C" && (tc.dia === "Lunes" || tc.dia === "Martes")) ||
                            (week.SEMANA === "1" && tc.comision.endsWith("1C") && tc.dia === "Miércoles")) {
                            displayAula = "No hay clases";
                            isCancelled = true;
                        }

                        const isUserCanceled = canceledClasses.some(cc => {
                            const sameSemana = String(cc.semana) === String(week.SEMANA);
                            const sameComision = cc.comision.trim().toLowerCase() === tc.comision.trim().toLowerCase();
                            const sameDia = cc.dia.trim().toLowerCase() === tc.dia.trim().toLowerCase() || 
                                            (tc.dia === 'Miércoles' && cc.dia.toLowerCase().includes('rcoles'));
                            const sameMateriaOrProfesor = 
                                (cc.materia && cc.materia.trim().toLowerCase() === tc.materia.trim().toLowerCase()) ||
                                (cc.profesor && cc.profesor.trim().toLowerCase() === tc.profesor.trim().toLowerCase());
                            return sameSemana && sameDia && sameComision && sameMateriaOrProfesor;
                        });
                        if (isUserCanceled || isCancelled) {
                            return; // Clase cancelada — no mostrar en búsqueda
                        }

                        presencialAssignments.push({
                            ...tc,
                            semana: parseInt(week.SEMANA), 
                            semanaStr: week.SEMANA,
                            fechas: week.FECHAS,
                            exactDate: dateDetails.full,
                            isHoliday: dateDetails.isHoliday,
                            isCancelled: isCancelled,
                            aula: displayAula
                        });
                    }
                });

                if (!hasPresencial) {
                    presencialAssignments.push({
                        ...tc,
                        semana: 999, 
                        semanaStr: "-",
                        fechas: "Cursada habitual",
                        exactDate: tc.dia,
                        isHoliday: false,
                        aula: "Modalidad Virtual / Disp. Docente",
                        isVirtual: true
                    });
                }
            });

            // Add Daily Events to presencialAssignments
            dailyTeacherClasses.forEach(ev => {
                if (!ev.fecha) return;
                const parts = ev.fecha.split('-');
                if (parts.length !== 3) return;
                const d = new Date(parseInt(parts[0]), parseInt(parts[1])-1, parseInt(parts[2]));
                const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
                const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
                if (d.getDay() === 0 || d.getDay() === 6) return;
                const diaStr = dayNames[d.getDay()];
                const fullDate = `${diaStr} ${d.getDate()} de ${monthNames[d.getMonth()]}`;
                let eventSemana = 999;
                let eventSemanaStr = "Evento";
                schedule.forEach(week => {
                    const dateDetails = getExactDate(diaStr, week.FECHAS);
                    if (dateDetails.full === fullDate) {
                        eventSemana = parseInt(week.SEMANA);
                        eventSemanaStr = week.SEMANA;
                    }
                });
                presencialAssignments.push({
                    profesor: ev.profesor,
                    materia: ev.materia,
                    comision: ev.comision,
                    dia: diaStr,
                    semana: eventSemana,
                    semanaStr: eventSemanaStr,
                    fechas: `${d.getDate()}/${d.getMonth()+1}`,
                    exactDate: fullDate,
                    isHoliday: false,
                    isCancelled: false,
                    aula: ev.aula + ' (Disp. Docente)'
                });
            });

            if (presencialAssignments.length === 0) {
                const names = Array.from(foundNames).join(", ");
                summary.innerHTML = `Profesor(es): ${names}`;
                container.innerHTML = `
                    <div class="empty-state" style="grid-column: 1/-1; color: var(--warning)">
                        <i class="fas fa-laptop-house" style="color: var(--warning)"></i>
                        El profesor tiene asignaciones, pero ninguna requiere presencialidad directa según la matriz de aulas.
                    </div>
                `;
                return;
            }

            presencialAssignments.sort((a, b) => a.semana - b.semana);

            const namesDisp = Array.from(foundNames).join(" | ");
            summary.innerHTML = `
                <div><i class="fas fa-calendar-check"></i> Mostrando clases para: <strong>${namesDisp}</strong></div>
                <button class="download-btn" onclick="downloadPdf()"><i class="fas fa-file-pdf"></i> Guardar como PDF</button>
            `;

            let html = '';
            presencialAssignments.forEach((item, index) => {
                const isVirtualBadge = item.isVirtual ? 'background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1;' : '';
                html += `
                    <div class="card" style="animation: slideUp 0.5s ease-out forwards; opacity: 0; animation-delay: ${Math.min(index * 0.05, 1)}s; ${item.isVirtual ? 'border-left-color: #94a3b8;' : ''}">
                        <div class="card-header">
                            <span><i class="fas fa-users"></i> ${item.comision}</span>
                            <span class="badge" style="${isVirtualBadge}"><i class="fas ${item.isVirtual ? 'fa-laptop-house' : 'fa-school'}"></i> ${item.isVirtual ? 'Virtual' : 'Semana ' + item.semanaStr}</span>
                        </div>
                        <div class="card-title">${item.materia}</div>
                        
                        <div class="detail-row">
                            <i class="fas fa-calendar-day"></i> ${item.exactDate}
                        </div>
                        
                        <div class="detail-row">
                            <i class="fas fa-map-marker-alt"></i> 
                            <span>Aula: ${item.isHoliday ? '<strong style="color: var(--danger); text-transform: uppercase;">Feriado</strong>' : (item.isCancelled ? '<strong style="color: var(--danger);">' + item.aula + '</strong>' : item.aula)}</span>
                        </div>
                        
                        <div class="detail-row" style="font-size:0.95rem; color:var(--text-muted); margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
                            <i class="fas fa-user-tie"></i> ${item.profesor}
                        </div>
                    </div>
                `;
            });

            container.innerHTML = html;
        }

        function downloadPdf() {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            const profName = inputSearch.value.trim();
            
            pdf.setFontSize(16);
            pdf.setFont("helvetica", "bold");
            pdf.text(`Cronograma Presencial - ${profName.toUpperCase()}`, 14, 20);
            
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "normal");
            
            let y = 30;
            const cards = document.querySelectorAll('.card');
            
            if (cards.length === 0) {
                pdf.text("No se encontraron clases presenciales.", 14, y);
            } else {
                cards.forEach(card => {
                    const headerTxt = card.querySelector('.card-header').innerText.trim().replace(/\n/g, ' - ');
                    const titleTxt = card.querySelector('.card-title').innerText.trim();
                    const details = card.querySelectorAll('.detail-row');
                    const fechaTxt = details[0].innerText.trim(); // Now contains the exact date string
                    const aulaTxt = details[1].innerText.trim();
                    const profTxt = details[2].innerText.trim();
                    
                    // Add new page if content exceeds A4 length
                    if (y > 270) {
                        pdf.addPage();
                        y = 20;
                    }
                    
                    // Print structured text block
                    pdf.setFont("helvetica", "bold");
                    pdf.text(headerTxt, 14, y);
                    y += 6;
                    
                    pdf.setFont("helvetica", "normal");
                    pdf.text(`Materia: ${titleTxt}`, 14, y);
                    y += 6;
                    
                    pdf.text(`Fecha: ${fechaTxt}`, 14, y);
                    y += 6;
                    
                    pdf.text(aulaTxt, 14, y);
                    y += 6;
                    
                    pdf.text(`Docente: ${profTxt}`, 14, y);
                    y += 10;
                    
                    // Separator line
                    pdf.setDrawColor(200);
                    pdf.line(14, y - 3, 196, y - 3);
                    y += 6;
                });
            }
            
            pdf.save(`cronograma_${profName}.pdf`);
        }

        function showCareer(careerPrefix) {
            currentView = { type: 'career', value: careerPrefix };
            inputSearch.value = '';
            
            let presencialAssignments = [];
            
            const comisiones = allComisiones.filter(c => c.startsWith(careerPrefix));
            
            schedule.forEach(week => {
                comisiones.forEach(com => {
                    const aula = week[com];
                    if (isPresencial(aula)) {
                        Object.entries(professors[com]).forEach(([dia, clases]) => {
                            clases.forEach(c => {
                                const dateDetails = getExactDate(dia, week.FECHAS);
                                
                                let displayAula = aula;
                                let isCancelled = false;
                                if ((week.SEMANA === "1" && com === "TSAS 1C" && (dia === "Lunes" || dia === "Martes")) ||
                                    (week.SEMANA === "1" && com.endsWith("1C") && dia === "Miércoles")) {
                                    displayAula = "No hay clases";
                                    isCancelled = true;
                                }

                                const isUserCanceled = canceledClasses.some(cc =>
                                    String(cc.semana) === String(week.SEMANA) &&
                                    cc.dia.trim().toLowerCase() === dia.trim().toLowerCase() &&
                                    cc.comision.trim().toLowerCase() === com.trim().toLowerCase() &&
                                    cc.materia.trim().toLowerCase() === c.Materia.trim().toLowerCase()
                                );
                                
                                if (isUserCanceled || isCancelled) {
                                    return; // Omitir la clase porque fue cancelada (ya sea por admin o por excepción)
                                }

                                presencialAssignments.push({
                                    profesor: c.Profesor,
                                    materia: c.Materia,
                                    comision: com,
                                    dia: dia,
                                    semana: parseInt(week.SEMANA),
                                    semanaStr: week.SEMANA,
                                    fechas: week.FECHAS,
                                    exactDate: dateDetails.full,
                                    isHoliday: dateDetails.isHoliday,
                                    isCancelled: isCancelled,
                                    aula: displayAula
                                });
                            });
                        });
                    }
                });
            });

            if (presencialAssignments.length === 0) {
                summary.innerHTML = '';
                container.innerHTML = `
                    <div class="empty-state" style="grid-column: 1/-1; color: var(--danger)">
                        <i class="fas fa-search-minus" style="color: var(--danger)"></i>
                        No se encontraron clases presenciales para la carrera "${careerPrefix}".
                    </div>
                `;
                return;
            }
            
            presencialAssignments.sort((a, b) => a.semana - b.semana);

            summary.innerHTML = `
                <div><i class="fas fa-calendar-check"></i> Mostrando cronograma presencial para: <strong>${careerPrefix}</strong></div>
                <button class="download-btn" onclick="downloadPdf()"><i class="fas fa-file-pdf"></i> Guardar como PDF</button>
            `;

            let html = '';
            presencialAssignments.forEach((item, index) => {
                html += `
                    <div class="card" style="animation: slideUp 0.5s ease-out forwards; opacity: 0; animation-delay: ${Math.min(index * 0.05, 1)}s;">
                        <div class="card-header">
                            <span><i class="fas fa-users"></i> ${item.comision}</span>
                            <span class="badge"><i class="fas fa-school"></i> Semana ${item.semanaStr}</span>
                        </div>
                        <div class="card-title">${item.materia}</div>
                        
                        <div class="detail-row">
                            <i class="fas fa-calendar-day"></i> ${item.exactDate}
                        </div>
                        
                        <div class="detail-row">
                            <i class="fas fa-map-marker-alt"></i> 
                            <span>Aula: ${item.isHoliday ? '<strong style="color: var(--danger); text-transform: uppercase;">Feriado</strong>' : (item.isCancelled ? '<strong style="color: var(--danger);">' + item.aula + '</strong>' : item.aula)}</span>
                        </div>
                        
                        <div class="detail-row" style="font-size:0.95rem; color:var(--text-muted); margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
                            <i class="fas fa-user-tie"></i> ${item.profesor}
                        </div>
                    </div>
                `;
            });

            container.innerHTML = html;
        }

        inputSearch.addEventListener('input', renderResults);

        // Limpiar el estado de los componentes cuando el DOM carga
        document.addEventListener('DOMContentLoaded', () => {
            // Eliminar código admin que causaba errores
        });

        // Motivational Quote logic
        document.addEventListener('DOMContentLoaded', () => {
            const quotes = [
                { text: "La educación es el arma más poderosa que puedes usar para cambiar el mundo.", author: "Nelson Mandela" },
                { text: "El aprendizaje nunca agota la mente.", author: "Leonardo da Vinci" },
                { text: "La educación no es preparación para la vida; la educación es la vida misma.", author: "John Dewey" },
                { text: "Un niño, un profesor, un libro y una pluma pueden cambiar el mundo.", author: "Malala Yousafzai" },
                { text: "Lo único que interfiere con mi aprendizaje es mi educación.", author: "Albert Einstein" },
                { text: "La raíz de la educación es amarga, pero el fruto es dulce.", author: "Aristóteles" },
                { text: "La educación es el pasaporte hacia el futuro, el mañana pertenece a aquellos que se preparan para él en el día de hoy.", author: "Malcolm X" }
            ];
            const date = new Date();
            const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
            const quoteIndex = dayOfYear % quotes.length;
            const selectedQuote = quotes[quoteIndex];
            
            const quoteEl = document.getElementById('motivationalQuote');
            if (quoteEl) {
                quoteEl.innerHTML = `"${selectedQuote.text}" <br><span style="font-size: 0.9em; font-weight: bold;">— ${selectedQuote.author}</span>`;
            }
        });

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
                                        
                                        // Check for canceled classes
                                        let isCancelled = canceledClasses.some(cc => {
                                            const sameSemana = String(cc.semana) === String(week.SEMANA);
                                            const sameComision = cc.comision.trim().toLowerCase() === com.trim().toLowerCase();
                                            const sameDia = cc.dia.trim().toLowerCase() === diaName.trim().toLowerCase() || 
                                                            (diaName === 'Miércoles' && cc.dia.toLowerCase().includes('rcoles'));
                                            const sameMateriaOrProfesor = 
                                                (cc.materia && cc.materia.trim().toLowerCase() === c.Materia.trim().toLowerCase()) ||
                                                (cc.profesor && cc.profesor.trim().toLowerCase() === c.Profesor.trim().toLowerCase());
                                            
                                            // Fallback for old manual cancellations using cc.fecha
                                            const dateStrStr = d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,'0') + "-" + String(d.getDate()).padStart(2,'0');
                                            const sameFecha = cc.fecha === dateStrStr &&
                                                              cc.profesor.trim().toLowerCase() === c.Profesor.trim().toLowerCase() &&
                                                              cc.comision.trim().toLowerCase() === com.trim().toLowerCase();
                                            
                                            return (sameSemana && sameDia && sameComision && sameMateriaOrProfesor) || sameFecha;
                                        });
                                        
                                        // Hardcoded logic
                                        if ((String(week.SEMANA) === "1" && com === "TSAS 1C" && (diaName === "Lunes" || diaName === "Martes")) ||
                                            (String(week.SEMANA) === "1" && com.endsWith("1C") && diaName === "Miércoles")) {
                                            isCancelled = true;
                                        }
                                        
                                        if (classYMD === targetYMD && !isCancelled) {
                                            let displayAula = aula;
                                            if (displayAula === 'VIRTUAL' || displayAula === '') {
                                                displayAula = 'Modalidad Virtual';
                                            } else if (displayAula === 'ASINCRONICA') {
                                                displayAula = 'Asincrónica';
                                            }
                                            results.push({
                                                fecha: `${d.getDate()}/${d.getMonth()+1}`,
                                                carrera: com.split(' ')[0],
                                                materia: c.Materia,
                                                profesor: c.Profesor,
                                                aula: displayAula
                                            });
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
            });
            
            // Daily events
            dailyEvents.forEach(ev => {
                if (!ev.fecha) return;
                const parts = ev.fecha.split('-');
                if (parts.length !== 3) return;
                const d = new Date(parseInt(parts[0]), parseInt(parts[1])-1, parseInt(parts[2]));
                const evYMD = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
                if (evYMD === targetYMD) {
                    results.push({
                        fecha: `${d.getDate()}/${d.getMonth()+1}`,
                        carrera: ev.comision.split(' ')[0],
                        materia: ev.materia,
                        profesor: ev.profesor,
                        aula: ev.aula + ' (Disp. Docente)'
                    });
                }
            });
            
            return results;
        }

        function renderCarteleraDate() {
            const dateStr = document.getElementById('s-date').value;
            if(!dateStr) return;
            
            // Clear search box so it's clear what mode we are in
            document.getElementById('s-profesor').value = '';
            currentView = { type: 'date', value: dateStr };
            
            const [y, m, d] = dateStr.split('-');
            const targetDateObj = new Date(parseInt(y), parseInt(m)-1, parseInt(d));
            
            const classes = getClassesForDate(targetDateObj);
            
            const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            const formattedTitle = `${dayNames[targetDateObj.getDay()]} ${targetDateObj.getDate()} de ${monthNames[targetDateObj.getMonth()]}`;
            
            summary.innerHTML = `<div><i class="fas fa-calendar-day"></i> Cartelera para: <strong>${formattedTitle}</strong></div>`;
            
            if (classes.length === 0) {
                container.innerHTML = `
                    <div class="empty-state" style="grid-column: 1/-1; color: var(--warning)">
                        <i class="fas fa-bed" style="color: var(--warning)"></i>
                        No hay clases presenciales programadas para este día.
                    </div>
                `;
                return;
            }
            
            // Sort by carrera, then materia
            classes.sort((a, b) => {
                if(a.carrera !== b.carrera) return a.carrera.localeCompare(b.carrera);
                return a.materia.localeCompare(b.materia);
            });
            
            let htmlCards = '';
            classes.forEach((c) => {
                htmlCards += `
                    <div class="card">
                        <div class="card-header">
                            <span class="aula-badge">${c.aula}</span>
                            <span style="font-size: 0.9rem; font-weight: 500;">${c.carrera}</span>
                        </div>
                        <div class="card-body">
                            <h3>${c.profesor}</h3>
                            <p style="color: var(--text-muted); margin-bottom: 0.5rem; font-weight: 500;">
                                ${c.materia}
                            </p>
                        </div>
                    </div>
                `;
            });
            
            container.innerHTML = htmlCards;
        }
    
    

