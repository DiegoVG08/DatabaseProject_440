from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import ItemSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Item
from django.utils import timezone
from datetime import datetime, timedelta

def count_items_today(user):
    now = timezone.now()
    start_of_day = datetime(now.year, now.month, now.day)
    end_of_day = start_of_day + timedelta(days=1)
    return Item.objects.filter(username=user.username, created_at__range=(start_of_day, end_of_day)).count()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_item(request):
    print(request.data)
    # print(request.user)
    user = request.user
    if not user.is_authenticated:
        return Response({"message": "You are not authorized to create an item"}, status=status.HTTP_401_UNAUTHORIZED)
    
    item_count_today = count_items_today(user)
    if item_count_today >= 3:
        print("item count today ", item_count_today, user.username)
        return Response({"message": "You can only create up to 3 items per day."}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'POST':
        serializer = ItemSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Item created successfully"}, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def phasetwotest(request):
    print(request.user)
    return Response({"message": "Phase two test successful"}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_items(request):
    print(request.user)
    print(request.data.get('entry'))
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)