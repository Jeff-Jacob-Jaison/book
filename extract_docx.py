import zipfile
import xml.etree.ElementTree as ET
import sys

def extract_text_from_docx(docx_path):
    try:
        with zipfile.ZipFile(docx_path) as docx:
            xml_content = docx.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            
            paragraphs = tree.findall('.//w:p', ns)
            text = []
            for paragraph in paragraphs:
                texts = paragraph.findall('.//w:t', ns)
                if texts:
                    paragraph_text = "".join([t.text for t in texts if t.text])
                    text.append(paragraph_text)
            
            return "\n".join(text)
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    path = r'c:\Users\jeffj\OneDrive\Documents\laravel\book_vault\Project_Report.docx'
    text = extract_text_from_docx(path)
    with open(r'c:\Users\jeffj\OneDrive\Documents\laravel\book_vault\extracted_report.txt', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Extraction completed. Check extracted_report.txt.")
