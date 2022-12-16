from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from knox.views import LogoutView, LogoutAllView
# [\w]+ - all characters
from LoginApp.api_views import LoginView

urlpatterns = [
    re_path(r'^login/$', LoginView.as_view(), name='login'),  # overwritten knox login view
    re_path(r'^logout/$', LogoutView.as_view(), name='knox_logout'),
    re_path(r'^logoutall/$', LogoutAllView.as_view(), name='knox_logoutall'),

]