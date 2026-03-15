try {
    import-module -name pypdf -erroraction stop 
} catch {
    python -m pip install pypdf -q
}
python -c "
import pypdf
try:
    with open(r'C:\Users\pbert\Documents\JCKB\logomanual-JCKB-1.pdf', 'rb') as f:
        pdf = pypdf.PdfReader(f)
        for i, page in enumerate(pdf.pages):
            print(f'--- PAGE {i+1} ---')
            print(page.extract_text())
except Exception as e:
    print(f'Error: {e}')
"
