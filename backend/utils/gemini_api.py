import requests
import logging
import google.generativeai as genai
import base64

GEMINI_IMAGE_MODEL = 'models/imagen-3'

def generate_image_from_prompt(prompt):
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel(GEMINI_IMAGE_MODEL)
    response = model.generate_content(prompt)
    image_bytes = response.candidates[0].content.parts[0].inline_data.data
    image_b64 = base64.b64encode(image_bytes).decode('utf-8')
    return image_b64

GEMINI_API_KEY = 'AIzaSyCtDRuoS7R0G40ZHBOsSCP1C6kSIxbtBQY'
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY #tangina if the gemini is not working just change this shit

PROMPT_TEMPLATE = (
    """
    Extract the key terms from the following text. For each key term, provide a short, clear definition or summary based on the context. 
    Respond in JSON format as:
    {
      "terms": [
        {"term": "...", "definition": "..."},
        ...
      ]
    }
    Text:
    """
)

def extract_key_terms_and_topics(text):
    prompt = PROMPT_TEMPLATE + text[:4000]  # Gemini prompt limit; truncate if needed
    payload = {
        "contents": [
            {"parts": [{"text": prompt}]}
        ]
    }
    response = requests.post(GEMINI_API_URL, json=payload)
    if response.status_code != 200:
        raise Exception(f"Gemini API error: {response.status_code} {response.text}")
    data = response.json()
    # Extract the model's response text
    # Robustly extract model_text from Gemini response
    model_text = None
    try:
        if (
            'candidates' in data and data['candidates'] and
            'content' in data['candidates'][0] and
            'parts' in data['candidates'][0]['content'] and
            data['candidates'][0]['content']['parts'] and
            'text' in data['candidates'][0]['content']['parts'][0]
        ):
            model_text = data['candidates'][0]['content']['parts'][0]['text']
        else:
            logging.error(f"Unexpected Gemini API response structure: {data}")
            return {"terms": [], "error": "Unexpected Gemini API response structure", "raw_response": data}
    except Exception as e:
        logging.error(f"Gemini API response parsing error: {e}, response: {data}")
        return {"terms": [], "error": "Gemini API response parsing error", "raw_response": data}
    # Try to parse JSON from model_text (handle code blocks, markdown, etc)
    import json
    import re
    logging.basicConfig(level=logging.INFO)
    # Try to extract JSON from markdown/code blocks
    match = re.search(r'```json([\s\S]*?)```', model_text)
    if match:
        model_text = match.group(1)
    else:
        # Try to find any JSON-like structure
        match = re.search(r'\{[\s\S]*\}', model_text)
        if match:
            model_text = match.group(0)
    try:
        parsed = json.loads(model_text)
        parsed['raw'] = model_text  # Always include raw for debug
        logging.info(f"Gemini raw output (parsed): {model_text}")
        return parsed
    except Exception:
        # If parsing fails, return raw output for debugging
        logging.warning(f"Gemini raw output (unparsed): {model_text}")
        return {"terms": [], "raw": model_text, "error": "Could not parse Gemini output as JSON"}
