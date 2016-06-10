# -*- coding: utf-8 -*-
from django.db import models
from django.conf import settings
from django.utils.translation import ugettext_lazy as _


class TipOfDay(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField(
        help_text=_(
            'The content will be compiled using <a href="http://en.wikipedia.org/wiki/Markdown">'
            'Markdown</a>.'
        )
    )
    active = models.BooleanField(default=True)
    seen_by = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='seen_tips', blank=True)
