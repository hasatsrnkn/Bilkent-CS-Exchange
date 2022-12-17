from django.urls import path, include, re_path
from AnnouncementApp.api_views import AnnouncementHomeAPI, MakeAnnouncementAPI
from django.conf import settings
from django.conf.urls.static import static

# [\w]+ - all characters
urlpatterns = [
    re_path(r'^announcements/$', AnnouncementHomeAPI.as_view(), name='announcements'),
    re_path(r'^announcements/make-announcement/$', MakeAnnouncementAPI.as_view(), name='make-announcement'),

]