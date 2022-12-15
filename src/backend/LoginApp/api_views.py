from django.contrib.auth import authenticate, login
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_200_OK
from rest_framework.views import APIView
'''
{
    "username": "calkan",
    "password": "hasat123"
}
'''


class Login(APIView):

    def post(self, request):
        un = request.data.get("username")
        pw = request.data.get("password")
        user = authenticate(username=un, password=pw)
        if not user:
            return Response({'error': 'Credentials are incorrect or user does not exist'}, status=HTTP_404_NOT_FOUND)

        token, _ = Token.objects.get_or_create(user=user)
        login(request, user)
        return Response({'token': token.key, 'type': user.user_type}, status=HTTP_200_OK)
