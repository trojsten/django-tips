# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2017-01-24 14:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sites', '0002_alter_domain_unique'),
        ('tips', '0004_tipofday_groups'),
    ]

    operations = [
        migrations.AddField(
            model_name='tipofday',
            name='for_nonstaff',
            field=models.BooleanField(default=False, help_text=b'This tip is intended for non_staff users'),
        ),
        migrations.AddField(
            model_name='tipofday',
            name='for_staff',
            field=models.BooleanField(default=True, help_text=b'This tip is intended for staff'),
        ),
        migrations.AddField(
            model_name='tipofday',
            name='sites',
            field=models.ManyToManyField(blank=True, to='sites.Site'),
        ),
    ]
