from django.urls import path
from .views import PostView, GetPost, CreatePostView

urlpatterns = [
    path('posts', PostView.as_view()),
    path('get-post', GetPost.as_view()),
    path('create-post', CreatePostView.as_view())
]
