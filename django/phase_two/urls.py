from django.urls import path
from . import views

urlpatterns = [
    path('create-item/', views.create_item, name='create-item'),
    path('phasetwotest/', views.phasetwotest, name='phasetwotest'),
    path('get-items/', views.get_items, name='get-items'),
    path('create-comment/', views.create_comment, name='create-comment'),
    path('create-item-test/', views.create_item_test, name='create-item-test'),
]