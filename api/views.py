from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.utils import serializer_helpers
from .serializers import PostSerializer, CreatePostSerializer
from .models import Post
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


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
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            author = serializer.data.get('author')
            post_content = serializer.data.get('post_content')
            created_at = serializer.data.get('created_at')

            post = Post(author=author, post_content=post_content,
                        created_at=created_at)
            post.save()

            return Response(PostSerializer(post).data, status=status.HTTP_201_CREATED)
