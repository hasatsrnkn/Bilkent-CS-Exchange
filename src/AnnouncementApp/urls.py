from django.urls import path, include, re_path
from AnnouncementApp.api_views import AnnouncementHome
from django.conf import settings
from django.conf.urls.static import static

# [\w]+ - all characters
urlpatterns = [
    re_path(r'^announcements/$', AnnouncementHome.as_view(), name='announcements'),
]