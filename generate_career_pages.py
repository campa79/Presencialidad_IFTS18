import re

def generate_page(career_id):
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Insert back button and hide search and buttons
    # We find <main>
    # <main>
    main_start = html.find('<main>') + len('<main>')
    
    inject_html = f'''
            <div style="display: flex; justify-content: flex-start; margin-bottom: 1rem;">
                <button type="button" class="download-btn" style="background: var(--secondary); margin-top: 0;" onclick="window.location.href='index.html'">
                    <i class="fas fa-arrow-left"></i> Volver
                </button>
            </div>
            <style>
                .search-container {{ display: none !important; }}
                main > div:nth-child(2) {{ display: none !important; }} /* Hides the buttons container */
            </style>
    '''
    
    html = html[:main_start] + inject_html + html[main_start:]
    
    # Auto call showCareer at the bottom
    # find </body>
    body_end = html.find('</body>')
    inject_script = f'''
    <script>
        document.addEventListener('DOMContentLoaded', function() {{
            setTimeout(() => {{
                showCareer('{career_id}');
            }}, 500); // Give it a bit of time to load JSON
        }});
    </script>
    '''
    
    html = html[:body_end] + inject_script + html[body_end:]
    
    with open(f'{career_id.lower()}.html', 'w', encoding='utf-8') as f:
        f.write(html)

for career in ['TSAS', 'TSDS', 'TSCDIA']:
    generate_page(career)
