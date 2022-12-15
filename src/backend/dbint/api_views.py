from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response


class ForumAllThreadsAPI(APIView):

    def get(self, request, format=None):
        threads = Thread.objects.all()
        serializer = ThreadSerializer(threads, context={'reply_strategy': AllReplies()}, many=True)
        return Response(serializer.data)


class AllStudentsAPI(APIView):

    def get(self, request, format=None):
        students = ApplyingStudent.objects.all()
        serializer_class = get_serializer(students[0])
        serializer = serializer_class(students, many=True)
        return Response(serializer.data)


class UniInfoHomeAPI(APIView):

    def get(self, request, format=None):
        unis = UniversityDepartment.objects.all()
        serializer = UniversityDepartmentSerializer(unis, many=True)

        return Response(serializer.data)

