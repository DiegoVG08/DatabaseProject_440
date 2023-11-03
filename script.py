import requests
import json
import random

API_KEY = "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"
API_ENDPOINT = "https://api.openai.com/v1/chat/completions"

def get_completion(messages, model="gpt-4-0613", temperature=1):

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}",
    }

    data = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
    }

    response = requests.post(API_ENDPOINT, headers=headers, data=json.dumps(data))

    if response.status_code == 200:      
        return response.json()["choices"][0]["message"]["content"]
    else:
        raise Exception(f"Error {response.status_code}: {response.text}")
    
def post_to_endpoint(data):
    endpoint = "http://127.0.0.1:8000/create-item-test/"
    headers = {"Content-Type": "application/json"}
    response = requests.post(endpoint, headers=headers, data=json.dumps(data))
    if response.status_code == 201:
        return response.text
    else:
        raise Exception(f"Error {response.status_code}: {response.text}")


categories = ["garden", "pets", "beauty", "health", "baby"]

for category in categories:
    print(f"Generating data for {category} category")
    for _ in range(5):
        random_username = f"user000{random.randint(1, 5)}"
        prompt = f"Generate one JSON formatted data for a 'random category': {category}. The data should be formatted like this: 'title': indicating the product's name,  'description': 'breifly explaining its features', 'price': as a float, 'categories': list of categories it belongs to including the chosen random category, and a 'username': '{random_username}'."
        
        message = [{"role": "user", "content": prompt}]
        response_text = get_completion(message)
        print(response_text)
        
        data_to_post = json.loads(response_text)
        response_from_endpoint = post_to_endpoint(data_to_post)
        print(response_from_endpoint)
