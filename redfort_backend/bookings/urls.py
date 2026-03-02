from rest_framework_simplejwt.views import TokenObtainPairView
from django.urls import path, include
urlpatterns = [
    path('login/', TokenObtainPairView.as_view())
]
