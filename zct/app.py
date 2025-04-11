# from flask import Flask, request, jsonify
# from aws_bedrock_usage import get_response

# app = Flask(__name__)

# @app.route('/', methods=['GET'])
# def hello():
#     return "Hello, use /prompt!"

# @app.route('/prompt', methods=['POST'])
# def handle_prompt():
#     data = request.get_json()

#     if not data or 'prompt' not in data:
#         return jsonify({'error': 'The "prompt" field is required.'}), 400

#     prompt = data['prompt']
#     response = get_response(prompt)

#     return jsonify({'response': response['output']['message']['content'][0]['text']})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from aws_bedrock_usage import get_agent_response
import logging
import os
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class AI_COACH(db.Model):
    __tablename__ = 'ai_coach'

    id = db.Column(db.Integer, primary_key=True)
    request = db.Column(db.String(255), nullable=False)
    response = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"<AI_COACH {self.id}: {self.request}>"

with app.app_context():
    db.create_all()

@app.route('/prompt', methods=['POST'])
def handle_prompt():
    data = request.get_json()

    if not data or 'prompt' not in data:
        return jsonify({'error': 'The "prompt" field is required.'}), 400

    prompt = data['prompt']
    result = get_agent_response(prompt)

    if 'error' in result:
        logger.error(f"Agent error: {result['error']}")
        return jsonify({'error': result['error']}), 500

    question = result['question']
    response_text = result['response_text']

    try:
        ai_coach_entry = AI_COACH(request=question, response=response_text)
        db.session.add(ai_coach_entry)
        db.session.commit()
        logger.info(f"Saved to database: request={question[:100]}..., response={response_text[:100]}...")
    except Exception as e:
        logger.error(f"Database error: {str(e)}")
        return jsonify({'error': 'Failed to save to database.'}), 500

    return jsonify({'response': result["response_text"]})

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5001)