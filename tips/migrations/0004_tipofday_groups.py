# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-08-07 21:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0007_alter_validators_add_error_messages'),
        ('tips', '0003_auto_20160610_1537'),
    ]

    operations = [
        migrations.AddField(
            model_name='tipofday',
            name='groups',
            field=models.ManyToManyField(blank=True, related_name='tips', to='auth.Group'),
        ),
    ]
