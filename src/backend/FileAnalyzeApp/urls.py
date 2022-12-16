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

from django.urls import path
from . import views
from backend import settings
from django.conf.urls.static import static
urlpatterns =[
path("",views.Import_Excel_pandas,name="Import_Excel_pandas"),
path("pdffile",views.ReadAndWritePdf,name="ReadAndWritePdf"),
path('Import_Excel_pandas/', views.Import_Excel_pandas,name="Import_Excel_pandas"),
path('Import_excel',views.Import_excel,name="Import_excel"),
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)



#from django.contrib import admin
#from django.urls import path, include
#from django.conf import settings
#from django.conf.urls.static import static
#from FileAnalyzeApp import views

#app_name = "FileAnalyzeApp"

#urlpatterns = [
    #TODO: Will be deleted this line (Move to fileanalyzer app)
#    path('',include('import_excel_db.urls')
    #TODO: Will be deleted this line (Move to fileanalyzer app)
#]

#if settings.DEBUG:
#    urlpatterns += static(settings.MEDIA_URL,
#                          document_root=settings.MEDIA_ROOT)

