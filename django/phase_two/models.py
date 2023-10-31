from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User
from django.utils import timezone

class Item(models.Model):
    username = models.CharField(max_length=255, default='')
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    categories = ArrayField(models.CharField(max_length=100), blank=True)  # This will be a comma-separated string

    created_at = models.DateTimeField(default=timezone.now)

    def categories_list(self):
        return [cat.strip() for cat in self.categories.split(',')]
    
class Comment(models.Model):
    username = models.CharField(max_length=255, default='')
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    rating = models.CharField(max_length=255, default='')
    comment = models.CharField(max_length=255, default='')
    created_at = models.DateTimeField(default=timezone.now)
