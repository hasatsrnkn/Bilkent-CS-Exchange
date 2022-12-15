from django.urls import path
from . import views
from backend import settings
from django.conf.urls.static import static
urlpatterns =[
path("placement",views.GetStudents,name="GetStudents"),
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)