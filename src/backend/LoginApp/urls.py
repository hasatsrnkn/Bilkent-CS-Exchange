from django.urls import path, include, re_path
from ForumApp.api_views import ForumHomeMainAPI, ForumThreadAPI, ForumMostViewedAPI, ForumAllThreadsAPI
from django.conf import settings
from django.conf.urls.static import static

# [\w]+ - all characters
from LoginApp.api_views import Login

urlpatterns = [
    re_path(r'^login/$', Login.as_view(), name='login'),
]