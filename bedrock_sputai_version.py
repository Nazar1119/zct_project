from aws_bedrock_usage import get_response

prompt = "What exercises should I do for my biceps?"  # Замените на любой текст, который хотите отправить модели

response = get_response(prompt)

print(response)
