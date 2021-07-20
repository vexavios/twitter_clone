from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.utils import serializer_helpers
from .serializers import PostSerializer, CreatePostSerializer, UserSerializer, LoginUserSerializer, RegisterUserSerializer
from .models import Post, User
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.contrib.auth.hashers import check_password, make_password

# Create your views here.


# POSTS


class PostView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class GetPost(APIView):
    serializer_class = PostSerializer
    lookup_url_kwarg = 'id'

    def get(self, request, format=None):
        id = request.GET.get(self.lookup_url_kwarg)

        if id != None:
            post = Post.objects.filter(id=id)
            if len(post) > 0:
                data = PostSerializer(post[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Post Not Found': 'Invalid Post ID.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'ID parameter not found in request.'}, status=status.HTTP_400_BAD_REQUEST)


class CreatePostView(APIView):
    serializer_class = CreatePostSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            author = serializer.data.get('author')
            post_content = serializer.data.get('post_content')
            created_at = serializer.data.get('created_at')

            post = Post(author=author, post_content=post_content,
                        created_at=created_at)
            post.save()

            return Response(PostSerializer(post).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


# USERS


class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GetUser(APIView):
    serializer_class = UserSerializer
    lookup_url_kwarg = 'id'

    def get(self, request, format=None):
        id = request.GET.get(self.lookup_url_kwarg)

        if id != None:
            user = User.objects.filter(id=id)
            if len(user) > 0:
                data = UserSerializer(user[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Post Not Found': 'Invalid Post ID.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'ID parameter not found in request.'}, status=status.HTTP_400_BAD_REQUEST)


class LoginUser(APIView):
    serializer_class = LoginUserSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            username = serializer.data.get('username')
            password = serializer.data.get('password')

            # make sure user exists in database
            users = User.objects.filter(username=username)

            if users.count() > 0:
                # make sure password is correct
                if check_password(password, users.first().password) == True:
                    self.request.session['userID'] = users.first().id

                    return Response(UserSerializer(users.first()).data, status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class RegisterUserView(APIView):
    serializer_class = RegisterUserSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            username = serializer.data.get('username')
            email = serializer.data.get('email')
            password = make_password(serializer.data.get('password'))
            created_at = serializer.data.get('created_at')

            # make sure username does not already exist
            if User.objects.filter(username=username).count() == 0:
                user = User(username=username, email=email,
                            password=password, created_at=created_at)
                user.save()

                return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class UserLoggedIn(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        data = {
            'id': self.request.session.get('userID')
        }

        return JsonResponse(data, status=status.HTTP_200_OK)


class LogoutUser(APIView):
    def post(self, request, format=None):
        if 'userID' in self.request.session:
            self.request.session.pop('userID')

            return Response({'Message': 'Success'}, status=status.HTTP_200_OK)

        return Response({'Message': 'Failure'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
