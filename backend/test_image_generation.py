#!/usr/bin/env python3
"""
Test script for Hugging Face image generation API
"""

import requests
import base64
import os

# Configuration
API_KEY = "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"  # Your API key
# Try FLUX first, fallback to Stable Diffusion if needed
FLUX_MODEL_ID = 'black-forest-labs/FLUX.1-dev'  # Correct FLUX model ID
STABLE_DIFFUSION_MODEL_ID = 'runwayml/stable-diffusion-v1-5'  # Fallback model

def test_image_generation():
    """Test the Hugging Face image generation API"""
    
    print("🎨 Testing Hugging Face Image Generation API")
    print("=" * 50)
    print(f"🔑 API Key: {API_KEY[:8]}...{API_KEY[-4:]}")
    print(f"🤖 Primary Model: {FLUX_MODEL_ID}")
    print(f"🤖 Fallback Model: {STABLE_DIFFUSION_MODEL_ID}")
    print()
    
    # Test prompt
    test_prompt = "A futuristic classroom with holographic displays and students using VR headsets"
    print(f"📝 Test prompt: {test_prompt}")
    print()
    
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json',
    }
    
    payload = {
        'inputs': test_prompt,
        'parameters': {
            'guidance_scale': 7.5,
            'num_inference_steps': 50
        }
    }
    
    # Try FLUX model first, fallback to Stable Diffusion if needed
    models_to_try = [
        (FLUX_MODEL_ID, f'https://api-inference.huggingface.co/models/{FLUX_MODEL_ID}'),
        (STABLE_DIFFUSION_MODEL_ID, f'https://api-inference.huggingface.co/models/{STABLE_DIFFUSION_MODEL_ID}')
    ]
    
    response = None
    last_error = None
    
    for model_name, api_url in models_to_try:
        print(f"🤖 Trying model: {model_name}")
        print(f"🌐 URL: {api_url}")
        
        try:
            response = requests.post(api_url, headers=headers, json=payload, timeout=60)
            print(f"📥 Response status: {response.status_code}")
            
            if response.status_code == 200:
                print(f"✅ Success with model: {model_name}")
                break
            else:
                last_error = f'Model {model_name} failed: {response.status_code} - {response.text}'
                print(f"❌ {last_error}")
                
        except Exception as e:
            last_error = f'Model {model_name} error: {str(e)}'
            print(f"❌ {last_error}")
            continue
    
    if not response or response.status_code != 200:
        print(f"❌ All models failed. Last error: {last_error}")
        return
    
    # If we get here, we have a successful response
    print(f"📥 Response status: {response.status_code}")
    print(f"📊 Response headers: {dict(response.headers)}")
    
    # Save the image
    image_bytes = response.content
    filename = "test_generated_image.png"
    
    with open(filename, "wb") as f:
        f.write(image_bytes)
    
    print(f"✅ Success! Image saved as {filename}")
    print(f"📁 File size: {len(image_bytes):,} bytes ({len(image_bytes)/1024:.1f} KB)")
    
    # Verify file exists
    if os.path.exists(filename):
        print(f"✅ File verification: {filename} exists")
    else:
        print(f"❌ File verification failed: {filename} not found")

if __name__ == "__main__":
    test_image_generation()
