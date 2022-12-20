from django.urls import path, include, re_path
from ProfileApp.api_views import MyProfileAPI, ProfileAPI, MyToDoListAPI, CoordinatorStudentsAPI, NotificationsAPI, \
    CoursesAPI, InstructorCoursesAPI
from django.conf import settings
from django.conf.urls.static import static

# [\w]+ - all characters
urlpatterns = [
    re_path(r'^my-profile/$', MyProfileAPI.as_view(), name='my-profile'),
    re_path(r'^my-profile/todo-list$', MyToDoListAPI.as_view(), name='to-do-list'),
    re_path(r'^profile/(?P<id_to_search>\d+)/$', ProfileAPI.as_view(), name='profile'),
    re_path(r'^student-list/$', CoordinatorStudentsAPI.as_view(), name='student-list'),
    re_path(r'^notifications/$', NotificationsAPI.as_view(), name='notifications'),
    re_path(r'^courses/$', CoursesAPI.as_view(), name='courses'),
    re_path(r'^instructor-courses/$', InstructorCoursesAPI.as_view(), name='courses'),

]