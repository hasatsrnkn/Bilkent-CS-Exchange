from django.urls import path, include, re_path
from ForumApp.api_views import ForumHomeMain, ForumQuestion
from django.conf import settings
from django.conf.urls.static import static

# [\w]+ - all characters
urlpatterns = [
    re_path(r'^forum/home/$', ForumHomeMain.as_view(), name='forum-home'),
    re_path(r'^forum/home/(?P<id_to_search>\d+)/$', ForumQuestion.as_view(), name='forum-most-viewed'),

]