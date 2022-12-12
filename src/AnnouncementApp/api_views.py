from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from MigrationApp.constants import DEPARTMENTS
from MigrationApp.models.SystemModels import Announcement
from MigrationApp.models.ActorModels import User, Student

from MigrationApp.serializers import AnnouncementSerializer

ANNOUNCEMENT_PER_DEPARTMENT_HOME = 5


# TODO:
class AnnouncementHome(APIView):
    """
    Get most recent announcements
    """

    def get(self, request, format=None):

        queryset = Announcement.objects.all().prefetch_related('announcer')[:ANNOUNCEMENT_PER_DEPARTMENT_HOME]
        serializer = AnnouncementSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AnnouncementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
