from knox.auth import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_200_OK, HTTP_401_UNAUTHORIZED
from rest_framework.views import APIView
from django.conf import settings
from django.shortcuts import redirect
from dbint.models import User, ApplyingStudent
from dbint.serializers import user_serializer_dict


class MyProfileAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):

        logged_in_user = request.user.get_manager().get(username=request.user.username)
        user_serializer_class = user_serializer_dict['private'][logged_in_user.user_type]
        serializer = user_serializer_class(logged_in_user)
        return Response(serializer.data)


# TODO: correct user serializers and change private to public
class ProfileAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, id_to_search, format=None):

        user_to_show = User.objects.get(id=id_to_search)
        user_to_show = user_to_show.get_manager().get(id=id_to_search)
        user_serializer_class = user_serializer_dict['private'][user_to_show.user_type]
        serializer = user_serializer_class(user_to_show)
        return Response(serializer.data)
