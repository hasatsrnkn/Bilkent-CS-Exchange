from django.urls import path, include, re_path
from ForumApp.api_views import ForumHomeMainAPI, ForumThreadAPI, ForumMostViewedAPI
from django.conf import settings
from django.conf.urls.static import static
from dbint.api_views import ForumAllThreadsAPI, AllUnisAPI, AllStudentsAPI, AllUsersAPI

# [\w]+ - all characters
urlpatterns = [
    re_path(r'^all-threads/$', ForumAllThreadsAPI.as_view(), name='all-questions'),
    re_path(r'^all-unis/$', AllUnisAPI.as_view(), name='all-unis'),
    re_path(r'^all-(?P<user_type>.+)/$', AllUsersAPI.as_view(), name='all-users'),
]