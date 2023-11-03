from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import ItemSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Item, Comment
from django.utils import timezone
from datetime import datetime, timedelta
from django.db import connection

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
    
    # Getting 'entry' from request query parameters
    entry = request.GET.get('entry', None)
    
    # If 'entry' is present and not empty, filter by it, otherwise return all
    if entry:
        items = Item.objects.filter(categories__contains=[entry.upper()])
        print(items)
    else:
        items = Item.objects.all()

    
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_comment(request):
    
    print(request.data)

    if not request.user.is_authenticated:
        return Response({"message": "You are not authorized to create a comment"}, status=status.HTTP_401_UNAUTHORIZED)
    
    if request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            
            return Response({"message": "Comment created successfully"}, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "Comment created successfully"}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def create_item_test(request):
    if request.method == 'POST':
        serializer = ItemSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Item created successfully"}, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
def drop_table(table_name):
    try:
        with connection.cursor() as cursor:
            cursor.execute(f"DROP TABLE IF EXISTS {table_name} CASCADE")
    except Exception as e:
        print(f"Error occurred: {e}")
    finally:
        connection.close()

def create_tables():
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS phase_two_item (
                    id serial PRIMARY KEY,
                    username varchar(255) DEFAULT '',
                    title varchar(255),
                    description text,
                    price decimal(10,2),
                    categories text[],
                    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
                )
            """)
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS phase_two_comment (
                    id serial PRIMARY KEY,
                    username varchar(255) DEFAULT '',
                    item_id integer REFERENCES phase_two_item(id) ON DELETE CASCADE,
                    rating varchar(255) DEFAULT '',
                    comment varchar(255) DEFAULT '',
                    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
                )
            """)
    except Exception as e:
        print(f"Error occurred: {e}")
    finally:
        connection.close()
    
@api_view(['POST'])
def init_db(request):

    print(request)

    drop_table("phase_two_item")
    drop_table("phase_two_comment")

    create_tables()

    return Response({"message": "Database initialized successfully"}, status=status.HTTP_201_CREATED)