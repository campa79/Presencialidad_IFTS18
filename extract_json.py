import pandas as pd
import json
import math

file_path = r"c:\Users\Campa\Downloads\Presencialidad 1C 2026\Presencialidad 1C 2026.xlsx"
df = pd.read_excel(file_path, sheet_name=0, header=None)

# Table 1: Weeks and Rooms
# Rows 1 to 17 (index 1 to 16 in df usually)
# Let's find the 'SEMANA' row
semana_idx = df[df[0] == 'SEMANA'].index[0]

headers_1 = df.iloc[semana_idx].fillna('').astype(str).tolist()
schedule = []
for i in range(semana_idx + 1, semana_idx + 17):
    row = df.iloc[i].fillna('').astype(str).tolist()
    if row[0].isdigit():
        obj = {}
        for j, h in enumerate(headers_1):
            if h:
                obj[h] = row[j] if row[j] else ''
        schedule.append(obj)

# Table 2: Professors and Subjects
# Find 'Lunes' or 'Profesor'
prof_idx = df[df[2] == 'Profesor'].index[0]

comisiones_data = {}
current_comision = None

for i in range(prof_idx + 1, len(df)):
    row = df.iloc[i].fillna('').astype(str).tolist()
    
    comision = row[1].strip()
    if comision:
        current_comision = comision
        comisiones_data[current_comision] = {
            'Lunes': [], 'Martes': [], 'Miércoles': [], 'Jueves': [], 'Viernes': []
        }
    
    if not current_comision:
        continue
        
    # Lunes: 2,3
    if row[2] or row[3]:
        comisiones_data[current_comision]['Lunes'].append({'Profesor': row[2], 'Materia': row[3]})
    # Martes: 4,5
    if row[4] or row[5]:
        comisiones_data[current_comision]['Martes'].append({'Profesor': row[4], 'Materia': row[5]})
    # Miércoles: 6,7
    if row[6] or row[7]:
        comisiones_data[current_comision]['Miércoles'].append({'Profesor': row[6], 'Materia': row[7]})
    # Jueves: 8,9
    if row[8] or row[9]:
        comisiones_data[current_comision]['Jueves'].append({'Profesor': row[8], 'Materia': row[9]})
    # Viernes: 10,11
    if row[10] or row[11]:
        comisiones_data[current_comision]['Viernes'].append({'Profesor': row[10], 'Materia': row[11]})

with open(r"c:\Users\Campa\Downloads\Presencialidad 1C 2026\data.json", "w", encoding="utf-8") as f:
    json.dump({'schedule': schedule, 'professors': comisiones_data}, f, ensure_ascii=False, indent=2)
