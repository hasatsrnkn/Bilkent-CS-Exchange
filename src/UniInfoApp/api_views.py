from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from MigrationApp.models.SystemModels import UniversityDepartment
from MigrationApp.serializers import UniversityDepartmentSerializer


class UniInfoHomeAPI(APIView):

    def get(self, request, format=None):
        unis = UniversityDepartment.objects.all()
        serializer = UniversityDepartmentSerializer(unis, many=True)

        return Response(serializer.data)



