from django.urls import path, include, re_path
from . import views
from backend import settings
from PlacementApp.api_views import GetStudents
from django.conf.urls.static import static
from rest_framework import routers
urlpatterns =[
path("placement",views.GetStudents,name="GetStudents"),
re_path(r'^placements/$', GetStudents.as_view(), name='placement')
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)