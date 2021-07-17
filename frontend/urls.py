from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('post/<str:postID>', index),
    path('profile/<str:userID>', index),
    path('login', index),
    path('register', index)
]
