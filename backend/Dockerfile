FROM python:3.11-slim

WORKDIR /ai-coach/backend

COPY ai-coach/backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY ai-coach/backend/ .

CMD ["python", "app.py"]