from django.db import models
import string
import random

# Create your models here.


def generate_unique_post_ID():
    length = 6

    while True:
        id = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Post.objects.filter(id=id).count() == 0:
            break

    return id


def generate_unique_user_ID():
    length = 6

    while True:
        id = ''.join(random.choices(string.ascii_uppercase, k=length))
        if User.objects.filter(id=id).count() == 0:
            break

    return id


class Post(models.Model):
    id = models.CharField(
        primary_key=True, max_length=8, default=generate_unique_post_ID, unique=True)
    author = models.CharField(max_length=50)
    post_content = models.TextField(max_length=140)
    created_at = models.DateTimeField(auto_now_add=True)


class User(models.Model):
    id = models.CharField(
        primary_key=True, max_length=8, default=generate_unique_user_ID, unique=True)
    username = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
