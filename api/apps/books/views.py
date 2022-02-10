from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Book


class BooksEndpoint(APIView):
    """
        Manage the books - list, add, remove ...
    """
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        """List all the books in the database"""
        page = self.request.query_params.get('page')
        page_size = self.request.query_params.get('pageSize')

        books = list(Book.objects.all().values())

        return Response(books)

    def post(self, request):
        """Add a new book"""
        # title = request.data['title']
        # preview = request.data['preview']
        # price = request.data['price']

        Book.objects.create(**request.data)

        return Response({"message": "Added a new book"})

    def delete(self, request):
        """Remove book from database by given id"""
        book_id = self.request.query_params.get('id')
        Book.objects.get(id=book_id).delete()
        return Response({"message": "Book deleted successfully"})
