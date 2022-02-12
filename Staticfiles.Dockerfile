# syntax=docker/dockerfile:1
### STAGE 1: Build ###
FROM python:3 AS build

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /code

COPY api/requirements.txt /code/

RUN pip install -r requirements.txt

COPY api /code/
RUN python manage.py collectstatic --noinput

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx/staticfiles.nginx.conf /etc/nginx/nginx.conf
COPY --from=build /code/static /django/staticfiles
