from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.pdf_utils import extract_pdf_text
from utils.gemini_api import extract_key_terms_and_topics

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_pdf():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    files = request.files.getlist('file')
    if not files or all(f.filename == '' for f in files):
        return jsonify({'error': 'No selected file'}), 400
    results = []
    for file in files:
        if not file.filename.lower().endswith('.pdf'):
            results.append({'filename': file.filename, 'error': 'File must be a PDF'})
            continue
        try:
            text = extract_pdf_text(file)
            # Split text into 3500-character chunks (safe for Gemini)
            chunks = [text[i:i+3500] for i in range(0, len(text), 3500)]
            all_terms = []
            for chunk in chunks:
                ai_results = extract_key_terms_and_topics(chunk)
                if ai_results.get('terms'):
                    all_terms.extend(ai_results['terms'])
            # Remove duplicates by term name
            seen = set()
            deduped_terms = []
            for t in all_terms:
                if t['term'] not in seen:
                    deduped_terms.append(t)
                    seen.add(t['term'])
            results.append({'filename': file.filename, 'terms': deduped_terms})
        except Exception as e:
            results.append({'filename': file.filename, 'error': str(e)})
    return jsonify({'success': True, 'results': results})

if __name__ == '__main__':
    app.run(debug=True)
