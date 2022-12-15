from django.urls import path, include, re_path
from ForumApp.api_views import ForumHomeMainAPI, ForumThreadAPI, ForumMostViewedAPI, ForumAllThreadsAPI
from django.conf import settings
from django.conf.urls.static import static

# [\w]+ - all characters
urlpatterns = [
    re_path(r'^forum/all-threads/$', ForumAllThreadsAPI.as_view(), name='forum-all-questions'),
    re_path(r'^forum/home/$', ForumHomeMainAPI.as_view(), name='forum-home'),
    re_path(r'^forum/thread/(?P<id_to_search>\d+)/$', ForumThreadAPI.as_view(), name='forum-thread'),
    re_path(r'^forum/home/most-viewed/$', ForumMostViewedAPI.as_view(), name='forum-most-viewed'),
]