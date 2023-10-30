from rest_framework import serializers
from .models import Item

class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ['title', 'description', 'price', 'id', 'categories', 'username', 'created_at']

class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ['item_id', 'username', 'created_at', 'rating', 'comment']