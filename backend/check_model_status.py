#!/usr/bin/env python3
"""
Check the status of the FLUX model on Hugging Face
"""

import requests
import json

# Configuration
API_KEY = "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"
MODEL_ID = 'black-forest-labs/FLUX.1-dev'
API_URL = f'https://api-inference.huggingface.co/models/{MODEL_ID}'

def check_model_status():
    """Check if the model is available and ready"""
    
    print("🔍 Checking FLUX Model Status")
    print("=" * 40)
    print(f"🤖 Model: {MODEL_ID}")
    print(f"🌐 URL: {API_URL}")
    print()
    
    headers = {
        'Authorization': f'Bearer {API_KEY}',
    }
    
    try:
        # First, check if the model exists and its status
        print("📡 Checking model status...")
        response = requests.get(API_URL, headers=headers)
        
        print(f"📥 Status response: {response.status_code}")
        
        if response.status_code == 200:
            model_info = response.json()
            print(f"✅ Model found!")
            print(f"📊 Model info: {json.dumps(model_info, indent=2)}")
            
            # Check if model is ready for inference
            if 'pipeline_tag' in model_info:
                print(f"🎯 Pipeline: {model_info['pipeline_tag']}")
            
            if 'tags' in model_info:
                print(f"🏷️ Tags: {model_info['tags']}")
                
        elif response.status_code == 404:
            print("❌ Model not found - check the model ID")
        else:
            print(f"⚠️ Unexpected status: {response.status_code}")
            print(f"📄 Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Error checking model: {str(e)}")

def test_simple_inference():
    """Test a simple inference request"""
    
    print("\n🧪 Testing Simple Inference")
    print("=" * 40)
    
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json',
    }
    
    payload = {
        'inputs': 'A simple test image'
    }
    
    try:
        print("📤 Sending test inference request...")
        response = requests.post(API_URL, headers=headers, json=payload, timeout=30)
        
        print(f"📥 Response status: {response.status_code}")
        print(f"📊 Content-Type: {response.headers.get('content-type', 'unknown')}")
        
        if response.status_code == 200:
            print("✅ Inference successful!")
            content_type = response.headers.get('content-type', '')
            if 'image' in content_type:
                print("🖼️ Received image data")
            elif 'json' in content_type:
                print("📄 Received JSON response")
                try:
                    data = response.json()
                    print(f"📋 Response keys: {list(data.keys())}")
                except:
                    print("❌ Failed to parse JSON")
            else:
                print(f"📄 Raw response: {response.text[:100]}...")
        else:
            print(f"❌ Inference failed: {response.status_code}")
            print(f"📄 Error: {response.text}")
            
    except Exception as e:
        print(f"❌ Error during inference: {str(e)}")

if __name__ == "__main__":
    check_model_status()
    test_simple_inference()
