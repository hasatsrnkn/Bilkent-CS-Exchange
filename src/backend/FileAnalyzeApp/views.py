import sys

from django.shortcuts import render
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from FileAnalyzeApp import *
from backend.settings import MEDIA_ROOT
from dbint import *
from tablib import Dataset
import openpyxl
from http.client import HTTPResponse
from django.shortcuts import render
import pandas as pd
import os
from django.core.files.storage import FileSystemStorage

from dbint.constants import TURKISH_DEPARTMENT
from dbint.models import ApplyingStudent, ExchangeCoordinator, User
from dbint.models.SystemModels import Document, UniversityDepartment, University
from dbint.serializers import DocumentSerializer
from .models import ExcelStudents
from PyPDF2 import PdfFileWriter, PdfFileReader
import io
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from io import StringIO
from docx.shared import Inches, Cm, Pt
from django.http import HttpResponse

from .resources import ExcelStudentsResource


class Import_Excel_pandas(APIView):
    def post(self, request):
        if request.method == 'POST':
            file = request.data['file']
            file_name = request.data['file_name']

            instance = Document.objects.get_or_create(document=file, documentName=file_name,
                                               extension=".xlsx", document_owner=request.user, type='PDF File')
            instance[0].save()

            document_object = instance[0]
            file_path = DocumentSerializer(document_object).data['document']

            print(MEDIA_ROOT + file_path)
            empexceldata = pd.read_excel(MEDIA_ROOT + file_path[6:])
            dbframe = empexceldata
            for dbframe in dbframe.itertuples():
                if (pd.isnull(dbframe[5])):
                    break
                print(int(dbframe[4]).__str__())
                obj = ExcelStudents.objects.create(firstName=dbframe[2], lastname=dbframe[3],
                                                   studentID=int(dbframe[4]).__str__(),
                                                   faculty=dbframe[5], department=dbframe[6],
                                                   transcriptPoints=dbframe[20],
                                                   totalPoints=dbframe[21],
                                                   duration=dbframe[22], firstPrefUni=dbframe[23],
                                                   secondPrefUni=dbframe[24],
                                                   thirdPrefUni=dbframe[25], fourthPrefUni=dbframe[26],
                                                   fifthPrefUni=dbframe[27])
                obj.save()

            PlaceStudent()
            return Response({'uploaded_file_url': 'uploaded_file_url'}, status=status.HTTP_200_OK)


def PlaceStudent():
    students = ExcelStudents.objects.all()
    universities = University.objects.all()

    for stu in students:
        for i in range(0, 5):
            if i == 0:
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
                if (universityName == tempUniversity.name):
                    # universityDepartments = tempUniversity.university_departments.all()
                    departments = UniversityDepartment.objects.all()
                    for currentDepartment in departments:

                        if currentDepartment.university.name == universityName and TURKISH_DEPARTMENT.get(
                                stu.department) == currentDepartment.department and currentDepartment.quotaPlacement > 0:
                            stu.placedUni = tempUniversity
                            stu.save(update_fields=["placedUni"])
                            tempQuota = currentDepartment.quotaPlacement
                            tempQuota = tempQuota - 1
                            currentDepartment.quotaPlacement = tempQuota
                            currentDepartment.save(update_fields=["quotaPlacement"])
                            createdApplyingStudents = ApplyingStudent.objects.create(
                                first_name=stu.firstName, last_name=stu.lastname,
                                username=stu.studentID,
                                department=TURKISH_DEPARTMENT.get(stu.department), points=stu.totalPoints,
                                applied_university=tempUniversity)
                            createdApplyingStudents.set_password('12345')
                            createdApplyingStudents.stu_depc = currentDepartment.coordinator
                            createdApplyingStudents.stu_excc = ExchangeCoordinator.objects.get(username='yelda')
                            createdApplyingStudents.save()
                            break
                        elif TURKISH_DEPARTMENT.get(
                                stu.department) == currentDepartment.department and currentDepartment.quotaPlacement == 0:
                            break
                        else:
                            pass
