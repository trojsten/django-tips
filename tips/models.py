# -*- coding: utf-8 -*-
from django.conf import settings
from django.db import models
from django.utils.html import mark_safe
from django.utils.translation import ugettext_lazy as _
from markdown import markdown


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

    class Meta:
        verbose_name = 'tip'
        verbose_name_plural = 'tips'

    def __str__(self):
        return self.title

    def rendered_text(self):
        return mark_safe(markdown(self.text, **getattr(
            settings, 'TIPS_MARKDOWN_KWARGS', {}
        )))
