#!/bin/bash

python manage.py migrate
# python manage.py runserver 0.0.0.0:8000
gunicorn traefikko.wsgi:application --bind 0.0.0.0:8000 --reload