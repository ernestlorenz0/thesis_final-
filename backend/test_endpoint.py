#!/usr/bin/env python3
"""
Simple test for the backend /generate-image endpoint
"""

import requests
import json

def test_backend_endpoint():
    """Test the backend endpoint"""
    
    print("🧪 Testing Backend Endpoint")
    print("=" * 40)
    
    # Test data
    test_data = {
        "prompt": "A simple test image of a cat"
    }
    
    try:
        print("📤 Sending request to backend...")
        print(f"📋 Data: {test_data}")
        
        response = requests.post(
            'http://localhost:5000/generate-image',
            json=test_data,
            timeout=120  # 2 minutes for image generation
        )
        
        print(f"📥 Response status: {response.status_code}")
        print(f"📊 Response headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            data = response.json()
            if 'image_base64' in data:
                print("✅ Success! Received image data")
                print(f"📁 Image size: {len(data['image_base64'])} characters")
                print(f"📊 Base64 length: {len(data['image_base64'])}")
            else:
                print("❌ No image data in response")
                print(f"📄 Response keys: {list(data.keys())}")
        else:
            print(f"❌ Request failed: {response.status_code}")
            print(f"📄 Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection failed - make sure the backend is running on localhost:5000")
    except Exception as e:
        print(f"❌ Error: {str(e)}")

if __name__ == "__main__":
    test_backend_endpoint()
