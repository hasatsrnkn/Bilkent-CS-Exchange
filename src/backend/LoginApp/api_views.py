from django.contrib.auth import authenticate, login, logout
from rest_framework import viewsets, permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_200_OK, HTTP_418_IM_A_TEAPOT
from knox.views import LoginView as KnoxLoginView
'''
{
    "username": "calkan",
    "password": "hasat123"
}
'''


class LoginView(KnoxLoginView):

    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginView, self).post(request, format=None)

    '''def post(self, request):
        un = request.data.get("username")
        pw = request.data.get("password")
        user = authenticate(username=un, password=pw)
        if not user:
            return Response({'error': 'Credentials are incorrect or user does not exist'}, status=HTTP_404_NOT_FOUND)

        token, _ = AuthToken.objects.get_or_create(user=user)
        login(request, user)
        return Response({'token': token.token_key, 'type': user.user_type}, status=HTTP_200_OK)'''

