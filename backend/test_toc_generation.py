#!/usr/bin/env python3
"""
Test script for TOC generation functionality
Tests the /generate-toc endpoint with sample content
"""

import requests
import json

# Test configuration
API_BASE_URL = 'http://localhost:5000'
TEST_ENDPOINT = f'{API_BASE_URL}/generate-toc'

# Sample test content - academic text about machine learning
SAMPLE_TEXT = """
Machine learning is a subset of artificial intelligence that focuses on the development of algorithms and statistical models that enable computer systems to improve their performance on a specific task through experience. The field has evolved significantly over the past few decades, with roots in statistics, computer science, and cognitive psychology.

Key concepts in machine learning include supervised learning, where algorithms learn from labeled training data to make predictions on new, unseen data. Unsupervised learning involves finding patterns in data without explicit labels. Reinforcement learning is a paradigm where agents learn to make decisions by receiving rewards or penalties for their actions.

Historical development of machine learning can be traced back to the 1950s with early work on neural networks and pattern recognition. The field gained momentum in the 1980s with the development of backpropagation algorithms and support vector machines. The modern era began in the 2000s with the advent of big data and increased computational power.

Current applications of machine learning are widespread across industries. In healthcare, ML algorithms assist in medical diagnosis and drug discovery. In finance, they power fraud detection and algorithmic trading. Transportation benefits from autonomous vehicles and route optimization. Social media platforms use ML for content recommendation and sentiment analysis.

Case studies demonstrate the practical impact of machine learning. Netflix's recommendation system uses collaborative filtering to suggest content to users. Google's search algorithm employs machine learning to rank web pages. Tesla's autopilot system combines computer vision and deep learning for autonomous driving capabilities.

Future implications of machine learning include potential advances in artificial general intelligence, improved human-computer interaction, and solutions to complex global challenges like climate change and disease prevention. However, ethical considerations around bias, privacy, and job displacement must be carefully addressed.
"""

def test_toc_generation():
    """Test the TOC generation endpoint"""
    print("🧪 Testing TOC Generation Endpoint")
    print("=" * 50)
    
    # Prepare test data
    test_data = {
        'text': SAMPLE_TEXT,
        'theme': 'Academic'
    }
    
    try:
        print(f"📡 Sending request to: {TEST_ENDPOINT}")
        print(f"📄 Text length: {len(SAMPLE_TEXT)} characters")
        print(f"🎨 Theme: {test_data['theme']}")
        
        # Make API request
        response = requests.post(
            TEST_ENDPOINT,
            json=test_data,
            headers={'Content-Type': 'application/json'},
            timeout=30
        )
        
        print(f"\n📥 Response Status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ TOC Generation Successful!")
            print(f"📋 Generated {len(result.get('toc_items', []))} TOC items")
            print(f"📝 Presentation Title: {result.get('presentation_title', 'N/A')}")
            
            print("\n📑 Generated TOC Items:")
            for i, item in enumerate(result.get('toc_items', []), 1):
                print(f"  {i}. {item.get('title', 'N/A')}")
            
            return True
            
        else:
            print(f"❌ Request failed: {response.status_code}")
            try:
                error_data = response.json()
                print(f"Error: {error_data.get('error', 'Unknown error')}")
            except:
                print(f"Error response: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Make sure the Flask backend is running on localhost:5000")
        return False
    except requests.exceptions.Timeout:
        print("❌ Request Timeout: The API took too long to respond")
        return False
    except Exception as e:
        print(f"❌ Unexpected Error: {str(e)}")
        return False

def test_empty_content():
    """Test with empty content to verify error handling"""
    print("\n🧪 Testing Empty Content Handling")
    print("=" * 50)
    
    test_data = {
        'text': '',
        'theme': 'Academic'
    }
    
    try:
        response = requests.post(
            TEST_ENDPOINT,
            json=test_data,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        if response.status_code == 400:
            print("✅ Empty content properly rejected (400 status)")
            return True
        else:
            print(f"⚠️ Unexpected status for empty content: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing empty content: {str(e)}")
        return False

def main():
    """Run all TOC generation tests"""
    print("🚀 Starting TOC Generation Tests")
    print("=" * 60)
    
    # Test 1: Normal TOC generation
    test1_passed = test_toc_generation()
    
    # Test 2: Empty content handling
    test2_passed = test_empty_content()
    
    # Summary
    print("\n📊 Test Summary")
    print("=" * 30)
    print(f"TOC Generation: {'✅ PASS' if test1_passed else '❌ FAIL'}")
    print(f"Empty Content Handling: {'✅ PASS' if test2_passed else '❌ FAIL'}")
    
    if test1_passed and test2_passed:
        print("\n🎉 All tests passed! TOC generation is working correctly.")
    else:
        print("\n⚠️ Some tests failed. Check the backend implementation.")

if __name__ == '__main__':
    main()
