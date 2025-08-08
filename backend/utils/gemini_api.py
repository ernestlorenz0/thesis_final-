import requests
import logging

GEMINI_API_KEY = 'AIzaSyCtDRuoS7R0G40ZHBOsSCP1C6kSIxbtBQY'
GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent?key=' + GEMINI_API_KEY

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
    try:
        model_text = data['candidates'][0]['content']['parts'][0]['text']
    except Exception:
        raise Exception('Gemini API response format error')
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
        return {"terms": [], "raw": model_text}
