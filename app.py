from flask import Flask, request, jsonify
from aws_bedrock_usage import get_agent_response

app = Flask(__name__)

@app.route('/prompt', methods=['POST'])
def handle_prompt():
    data = request.get_json()

    if not data or 'prompt' not in data:
        return jsonify({'error': 'The "prompt" field is required.'}), 400

    prompt = data['prompt']
    result = get_agent_response(prompt)

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
