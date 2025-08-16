import fitz  # PyMuPDF
from io import BytesIO
from collections import defaultdict
import os

def extract_pdf_text(file_storage):
    """Extracts all text from a PDF file uploaded via Flask."""
    pdf_bytes = file_storage.read()
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    text = "\n".join(page.get_text() for page in doc)
    doc.close()
    return text


def extract_images_from_pdf(file_storage, output_dir="extracted_images"):
    """
    Extract images from a PDF, skipping:
    - Images with width or height < 150 px (including thin lines)
    - Images that appear in the same location on >50% of pages (e.g., logos)
    Saves valid images as PNGs to `output_dir`.
    Returns list of saved image paths.
    """
    pdf_bytes = file_storage.read()
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    num_pages = len(doc)
    os.makedirs(output_dir, exist_ok=True)

    # Track image bbox positions across pages
    bbox_counter = defaultdict(int)
    image_data = []

    # First pass: collect bbox info
    for page_num, page in enumerate(doc):
        img_list = page.get_images(full=True)
        for img_index, img in enumerate(img_list):
            xref = img[0]
            bbox = page.get_image_bbox(img)
            if bbox:
                bbox_counter[tuple(map(int, bbox))] += 1
            image_data.append((page_num, xref, bbox))

    # Identify repetitive images (logos, headers)
    repetitive_bboxes = {bbox for bbox, count in bbox_counter.items() if count > num_pages / 2}

    saved_images = []
    for page_num, xref, bbox in image_data:
        # Skip repetitive images
        if bbox and tuple(map(int, bbox)) in repetitive_bboxes:
            continue
        # Get image
        pix = fitz.Pixmap(doc, xref)
        # Skip small/thin images
        if pix.width < 150 or pix.height < 150 or min(pix.width, pix.height) < 10:
            continue
        # Save as PNG
        img_path = os.path.join(output_dir, f"page{page_num+1}_img{xref}.png")
        if pix.n > 4:  # CMYK or others
            pix = fitz.Pixmap(fitz.csRGB, pix)
        pix.save(img_path)
        saved_images.append(img_path)
        pix = None  # Free memory

    doc.close()
    return saved_images
