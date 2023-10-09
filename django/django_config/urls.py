
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from userauth import views
from django.utils.http import urlsafe_base64_decode
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from django.utils.encoding import force_str
from django.contrib.auth.tokens import default_token_generator
        
urlpatterns = [
    path('admin/', admin.site.urls),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('check-auth/', views.check_auth, name='check-auth'),
    path('get-account-data/', views.get_account_data, name='get-account-data')
]
