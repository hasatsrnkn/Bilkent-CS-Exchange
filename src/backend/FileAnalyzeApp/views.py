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

from dbint.models.SystemModels import Document
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


def index(request):
    if "GET" == request.method:
        return render(request, 'index.html', {})
    else:
        excel_file = request.FILES["excel_file"]

        # you may put validations here to check extension or file size

        wb = openpyxl.load_workbook(excel_file)

        # getting a particular sheet by name out of many sheets
        worksheet = wb["Placed"]
        print >> sys.stderr, (worksheet)

        excel_data = list()
        # iterating over the rows and
        # getting value from each cell in row
        for row in worksheet.iter_rows():
            row_data = list()
            for cell in row:
                row_data.append(str(cell.value))
            excel_data.append(row_data)

        return render(request, 'index.html', {"excel_data":excel_data})

    # Create your views here.


class Import_Excel_pandas(APIView):
    def post(self, request):
        if request.method == 'POST' :
            file = request.data['file']
            file_name = request.data['file_name']

            instance = Document.objects.create(document=file, documentName=file_name,
                                               extension=".xlsx", document_owner=request.user, type='PDF File')
            instance.save()

            document_object = request.user.docs.get(documentName=file_name)
            file_path = DocumentSerializer(document_object).data['document']

            empexceldata = pd.read_excel(MEDIA_ROOT + file_path[6:])
            dbframe = empexceldata
            for dbframe in dbframe.itertuples():
                print >> sys.stderr, (dbframe)
                obj = ExcelStudents.objects.create(firstName=dbframe.FirstName, Lastname=dbframe.Lastname,
                                              studentID=dbframe.StudentIDNumber,
                                              faculty=dbframe.Faculty, department=dbframe.Department, transcriptPoints=dbframe.TranscriptPoints,
                                              totalPoints=dbframe.TotalPoints,
                                              duration=dbframe.DurationPreferred, firstPrefUni=dbframe.PreferredUniversity1, secondPrefUni=dbframe.PreferredUniversity2,
                                                   thirdPrefUni=dbframe.PreferredUniversity3, fourthPrefUni=dbframe.PreferredUniversity4,
                                                   fifthPrefUni=dbframe.PreferredUniversity5)
                obj.save()

            return Response({'uploaded_file_url': 'uploaded_file_url'}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

def Import_excel(request):
    if request.method == 'POST':
        ExcelStudents = ExcelStudentsResource()
        dataset = Dataset()
        new_employee = request.FILES['myfile']
        data_import = dataset.load(new_employee.read())
        result = ExcelStudentsResource.import_data(dataset, dry_run=True)
        if not result.has_errors():
            ExcelStudentsResource.import_data(dataset, dry_run=False)
    return render(request, 'import_excel_db.html', {})


def createWordFile(request):
    document = Document()
    docx_title = "TEST_DOCUMENT.docx"
    document.add_paragraph('Dear Sir or Madam:')

    table = document.add_table(0, 0)  # we add rows iteratively
    table.style = 'TableGrid'
    first_column_width = 5
    second_column_with = 10
    table.add_column(Cm(first_column_width))
    table.add_column(Cm(second_column_with))
    table.add_row()
    row = table.rows[0]
    row.cells[0].text = "Deneme"
    f = io.BytesIO()
    document.save(docx_title + '.docx')
    document.save(f)
    length = f.tell()
    f.seek(0)
    response = HttpResponse(
        f.getvalue(),
        content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )
    response['Content-Disposition'] = 'attachment; filename=' + docx_title
    response['Content-Length'] = length
    return response