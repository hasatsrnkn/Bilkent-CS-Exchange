
from django.urls import path, include, re_path
from UniInfoApp.api_views import UniReviewsAPI, PostReviewAPI

urlpatterns = [
    re_path(r'^university/(?P<id_to_search>\d+)/reviews/$', UniReviewsAPI.as_view(), name='uni-reviews'),
    re_path(r'^university/post-review/$', PostReviewAPI.as_view(), name='uni-add-review'),
]