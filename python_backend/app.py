# from flask import Flask, request, jsonify
# from aws_bedrock_usage import get_agent_response

# app = Flask(__name__)

# @app.route('/', methods=['GET'])
# def hello():
#     return "Hello, use /prompt!"

# @app.route('/prompt', methods=['POST'])
# def handle_prompt():
#     try:
#         data = request.get_json(force=True)

#         if not data or 'prompt' not in data:
#             print("No prompt provided")
#             return jsonify({'error': 'The "prompt" field is required.'}), 400

#         prompt = data['prompt']
#         response = get_agent_response(prompt)

#         content = response['response_text']

#         return jsonify({'response': content})
#     except Exception as e:
#         import traceback
#         print("Error in /prompt:")
#         traceback.print_exc()
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001, debug=True)


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

    return jsonify({'response':(result['response_text'])})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
