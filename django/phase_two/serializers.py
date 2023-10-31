from rest_framework import serializers
from .models import Item, Comment

class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ['title', 'description', 'price', 'id', 'categories', 'username', 'created_at']

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['item', 'username', 'created_at', 'rating', 'comment']