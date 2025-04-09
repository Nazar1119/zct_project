import boto3
import json

def get_response(prompt):
  
  bedrock_runtime = boto3.client("bedrock-runtime", region_name="us-east-2")

  kwargs = {
    "modelId": "arn:aws:bedrock:us-east-2:668610423384:inference-profile/us.amazon.nova-pro-v1:0",
    "contentType": "application/json",
    "accept": "application/json",
    "body": json.dumps({
      "inferenceConfig": {
        "max_new_tokens": 500
      },
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "text": prompt
            }
          ]
        }
      ]
    })
  }

  response = bedrock_runtime.invoke_model(**kwargs)

  body = json.loads(response['body'].read())
  
  return body