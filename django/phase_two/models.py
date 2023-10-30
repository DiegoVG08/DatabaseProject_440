from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User
from django.utils import timezone

class Item(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    categories = ArrayField(models.CharField(max_length=100), blank=True)  # This will be a comma-separated string
    price = models.DecimalField(max_digits=10, decimal_places=2)
    username = models.CharField(max_length=255, default='')

    print("usrname ", username)

    created_at = models.DateTimeField(default=timezone.now)

    def categories_list(self):
        return [cat.strip() for cat in self.categories.split(',')]
