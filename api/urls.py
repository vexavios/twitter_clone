from django.urls import path
from .views import PostView, GetPost, CreatePostView, UserView, GetUser, LoginUser, RegisterUserView, UserLoggedIn, LogoutUser

urlpatterns = [
    # posts
    path('posts', PostView.as_view()),
    path('get-post', GetPost.as_view()),
    path('create-post', CreatePostView.as_view()),

    # users
    path('users', UserView.as_view()),
    path('get-user', GetUser.as_view()),
    path('login', LoginUser.as_view()),
    path('register', RegisterUserView.as_view()),
    path('user-logged-in', UserLoggedIn.as_view()),
    path('logout', LogoutUser.as_view())
]
