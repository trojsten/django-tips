"""example URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.conf import settings
from django.contrib import admin
from django.views.generic import TemplateView
from django.contrib.auth.views import login

admin.autodiscover()

app_name = 'example'

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^accounts/login/$', login, {
        'template_name': 'admin/login.html'
    }),
    url('^accounts/', include('django.contrib.auth.urls')),
    url(r'tips/', include('tips.urls')),
    url(r'^$', TemplateView.as_view(template_name="tips/base.html")),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns.append(url(r'^__debug__/', include(debug_toolbar.urls)))
