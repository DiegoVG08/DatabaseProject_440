from django.db import models
from django.contrib.postgres.fields import ArrayField

class Item(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    categories = ArrayField(models.CharField(max_length=100), blank=True)  # This will be a comma-separated string
    price = models.DecimalField(max_digits=10, decimal_places=2)
    id = models.AutoField(primary_key=True)

    def categories_list(self):
        return [cat.strip() for cat in self.categories.split(',')]
