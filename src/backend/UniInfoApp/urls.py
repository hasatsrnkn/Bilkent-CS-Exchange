
from django.urls import path, include, re_path
from UniInfoApp.api_views import UniReviewsAPI

urlpatterns = [
    re_path(r'^university/(?P<id_to_search>\d+)/reviews/$', UniReviewsAPI.as_view(), name='uni-reviews'),
]