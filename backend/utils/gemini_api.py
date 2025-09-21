import requests
import logging
import google.generativeai as genai
import base64
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from app import GEMINI_API_KEY
except ImportError:
    GEMINI_API_KEY = "AIzaSyC5cVZm3uW9KjuEW1OV_HPI9PlteSkxz-g"

GEMINI_IMAGE_MODEL = 'models/imagen-3'
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-001:generateContent?key={GEMINI_API_KEY}"

def generate_image_from_prompt(prompt):
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel(GEMINI_IMAGE_MODEL)
    response = model.generate_content(prompt)
    image_bytes = response.candidates[0].content.parts[0].inline_data.data
    image_b64 = base64.b64encode(image_bytes).decode('utf-8')
    return image_b64

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

TOC_PROMPT_TEMPLATE = (
    """
    Analyze this academic document and create a concise, summarized table of contents.
    
    Requirements:
    - Create 4-6 main sections maximum (keep it balanced for two-column layout)
    - Each section title should be DESCRIPTIVE and COMPLETE (3-6 words) representing the actual content
    - Each section should have 1-2 CATEGORIES (sub-subjects) with FULL DESCRIPTIVE NAMES
    - Under each category, list 2-4 KEY TERMS from the document, sorted alphabetically
    - Focus on extracting actual COMPLETE PHRASES and CONCEPTS from the document
    - Section titles should be complete phrases like "Transportation Modeling and Simulation", "Network Protocol Analysis"
    - Categories should be complete descriptive phrases like "Traffic Flow Analysis Methods", "Vehicle Routing Optimization"
    - Terms should be specific technical terms or important keywords from the document
    - DO NOT use generic single words - extract ACTUAL COMPLETE PHRASES from the document content
    - Use FULL DESCRIPTIVE TITLES that reflect the actual document content
    
    Examples of GOOD COMPLETE section titles:
    - "Transportation Modeling and Simulation"
    - "Network Protocol Analysis and Implementation" 
    - "Machine Learning Applications in Healthcare"
    - "Statistical Data Analysis Methods"
    - "System Architecture and Design Patterns"
    
    Examples of CATEGORY → TERMS structure with COMPLETE DESCRIPTIVE NAMES:
    - For a transportation document:
      "Traffic Flow Analysis Methods" category with terms: ["Microscopic Simulation", "Macroscopic Modeling", "Queue Theory", "Optimization Algorithms"]
      "Vehicle Routing and Navigation" category with terms: ["GPS Integration", "Path Planning", "Real-time Updates", "Route Optimization"]
    - For a networking document:
      "Protocol Implementation and Standards" category with terms: ["HTTP/HTTPS", "TCP/IP Stack", "UDP Protocols", "WebSocket"]
      "Network Security and Encryption" category with terms: ["SSL/TLS", "Firewall Configuration", "VPN Tunneling", "Authentication"]
    - For a programming document:
      "Data Structure Design and Implementation" category with terms: ["Binary Trees", "Hash Tables", "Linked Lists", "Graph Algorithms"]
      "Function Design and Optimization" category with terms: ["Recursive Functions", "Parameter Passing", "Memory Management", "Performance Tuning"]
    
    EXTRACT ACTUAL TERMS from the document - do not use generic placeholders
    SORT TERMS alphabetically within each category
    
    Return ONLY a JSON object in this exact format with COMPLETE DESCRIPTIVE TITLES:
    {
      "title": "Table of Contents",
      "sections": [
        {
          "title": "Transportation Modeling and Simulation",
          "categories": [
            {
              "name": "Traffic Flow Analysis Methods",
              "terms": ["Microscopic Simulation", "Macroscopic Modeling", "Queue Theory", "Optimization Algorithms"]
            },
            {
              "name": "Vehicle Routing and Navigation", 
              "terms": ["GPS Integration", "Path Planning", "Real-time Updates", "Route Optimization"]
            }
          ]
        },
        {
          "title": "System Implementation and Validation",
          "categories": [
            {
              "name": "Software Architecture and Design",
              "terms": ["Component Design", "Interface Development", "Module Integration", "System Testing"]
            },
            {
              "name": "Performance Analysis and Optimization",
              "terms": ["Benchmarking", "Load Testing", "Memory Management", "Response Time Analysis"]
            }
          ]
        }
      ]
    }
    
    Document text:
    """
)

