from aws_bedrock_usage import get_response

prompt = "What exercises should I do for my biceps?"
response = get_response(prompt)
print(response)
