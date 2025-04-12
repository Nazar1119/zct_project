# FROM python:3.11-slim

# WORKDIR /backend

# COPY requirements.txt .

# RUN pip install --no-cache-dir -r requirements.txt

# COPY . .

# ENV PORT=8080

# CMD ["python", "app.py"]

FROM python:3.11-slim

WORKDIR /backend

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PORT=8080

HEALTHCHECK --interval=30s --timeout=3s CMD curl --fail http://localhost:8080 || exit 1

CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"]
