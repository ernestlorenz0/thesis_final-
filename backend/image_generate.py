import os
import google.generativeai as genai
from flask import Flask, request, jsonify

# Set your Gemini API key from environment or hardcode (not recommended for prod)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Use the Imagen 3 model (check Google docs for latest model name)
IMAGEN_MODEL = 'models/imagen-3'

app = Flask(__name__)

@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.get_json()
    prompt = data.get('prompt')
    if not prompt:
        return jsonify({'error': 'Missing prompt'}), 400
    try:
        model = genai.GenerativeModel(IMAGEN_MODEL)
        response = model.generate_content(prompt)
        # Get image bytes (PNG)
        image_bytes = response.candidates[0].content.parts[0].inline_data.data
        # Return as base64 string for frontend consumption
        import base64
        image_b64 = base64.b64encode(image_bytes).decode('utf-8')
        return jsonify({'image_base64': image_b64})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5050, debug=True)
