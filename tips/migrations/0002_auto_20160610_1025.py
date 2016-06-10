# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-06-10 10:25
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tips', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tipofday',
            name='active',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='tipofday',
            name='seen_by',
            field=models.ManyToManyField(blank=True, related_name='seen_tips', to=settings.AUTH_USER_MODEL),
        ),
    ]
