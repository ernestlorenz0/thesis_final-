from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from utils.pdf_utils import extract_pdf_text, extract_images_from_pdf
from utils.gemini_api import extract_key_terms_and_topics
import os
import requests
import base64

# API Keys
HUGGINGFACE_API_KEY = ""
GEMINI_API_KEY = "AIzaSyCtDRuoS7R0G40ZHBOsSCP1C6kSIxbtBQY"

app = Flask(__name__, static_folder='static')
CORS(app)

# Hugging Face Models
FLUX1_MODEL_ID = 'black-forest-labs/FLUX.1-dev'
STABLE_DIFFUSION_MODEL_ID = 'runwayml/stable-diffusion-v1-5'
HF_API_URL = f'https://api-inference.huggingface.co/models/{FLUX1_MODEL_ID}'

# Serve extracted_images statically
@app.route('/extracted_images/<path:filename>')
def serve_extracted_image(filename):
    return send_from_directory(os.path.join(os.path.dirname(__file__), 'extracted_images'), filename)

# Serve generated_images statically
@app.route('/generated_images/<path:filename>')
def serve_generated_image(filename):
    return send_from_directory(os.path.join(os.path.dirname(__file__), 'generated_images'), filename)

@app.route('/generate-image', methods=['POST'])
def generate_image():

    data = request.get_json()
    # Support both 'topic' and 'prompt' for backward compatibility
    topic = data.get('topic') or data.get('prompt')
    if not topic:
        return jsonify({'error': 'Missing topic or prompt for image generation'}), 400

    try:
        print("🎨 Generating Hugging Face Image for topic:", topic)
        prompt = topic
        headers = {
            'Authorization': f'Bearer {HUGGINGFACE_API_KEY}',
            'Content-Type': 'application/json',
        }
        payload = {
            'inputs': prompt,
            'parameters': {
                'guidance_scale': 7.5,
                'num_inference_steps': 50
            }
        }
        models_to_try = [
            # Try FLUX first (requires special access)
            (FLUX1_MODEL_ID, f'https://api-inference.huggingface.co/models/{FLUX1_MODEL_ID}'),
            # Fallback to Stable Diffusion
            (STABLE_DIFFUSION_MODEL_ID, f'https://api-inference.huggingface.co/models/{STABLE_DIFFUSION_MODEL_ID}'),
            # Additional fallback models that are more accessible
            ('stabilityai/stable-diffusion-2-1', 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1'),
            ('CompVis/stable-diffusion-v1-4', 'https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4')
        ]
        response = None
        last_error = None
        for model_name, api_url in models_to_try:
            print(f"🤖 Trying model: {model_name}")
            try:
                resp = requests.post(api_url, headers=headers, json=payload, timeout=60)
                print(f"📥 Response status: {resp.status_code}")
                if resp.status_code == 200:
                    response = resp
                    print(f"✅ Success with model: {model_name}")
                    break
                elif resp.status_code == 503:
                    print(f"⏳ Model {model_name} is loading, waiting 10s...")
                    import time
                    time.sleep(10)
                    retry_resp = requests.post(api_url, headers=headers, json=payload, timeout=60)
                    if retry_resp.status_code == 200:
                        response = retry_resp
                        print(f"✅ Success with model: {model_name} after retry")
                        break
                    else:
                        last_error = f'Model {model_name} still loading after retry: {retry_resp.status_code} - {retry_resp.text}'
                        print(f"❌ {last_error}")
                else:
                    last_error = f'Model {model_name} failed: {resp.status_code} - {resp.text}'
                    print(f"❌ {last_error}")
            except Exception as e:
                last_error = f'Model {model_name} error: {str(e)}'
                print(f"❌ {last_error}")
                continue
        if not response or response.status_code != 200:
            print(f"❌ All models failed. Last error: {last_error}")
            return jsonify({'error': f'All models failed. Last error: {last_error}'}), 500

        # Handle both JSON (base64) and raw image bytes
        import base64
        content_type = response.headers.get('content-type', '')
        print(f"📊 Response content type: {content_type}")
        if 'application/json' in content_type:
            try:
                json_data = response.json()
                if 'image' in json_data:
                    image_bytes = base64.b64decode(json_data['image'])
                elif 'images' in json_data and len(json_data['images']) > 0:
                    image_bytes = base64.b64decode(json_data['images'][0])
                else:
                    error_msg = f'Unexpected JSON response format: {json_data}'
                    print(f"❌ {error_msg}")
                    return jsonify({'error': error_msg}), 500
            except Exception as e:
                error_msg = f'Failed to parse JSON response: {str(e)}'
                print(f"❌ {error_msg}")
                return jsonify({'error': error_msg}), 500
        else:
            image_bytes = response.content

        import uuid
        from pathlib import Path
        images_dir = Path(os.path.join(os.path.dirname(__file__), 'generated_images'))
        images_dir.mkdir(exist_ok=True)
        unique_filename = f"generated_{uuid.uuid4().hex}.png"
        image_path = images_dir / unique_filename
        with open(image_path, "wb") as f:
            f.write(image_bytes)
        print(f"✅ Image generated and saved as {unique_filename}!")
        
        # Convert image to base64 for frontend
        image_base64 = base64.b64encode(image_bytes).decode('utf-8')
        image_url = request.url_root.rstrip('/') + f"/generated_images/{unique_filename}"
        
        return jsonify({
            'image_base64': image_base64,
            'image_url': image_url
        })
        
    except requests.exceptions.Timeout:
        error_msg = "Request timed out. The image generation is taking longer than expected."
        print(f"❌ {error_msg}")
        return jsonify({'error': error_msg}), 500
    except Exception as e:
        error_msg = f"Error generating image: {str(e)}"
        print(f"❌ {error_msg}")
        return jsonify({'error': error_msg}), 500

# --- Asset Library Static Serving ---
ASSET_FOLDERS = {
    'icons': 'static/icons',
    'emojis': 'static/emojis',
    'backgrounds': 'static/backgrounds',
    'illustrations': 'static/illustrations',
}

@app.route('/assets/<category>/<path:filename>')
def serve_asset(category, filename):
    if category not in ASSET_FOLDERS:
        return jsonify({'error': 'Invalid asset category'}), 404
    return send_from_directory(os.path.join(os.path.dirname(__file__), ASSET_FOLDERS[category]), filename)

@app.route('/assets', methods=['GET'])
def list_assets():
    asset_base_url = request.url_root.rstrip('/') + '/assets'
    result = {}
    for cat, folder in ASSET_FOLDERS.items():
        folder_path = os.path.join(os.path.dirname(__file__), folder)
        if not os.path.exists(folder_path):
            result[cat] = []
            continue
        files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
        result[cat] = [
            {
                'name': f,
                'url': f'{asset_base_url}/{cat}/{f}'
            } for f in files
        ]
    return jsonify(result)

@app.route('/upload', methods=['POST'])
def upload_pdf():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    files = request.files.getlist('file')
    generate_image = request.form.get('generate_image', 'true').lower() == 'true'
    if not files or all(f.filename == '' for f in files):
        return jsonify({'error': 'No selected file'}), 400
    results = []
    for file in files:
        if not file.filename.lower().endswith('.pdf'):
            results.append({'filename': file.filename, 'error': 'File must be a PDF'})
            continue
        try:
            # Reset file pointer for multiple reads
            file.seek(0)
            text = extract_pdf_text(file)
            # Reset file pointer again for image extraction
            file.seek(0)
            extracted_images = extract_images_from_pdf(file)
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
            # Summarize the main topic for image prompt
            summary_prompt = "Summarize the main topic of the following terms for an academic presentation image prompt: " + ", ".join([t['term'] for t in deduped_terms])
            from utils.gemini_api import generate_image_from_prompt
            import logging
            image_b64 = None
            # Image generation is now handled by the frontend via the /generate-image endpoint
            results.append({'filename': file.filename, 'terms': deduped_terms, 'extracted_images': extracted_images})
        except Exception as e:
            results.append({'filename': file.filename, 'error': str(e)})
    return jsonify({'success': True, 'results': results})

import os
from flask import url_for

@app.route('/api/local-images')
def list_local_images():
    static_folder = os.path.join(app.root_path, 'static')
    image_extensions = {'.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.svg'}
    image_files = []
    for root, dirs, files in os.walk(static_folder):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in image_extensions:
                rel_dir = os.path.relpath(root, static_folder)
                rel_file = os.path.join(rel_dir, file) if rel_dir != '.' else file
                image_url = url_for('static', filename=rel_file.replace('\\', '/'))
                image_files.append({'name': file, 'url': image_url, 'folder': rel_dir})
    return jsonify({'images': image_files})

if __name__ == '__main__':
    app.run(debug=True)
