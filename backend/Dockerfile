FROM python:3.14.7-alpine3.24

WORKDIR /opt/backend 

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

ENV DATABASE_URL=postgresql://postgres:yourpassword@august_db:5432/august_db

ENTRYPOINT ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port",  "8001"]