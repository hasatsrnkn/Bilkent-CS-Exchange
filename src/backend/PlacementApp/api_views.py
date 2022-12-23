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

        return Response({'response': "completed"})