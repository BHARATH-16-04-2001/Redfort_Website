from django.urls import path
from .views import RegisterView, login_view

urlpatterns = [
    path('signup/', RegisterView.as_view(), name="signup"),
    path("login/", login_view, name="login"),
]