import sys
try:
    from docx import Document
except ImportError:
    print("python-docx not installed. Skipping docx formatting.")
    sys.exit(0)

with open(r'c:\Users\jeffj\OneDrive\Documents\laravel\book_vault\BookVault_New_Project_Report.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

doc = Document()
for line in lines:
    line = line.strip()
    if not line:
        continue
    if line.startswith('# '):
        doc.add_heading(line[2:], level=1)
    elif line.startswith('## '):
        doc.add_heading(line[3:], level=2)
    elif line.startswith('### '):
        doc.add_heading(line[4:], level=3)
    elif line.startswith('- '):
        doc.add_paragraph(line[2:], style='List Bullet')
    elif line.startswith('1. ') or line.startswith('2. ') or line.startswith('3. ') or line.startswith('4. ') or line.startswith('5. '):
        doc.add_paragraph(line[3:], style='List Number')
    else:
        doc.add_paragraph(line.replace('**', '').replace('*', ''))

doc.save(r'c:\Users\jeffj\OneDrive\Documents\laravel\book_vault\BookVault_New_Project_Report.docx')
print("Successfully created BookVault_New_Project_Report.docx")
