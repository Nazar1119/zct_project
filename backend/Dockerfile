FROM python:3.11-slim

WORKDIR /backend

COPY backend/requirements.txt .

RUN pip install --no-cache-dir -r backend/requirements.txt

COPY backend/ .

ENV PORT=8080


CMD ["python", "app.py"]