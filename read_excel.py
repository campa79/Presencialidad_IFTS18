import json
import sys

try:
    import pandas as pd
except ImportError:
    print("ERROR: pandas not found")
    sys.exit(1)

file_path = r"c:\Users\Campa\Downloads\Presencialidad 1C 2026\Presencialidad 1C 2026.xlsx"
try:
    df = pd.read_excel(file_path, sheet_name=None)
    for sheet, data in df.items():
        print(f'--- SHEET: {sheet} ---')
        print(data.to_csv(index=False))
except Exception as e:
    print(f"ERROR: {e}")
