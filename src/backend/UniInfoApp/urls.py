from django.urls import path, include, re_path
from UniInfoApp.api_views import UniInfoHomeAPI
from django.conf import settings
from django.conf.urls.static import static

# [\w]+ - all characters
urlpatterns = [
    re_path(r'^all-unis/$', UniInfoHomeAPI.as_view(), name='all-unis'),
]