def generate_table_of_contents(text):
    """
    Generate a structured table of contents from document text using Gemini AI
    
    Args:
        text (str): The document text to analyze
        
    Returns:
        dict: Table of contents structure with sections and subsections
    """
    # Limit text length for Gemini API (keep first 6000 chars for better context)
    prompt = TOC_PROMPT_TEMPLATE + text[:6000]
    
    payload = {
        "contents": [
            {"parts": [{"text": prompt}]}
        ]
    }
    
    try:
        response = requests.post(GEMINI_API_URL, json=payload)
        if response.status_code != 200:
            raise Exception(f"Gemini API error: {response.status_code} {response.text}")
        
        data = response.json()
        
        # Extract the model's response text
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
                logging.error(f"Unexpected Gemini API response structure for TOC: {data}")
                return {"title": "Table of Contents", "sections": [], "error": "Unexpected API response structure"}
        except Exception as e:
            logging.error(f"Gemini API response parsing error for TOC: {e}")
            return {"title": "Table of Contents", "sections": [], "error": "Response parsing error"}
        
        # Parse JSON from model response
        import json
        import re
        
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
            parsed_toc = json.loads(model_text)
            
            # Validate the structure
            if 'sections' not in parsed_toc:
                parsed_toc['sections'] = []
            if 'title' not in parsed_toc:
                parsed_toc['title'] = "Table of Contents"
            
            # Ensure each section has required fields and is concise
            for section in parsed_toc['sections']:
                if 'title' not in section:
                    section['title'] = "Untitled Section"
                if 'subsections' not in section:
                    section['subsections'] = []
                
                # Limit section title length (max 4 words)
                title_words = section['title'].split()
                if len(title_words) > 4:
                    section['title'] = ' '.join(title_words[:4])
                
                # Handle new categories structure or convert old subsections format
                if 'categories' not in section:
                    # Convert old subsections format to new categories format
                    if 'subsections' in section and section['subsections']:
                        # Convert old subsections to categories with sample terms
                        section['categories'] = []
                        for i, subsection in enumerate(section['subsections'][:2]):  # Max 2 categories
                            category_name = subsection
                            # Generate sample terms based on category name
                            sample_terms = ['Analysis', 'Methods', 'Results']
                            section['categories'].append({
                                'name': category_name,
                                'terms': sample_terms
                            })
                        # Remove old subsections key
                        del section['subsections']
                    else:
                        # Add default categories if none provided
                        title_lower = section['title'].lower()
                        if 'introduction' in title_lower:
                            section['categories'] = [
                                {'name': 'Problem Statement and Background', 'terms': ['Research Context', 'Problem Definition', 'Literature Review', 'Scope Analysis']},
                                {'name': 'Research Objectives and Methodology', 'terms': ['Primary Goals', 'Research Questions', 'Methodology Framework', 'Study Design']}
                            ]
                        elif 'concept' in title_lower:
                            section['categories'] = [
                                {'name': 'Theoretical Framework and Definitions', 'terms': ['Core Concepts', 'Mathematical Models', 'System Theory', 'Technical Definitions']},
                                {'name': 'Fundamental Principles and Methods', 'terms': ['Algorithm Design', 'Implementation Methods', 'System Architecture', 'Design Patterns']}
                            ]
                        else:
                            section['categories'] = [
                                {'name': 'Analysis Methods and Techniques', 'terms': ['Data Analysis', 'Performance Metrics', 'Statistical Methods', 'Validation Techniques']},
                                {'name': 'Practical Applications and Implementation', 'terms': ['Real-world Examples', 'System Implementation', 'Use Case Studies', 'Deployment Strategies']}
                            ]
                
                # Ensure max 2 categories per section
                if len(section['categories']) > 2:
                    section['categories'] = section['categories'][:2]
                
                # Ensure each category has max 4 terms, sorted alphabetically
                for category in section['categories']:
                    if 'terms' in category and category['terms']:
                        # Sort terms alphabetically and limit to 4
                        category['terms'] = sorted(category['terms'])[:4]
                        # Ensure terms are short (max 2 words)
                        for i, term in enumerate(category['terms']):
                            term_words = term.split()
                            if len(term_words) > 2:
                                category['terms'][i] = ' '.join(term_words[:2])
                    else:
                        category['terms'] = ['Term1', 'Term2', 'Term3']
            
            # Limit total sections to max 5
            if len(parsed_toc['sections']) > 5:
                parsed_toc['sections'] = parsed_toc['sections'][:5]
            
            parsed_toc['raw'] = model_text  # Include raw for debugging
            logging.info(f"Generated TOC successfully: {len(parsed_toc['sections'])} sections")
            return parsed_toc
            
        except json.JSONDecodeError as e:
            logging.warning(f"Could not parse TOC JSON: {e}, raw output: {model_text}")
            # Return a fallback structure
            return {
                "title": "Table of Contents", 
                "sections": [
                    {
                        "title": "Introduction", 
                        "categories": [
                            {"name": "Overview", "terms": ["Background", "Objectives", "Scope"]},
                            {"name": "Purpose", "terms": ["Goals", "Methodology", "Research"]}
                        ]
                    },
                    {
                        "title": "Key Concepts", 
                        "categories": [
                            {"name": "Definitions", "terms": ["Framework", "Models", "Theory"]},
                            {"name": "Principles", "terms": ["Concepts", "Methods", "Rules"]}
                        ]
                    },
                    {
                        "title": "Applications", 
                        "categories": [
                            {"name": "Use Cases", "terms": ["Examples", "Implementation", "Usage"]},
                            {"name": "Benefits", "terms": ["Advantages", "Impact", "Value"]}
                        ]
                    },
                    {
                        "title": "Conclusion", 
                        "categories": [
                            {"name": "Summary", "terms": ["Findings", "Results", "Summary"]},
                            {"name": "Future Work", "terms": ["Directions", "Research", "Trends"]}
                        ]
                    }
                ],
                "raw": model_text, 
                "error": "Could not parse Gemini output as JSON"
            }
            
    except Exception as e:
        logging.error(f"Error generating TOC: {e}")
        return {
            "title": "Table of Contents", 
            "sections": [
                {
                    "title": "Introduction", 
                    "categories": [
                        {"name": "Overview", "terms": ["Background", "Objectives", "Scope"]},
                        {"name": "Purpose", "terms": ["Goals", "Methodology", "Research"]}
                    ]
                },
                {
                    "title": "Key Concepts", 
                    "categories": [
                        {"name": "Definitions", "terms": ["Framework", "Models", "Theory"]},
                        {"name": "Principles", "terms": ["Concepts", "Methods", "Rules"]}
                    ]
                },
                {
                    "title": "Applications", 
                    "categories": [
                        {"name": "Use Cases", "terms": ["Examples", "Implementation", "Usage"]},
                        {"name": "Benefits", "terms": ["Advantages", "Impact", "Value"]}
                    ]
                },
                {
                    "title": "Conclusion", 
                    "categories": [
                        {"name": "Summary", "terms": ["Findings", "Results", "Summary"]},
                        {"name": "Future Work", "terms": ["Directions", "Research", "Trends"]}
                    ]
                }
            ],
            "error": str(e)
        }
