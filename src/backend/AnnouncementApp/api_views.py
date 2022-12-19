from knox.auth import TokenAuthentication
from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED
from dbint.constants import DEPARTMENTS
from dbint.models.SystemModels import Announcement
from dbint.models.ActorModels import User, Student, Management

from dbint.serializers import AnnouncementSerializer

ANNOUNCEMENT_PER_DEPARTMENT_HOME = 10


# TODO:
class AnnouncementHomeAPI(APIView):
    """
    Get most recent announcements
    """
    def get(self, request, format=None):
        queryset = Announcement.objects.all().prefetch_related('announcer')[:ANNOUNCEMENT_PER_DEPARTMENT_HOME]
        serializer = AnnouncementSerializer(queryset, many=True)
        return Response(serializer.data)


class MakeAnnouncementAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        if request.user.has_perm('dbint.add_announcement'):
            serializer = AnnouncementSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': "You do not have permission to perform this action."},
                            status=HTTP_401_UNAUTHORIZED)
