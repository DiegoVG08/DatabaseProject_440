from django.urls import path
from . import views

urlpatterns = [
    path('create-item/', views.create_item, name='create-item'),
    path('phasetwotest/', views.phasetwotest, name='phasetwotest'),
    path('get-items/', views.get_items, name='get-items'),
]