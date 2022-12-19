"""src URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include, re_path
from . import views
from backend import settings
from FileAnalyzeApp.api_views import UploadFileAPI, DownloadFileAPI
from django.conf.urls.static import static
from rest_framework import routers

# router = routers.DefaultRouter()
# router.register(r'upload', UploadViewSet, basename="upload")
from .api_views import ReadAndWritePdf

urlpatterns = [
    re_path(r'^upload-file/$', UploadFileAPI.as_view(), name='files'),
    re_path(r'^download-file/(?P<file_name>.+)/$', DownloadFileAPI.as_view(), name='download'),

    # path("",views.Import_Excel_pandas,name="Import_Excel_pandas"),
    path("pdffile/", ReadAndWritePdf.as_view(), name="ReadAndWritePdf"),
    path('upload-excel/', views.Import_Excel_pandas.as_view(), name="Import_Excel_pandas"),
    path('Import_excel', views.Import_excel, name="Import_excel"),
    # path("",views.Import_Excel_pandas,name="Import_Excel_pandas"),
    # path('', include(router.urls)),
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# from django.contrib import admin
# from django.urls import path, include
# from django.conf import settings
# from django.conf.urls.static import static
# from FileAnalyzeApp import views

# app_name = "FileAnalyzeApp"

# urlpatterns = [
# TODO: Will be deleted this line (Move to fileanalyzer app)
#    path('',include('import_excel_db.urls')
# TODO: Will be deleted this line (Move to fileanalyzer app)
# ]

# if settings.DEBUG:
#    urlpatterns += static(settings.MEDIA_URL,
#                          document_root=settings.MEDIA_ROOT)
