import requests

url = "http://127.0.0.1:5000/prompt"
data = {"prompt": "How do I build up my biceps?"}

response = requests.post(url, json=data)
print(response.json())
print("Status code:", response.status_code)
print("Raw text:", response.text)