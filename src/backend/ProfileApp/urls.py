from django.urls import path, include, re_path
from ProfileApp.api_views import MyProfileAPI, ProfileAPI
from django.conf import settings
from django.conf.urls.static import static

# [\w]+ - all characters
urlpatterns = [
    re_path(r'^my-profile/student/$', MyProfileAPI.as_view(), name='profile'),
    re_path(r'^profile/(?P<id_to_search>\d+)/$', ProfileAPI.as_view(), name='profile'),
]