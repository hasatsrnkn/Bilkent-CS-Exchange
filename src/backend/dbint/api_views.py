from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT, HTTP_200_OK
from rest_framework.exceptions import *

user_type_slug_to_user_type = {'applying-students': ASTU, 'former-students': FSTU, 'department-coordinators': DEPC,
                               'instructors': INST, 'exchange-coordinators': EXCC, 'exchange-offices': EXCO}


class AllUnisAPI(APIView):

    def get(self, request, format=None):
        unis = UniversityDepartment.objects.all()
        serializer = UniversityDepartmentSerializer(unis, many=True)
        return Response(serializer.data, status=HTTP_200_OK)


class ForumAllThreadsAPI(APIView):

    def get(self, request, format=None):
        threads = Thread.objects.all()
        serializer = ThreadSerializer(threads, context={'reply_strategy': AllReplies()}, many=True)
        return Response(serializer.data, status=HTTP_200_OK)


class AllUsersAPI(APIView):

    def get(self, request, user_type, format=None):
        if user_type == 'users':
            users = User.objects.all()
        else:
            user_type = user_type_slug_to_user_type[user_type]
            users = User.objects.filter(user_type=user_type)
        if users:
            data = UserSerializer(users, many=True).data
            if data:
                return Response(data, status=HTTP_200_OK)
            else:
                return Response({'details': 'there was no serializer data'}, status=HTTP_404_NOT_FOUND)
        else:
            return Response({'details': 'there were no objects'}, status=HTTP_404_NOT_FOUND)


# TODO: the api for this is all-applying-students, change it?
class AllStudentsAPI(APIView):

    def get(self, request, format=None):
        students = Student.objects.all()
        data = []
        for stu in students:
            user_serializer_class = user_serializer_dict['public'][stu.user_type]
            data.append(user_serializer_class(stu).data)

        return Response(data, status=HTTP_200_OK)
