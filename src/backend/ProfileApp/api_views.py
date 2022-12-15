from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_200_OK, HTTP_401_UNAUTHORIZED
from rest_framework.views import APIView
from django.conf import settings
from django.shortcuts import redirect
from dbint.models import User, ApplyingStudent
from dbint.serializers import get_serializer


class MyProfileAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        if request.user.is_authenticated:
            logged_in_user = request.user.get_manager().get(username=request.user.username)
            serializer_class = get_serializer(logged_in_user)
            serializer = serializer_class(logged_in_user)
            return Response(serializer.data)
        return Response(status=HTTP_401_UNAUTHORIZED)

