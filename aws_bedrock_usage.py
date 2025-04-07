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
            agentAliasId="7DWVQC9SB3",        # Замінити на свій
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
            "response_text": completion
        }

    except ClientError as e:
        logger.error(f"Помилка при виклику агента: {e}")
        return {
            "error": str(e)
        }
