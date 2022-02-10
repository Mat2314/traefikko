from django.db import models


# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=128)
    preview = models.CharField(max_length=500)
    price = models.IntegerField()

    def __str__(self):
        return f"{self.title}"
