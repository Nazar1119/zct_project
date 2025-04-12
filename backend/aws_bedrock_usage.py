# import boto3
# import json

# def get_response(prompt):
  
#   bedrock_runtime = boto3.client("bedrock-runtime", region_name="us-east-2")

#   kwargs = {
#     "modelId": "arn:aws:bedrock:us-east-2:668610423384:inference-profile/us.amazon.nova-micro-v1:0",
#     "contentType": "application/json",
#     "accept": "application/json",
#     "body": json.dumps({
#       "inferenceConfig": {
#         "max_new_tokens": 1000
#       },
#       "messages": [
#         {
#           "role": "user",
#           "content": [
#             {
#               "text": prompt
#             }
#           ]
#         }
#       ]
#     })
#   }

#   response = bedrock_runtime.invoke_model(**kwargs)

#   body = json.loads(response['body'].read())
  
#   return body

import boto3
from botocore.exceptions import ClientError
import logging

# Ініціалізація логера
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_agent_response(prompt):
    try:
        bedrock_agent_runtime = boto3.client("bedrock-agent-runtime", region_name="us-east-2")

        response = bedrock_agent_runtime.invoke_agent(
            agentId="CFIV0UBXCN",             # Замінити на свій
            agentAliasId="U305PCUBYC",        # Замінити на свій
            sessionId="zct_id1",
            inputText=prompt
        )

        event_stream = response.get("completion")
        completion = ""

        for event in event_stream:
            if "chunk" in event:
                chunk = event["chunk"]
                completion += chunk["bytes"].decode("utf-8")

        return {
            "question" : prompt, 
            "response_text": completion
        }

    except ClientError as e:
        logger.error(f"Помилка при виклику агента: {e}")
        return {
            "error": str(e)
        }