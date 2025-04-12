# import pandas as pd
# import numpy as np
# import matplotlib.pyplot as plt
# import seaborn as sb
# from flask import Flask, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from datetime import datetime
# from aws_bedrock_usage import get_agent_response
# from app import handle_prompt  # Імпортуємо handle_prompt із app.py
# import logging

# # Налаштування логування
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# app = Flask(__name__)

# # Підключення до PostgreSQL
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://zct:zct@localhost/ai_coach'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)

# # Модель для зберігання запитів і відповідей
# class AI_COACH(db.Model):
#     __tablename__ = 'ai_coach'

#     id = db.Column(db.Integer, primary_key=True)
#     request = db.Column(db.String(255), nullable=False)
#     response = db.Column(db.Text, nullable=False)
#     created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

#     def __repr__(self):
#         return f"<AI_COACH {self.id}: {self.request}>"

# # Створення таблиці
# with app.app_context():
#     db.create_all()

# @app.route('/', methods=['GET'])
# def home():
#     return "PostgreSQL is connected to Flask!"

# @app.route('/prompt', methods=['POST'])
# def handle_prompt_with_db():
#     # Викликаємо оригінальну функцію handle_prompt
#     response = handle_prompt()

#     # Оскільки handle_prompt повертає jsonify, витягуємо дані
#     response_data = response.get_json()
#     if 'error' in response_data:
#         return response  # Повертаємо помилку, якщо вона є

#     # Витягуємо prompt із запиту
#     data = request.get_json()
#     prompt = data.get('prompt')

#     # Витягуємо response_text із відповіді
#     response_text = response_data.get('response')

#     # Зберігаємо в базі даних
#     try:
#         ai_coach_entry = AI_COACH(request=prompt, response=response_text)
#         db.session.add(ai_coach_entry)
#         db.session.commit()
#         logger.info(f"Saved to database: request={prompt[:100]}..., response={response_text[:100]}...")
#     except Exception as e:
#         logger.error(f"Database error: {str(e)}")
#         return jsonify({'error': 'Failed to save to database.'}), 500

#     return response  # Повертаємо оригінальну відповідь
# if __name__ == '__main__':
#     app.run(debug=False, host='0.0.0.0', port=5001)