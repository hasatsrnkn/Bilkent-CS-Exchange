from knox.auth import TokenAuthentication
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_200_OK, HTTP_401_UNAUTHORIZED
from rest_framework.views import APIView
from django.conf import settings
from django.shortcuts import redirect

from dbint.constants import EXCO, DEPC, EXCC, INST
from dbint.models import User, ApplyingStudent, Notification
from dbint.models.SystemModels import CourseRelation, Course
from dbint.serializers import user_serializer_dict, ToDoListSerializer, CourseSerializer, ASTUSerializer, \
    NotificationSerializer, CourseRelationSerializer


class MyProfileAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        logged_in_user = request.user.get_manager().get(username=request.user.username)
        user_serializer_class = user_serializer_dict['private'][logged_in_user.user_type]
        serializer = user_serializer_class(logged_in_user)
        return Response(serializer.data, status=HTTP_200_OK)


class MyToDoListAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        logged_in_user = request.user.get_manager().get(username=request.user.username)
        return Response(ToDoListSerializer(logged_in_user.check_list).data, status=HTTP_200_OK)


# TODO: correct user serializers and change private to public
class ProfileAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, id_to_search, format=None):
        user_to_show = User.objects.get(id=id_to_search)
        user_to_show = user_to_show.get_manager().get(id=id_to_search)
        user_serializer_class = user_serializer_dict['private'][user_to_show.user_type]
        serializer = user_serializer_class(user_to_show)
        return Response(serializer.data, status=HTTP_200_OK)


class AddCourseAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):

        if request.user.has_perm('dbint.add_course'):
            serializer = CourseSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': "You do not have permission to perform this action."},
                            status=status.HTTP_401_UNAUTHORIZED)


class CoordinatorStudentsAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        if request.user.user_type == EXCC:
            stu_data = []
            data = []
            for stu in ApplyingStudent.objects.all():
                stu_data = ASTUSerializer(stu).data
                file_upload_noti_count = request.user.notifications.filter(included_user=stu) \
                    .filter(type='file_upload').filter(seen=False).count()
                stu_data['username'] = stu.username
                stu_data['newOrEditedFiles'] = file_upload_noti_count
                data.append(stu_data)
            return Response(data, status=HTTP_200_OK)

        elif request.user.user_type == DEPC:
            stu_data = []
            data = []
            depc = request.user.get_manager().get(username=request.user.username)
            assigned_students = depc.assigned_students.all()
            for stu in assigned_students:
                stu_data = ASTUSerializer(stu).data
                file_upload_noti_count = request.user.notifications.filter(included_user=stu) \
                    .filter(type='file_upload').filter(seen=False).count()
                stu_data['newOrEditedFiles'] = file_upload_noti_count
                stu_data['username'] = stu.username
                data.append(stu_data)
            return Response(data, status=HTTP_200_OK)

        else:
            return Response({None}, status=status.HTTP_401_UNAUTHORIZED)


class NotificationsAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user.get_manager().get(username=request.user.username)
        notis = user.notifications.filter(seen=False)
        return Response(NotificationSerializer(notis, many=True).data, status=HTTP_200_OK)

    def post(self, request, format=None):
        noti = Notification.objects.get(id=request.data['id'])
        noti.seen = request.data['seen']
        noti.save()
        return Response(status=HTTP_200_OK)


class CoursesAPI(APIView):

    def get(self, request, format=None):
        courses = CourseRelation.objects.all()
        return Response(CourseRelationSerializer(courses, many=True).data, status=HTTP_200_OK)


class InstructorCoursesAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        if request.user.user_type == INST:
            courses = CourseRelation.objects.filter(bilkent_course__instructor_of_course__username=request.user.username)
            return Response(CourseRelationSerializer(courses, many=True).data, status=HTTP_200_OK)

    def post(self, request, format=None):
        user = request.user.get_manager().get(username=request.user.username)
        courseRel = CourseRelation.objects.get(id=request.data['id'])
        courseRel.approved_status = request.data['approved_status']
        courseRel.save()
        return Response(status=HTTP_200_OK)
