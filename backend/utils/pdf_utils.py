import fitz  # PyMuPDF
from io import BytesIO

def extract_pdf_text(file_storage):
    """Extracts all text from a PDF file uploaded via Flask."""
    pdf_bytes = file_storage.read()
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    text = "\n".join(page.get_text() for page in doc)
    doc.close()
    return text
