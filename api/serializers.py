from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'author', 'post_content', 'created_at')


class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('author', 'post_content', 'created_at')
