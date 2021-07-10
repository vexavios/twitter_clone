# Generated by Django 3.2.5 on 2021-07-10 06:17

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.CharField(default=api.models.generate_unique_ID, max_length=8, primary_key=True, serialize=False, unique=True)),
                ('author', models.CharField(max_length=50)),
                ('post_content', models.TextField(max_length=140)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
