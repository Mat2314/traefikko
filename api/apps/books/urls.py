from django.urls import include, path
from rest_framework import routers
from . import views

urlpatterns = [
    path('all/', views.BooksEndpoint.as_view(), name="books")
]