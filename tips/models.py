# -*- coding: utf-8 -*-
from django.conf import settings
from django.contrib.auth.models import Group
from django.contrib.sites.models import Site
from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from django.utils.html import mark_safe
from django.utils.translation import ugettext_lazy as _
from markdown import markdown


@python_2_unicode_compatible
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
    groups = models.ManyToManyField(Group, related_name='tips', blank=True,
                                    help_text='Only users in these groups will see this tip. '
                                              'If no group is selected, users in all groups '
                                              'can see this tip.')
    for_staff = models.BooleanField(default=True, help_text='This tip is intended for staff')
    for_nonstaff = models.BooleanField(default=False,
                                       help_text='This tip is intended for non_staff users')
    sites = models.ManyToManyField(Site, blank=True,
                                   help_text='Sites to display this tip in. If none is selected, '
                                             'tip will be displayed on all Sites.')

    class Meta:
        verbose_name = 'tip'
        verbose_name_plural = 'tips'

    def __str__(self):
        return self.title

    def rendered_text(self):
        return mark_safe(markdown(self.text, **getattr(
            settings, 'TIPS_MARKDOWN_KWARGS', {}
        )))
