FROM python:3.14.7-alpine3.24

WORKDIR /opt/frontend

COPY . .

ENTRYPOINT ["python", "-m", "http.server", "3000", "--bind", "0.0.0.0"]