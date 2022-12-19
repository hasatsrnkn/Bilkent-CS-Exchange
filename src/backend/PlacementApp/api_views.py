from django.shortcuts import render
from FileAnalyzeApp.models import ExcelStudents
from dbint.models.SystemModels import UniversityDepartment
from dbint.models.ActorModels import ApplyingStudent
from dbint.models.SystemModels import University
from dbint.constants import *
from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from rest_framework import status
from dbint.models.SystemModels import Document
from dbint.models.SystemModels import ListItem
from dbint.models.SystemModels import ToDoList
from FileAnalyzeApp.forms import UploadFileForm
from dbint.models.ActorModels import User


# Create your views here.
class GetStudents(APIView):

    def post(self, request):
        students = ExcelStudents.objects.all()
        universities = University.objects.all()

        for stu in students:
            for i in range (0,5):
                if i == 0 :
                    universityName = stu.firstPrefUni
                elif i == 1:
                    universityName = stu.secondPrefUni
                elif i == 2:
                    universityName = stu.thirdPrefUni
                elif i == 3:
                    universityName = stu.fourthPrefUni
                else:
                    universityName = stu.fifthPrefUni
                for tempUniversity in universities:
                    if(universityName == tempUniversity.name):
                        #universityDepartments = tempUniversity.university_departments.all()
                        departments = UniversityDepartment.objects.all()
                        for currentDepartment in departments:

                            if currentDepartment.university.name == universityName and TURKISH_DEPARTMENT.get(stu.department) == currentDepartment.department and currentDepartment.quotaPlacement > 0:
                                stu.placedUni = tempUniversity
                                stu.save(update_fields=["placedUni"])
                                tempQuota = currentDepartment.quotaPlacement
                                tempQuota = tempQuota - 1
                                currentDepartment.quotaPlacement = tempQuota
                                currentDepartment.save(update_fields=["quotaPlacement"])
                                createdApplyingStudents = ApplyingStudent.objects.create(
                                                                first_name=stu.firstName, last_name=stu.lastname,
                                                                username=stu.lastname, password='12345',
                                                                department=TURKISH_DEPARTMENT.get(stu.department), points=stu.totalPoints,
                                                                applied_university = tempUniversity)
                                createdApplyingStudents.save()
                                break
                            elif TURKISH_DEPARTMENT.get(stu.department) == currentDepartment.department and currentDepartment.quotaPlacement == 0:
                                break
                            else:
                                pass
        return Response({'response': "completed"})