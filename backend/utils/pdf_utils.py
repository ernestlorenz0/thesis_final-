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
    Enhanced PDF image extraction with improved filtering logic.
    
    Extracts images while intelligently filtering out:
    - Very small decorative elements (< 50px in both dimensions)
    - Extremely thin lines/borders (< 5px in one dimension)
    - Highly repetitive elements (logos appearing on >75% of pages)
    - Very low quality/resolution images
    
    Preserves:
    - Charts, diagrams, and infographics (even if smaller)
    - Important images that appear on multiple pages
    - Images with good aspect ratios
    - High-quality content images
    
    Returns list of saved image paths.
    """
    pdf_bytes = file_storage.read()
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    num_pages = len(doc)
    os.makedirs(output_dir, exist_ok=True)

    # Track image characteristics across pages
    bbox_counter = defaultdict(int)
    image_data = []
    image_sizes = defaultdict(list)

    print(f"📄 Processing PDF with {num_pages} pages...")

    # First pass: collect comprehensive image info
    for page_num, page in enumerate(doc):
        img_list = page.get_images(full=True)
        print(f"📄 Page {page_num + 1}: Found {len(img_list)} images")
        
        for img_index, img in enumerate(img_list):
            xref = img[0]
            bbox = page.get_image_bbox(img)
            
            # Get image dimensions from the image object itself
            try:
                pix = fitz.Pixmap(doc, xref)
                actual_width, actual_height = pix.width, pix.height
                pix = None  # Free memory immediately
            except:
                actual_width, actual_height = 0, 0
            
            if bbox:
                bbox_key = tuple(map(int, bbox))
                bbox_counter[bbox_key] += 1
                image_sizes[xref].append((actual_width, actual_height))
            
            image_data.append((page_num, xref, bbox, actual_width, actual_height))

    # Enhanced filtering logic
    def is_important_image(page_num, xref, bbox, width, height):
        """Determine if an image is important enough to extract"""
        
        # Skip extremely small images (likely decorative dots, bullets)
        if width < 30 and height < 30:
            print(f"❌ Skipping tiny image: {width}x{height}px")
            return False
        
        # Skip very thin lines/borders (like horizontal rules)
        if min(width, height) < 8:
            print(f"❌ Skipping thin line/border: {width}x{height}px")
            return False
        
        # Calculate area and aspect ratio
        area = width * height
        aspect_ratio = max(width, height) / max(min(width, height), 1)
        
        # AGGRESSIVE FILTERING FOR HEADERS/FOOTERS/ADMINISTRATIVE CONTENT
        
        # Skip very wide, short images (likely headers/footers/section bars)
        if height <= 40 and width > 400 and aspect_ratio > 15:
            print(f"❌ Skipping header/footer bar: {width}x{height}px, ratio: {aspect_ratio:.1f}")
            return False
        
        # Skip small logos/administrative elements (typically square-ish and small)
        if width <= 100 and height <= 60 and area <= 4000:
            print(f"❌ Skipping small logo/admin element: {width}x{height}px, area: {area}")
            return False
        
        # Skip very elongated small images (likely decorative elements)
        if area < 3000 and aspect_ratio > 12:
            print(f"❌ Skipping elongated decorative element: {width}x{height}px, ratio: {aspect_ratio:.1f}")
            return False
        
        # Check if image appears too frequently (likely logo/header/footer)
        if bbox:
            bbox_key = tuple(map(int, bbox))
            appearance_ratio = bbox_counter[bbox_key] / num_pages
            
            # Very strict for small images (logos, headers)
            if area <= 8000:  # Small images
                repetition_threshold = 0.4  # If appears on >40% of pages, likely header/footer
            elif area <= 20000:  # Medium images  
                repetition_threshold = 0.7  # More lenient for medium content
            else:  # Large images
                repetition_threshold = 0.9  # Very lenient for large content
            
            if appearance_ratio > repetition_threshold:
                print(f"❌ Skipping repetitive element: appears on {bbox_counter[bbox_key]}/{num_pages} pages (area: {area})")
                return False
        
        # PERMISSIVE RULES FOR ACTUAL CONTENT
        
        # Keep any substantial images (likely charts, diagrams, photos)
        if width >= 120 or height >= 120:
            print(f"✅ Keeping substantial content: {width}x{height}px")
            return True
        
        # Keep medium-sized images with reasonable aspect ratios
        if area >= 4000 and aspect_ratio <= 8:  # More permissive
            print(f"✅ Keeping medium content: {width}x{height}px, ratio: {aspect_ratio:.1f}")
            return True
        
        # Keep images that might be charts/diagrams
        if width >= 70 and height >= 50 and aspect_ratio <= 5:
            print(f"✅ Keeping potential chart/diagram: {width}x{height}px")
            return True
        
        # MATHEMATICAL FORMULAS AND EQUATIONS (very permissive)
        if height >= 25 and width >= 80:  # Minimum readable size
            if aspect_ratio <= 25:  # Very wide formulas allowed
                if area >= 2000:  # Reasonable total area
                    print(f"✅ Keeping mathematical formula: {width}x{height}px, ratio: {aspect_ratio:.1f}")
                    return True
        
        # Small but potentially important content (symbols, small diagrams)
        if height >= 40 and width >= 40 and area >= 2000:
            if aspect_ratio <= 6:  # Not too elongated
                print(f"✅ Keeping small content: {width}x{height}px, ratio: {aspect_ratio:.1f}")
                return True
        
        # Tables or structured content (wider but not too wide)
        if width >= 100 and height >= 30 and aspect_ratio <= 15:
            if area >= 3000:
                print(f"✅ Keeping table/structured content: {width}x{height}px, ratio: {aspect_ratio:.1f}")
                return True
        
        print(f"❌ Filtering out image: {width}x{height}px, area: {area}, ratio: {aspect_ratio:.1f}")
        return False

    # Second pass: extract filtered images
    saved_images = []
    processed_xrefs = set()  # Avoid duplicate extractions
    
    for page_num, xref, bbox, width, height in image_data:
        # Skip if we've already processed this image
        if xref in processed_xrefs:
            continue
        
        # Apply enhanced filtering
        if not is_important_image(page_num, xref, bbox, width, height):
            continue
        
        try:
            # Extract and save the image
            pix = fitz.Pixmap(doc, xref)
            
            # Convert CMYK to RGB if needed
            if pix.n > 4:
                pix = fitz.Pixmap(fitz.csRGB, pix)
            
            # Save with descriptive filename
            img_path = os.path.join(output_dir, f"page{page_num+1}_img{xref}_{width}x{height}.png")
            pix.save(img_path)
            saved_images.append(img_path)
            processed_xrefs.add(xref)
            
            print(f"💾 Saved: page{page_num+1}_img{xref}_{width}x{height}.png")
            pix = None  # Free memory
            
        except Exception as e:
            print(f"❌ Error extracting image {xref}: {e}")
            continue

    doc.close()
    print(f"🎯 Extracted {len(saved_images)} images from {num_pages} pages")
    return saved_images
