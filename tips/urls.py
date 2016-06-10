# -*- coding: utf-8 -*-
from django.conf.urls import url
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    url(r'get_current_tip/?$', views.get_current_tip_of_day),
    url(r'', TemplateView.as_view(template_name="tips/base.html"), name='tips_root_url'),
]
