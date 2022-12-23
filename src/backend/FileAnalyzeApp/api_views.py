from django.http import FileResponse

from dbint.constants import DEPC, EXCC, TURKISH_DEPARTMENT
from dbint.models import ApplyingStudent, User
from dbint.models.SystemModels import Document, Course, ForeignCourse, CourseRelation, University, UniversityDepartment

from django.shortcuts import render
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from FileAnalyzeApp import *
from backend.settings import MEDIA_ROOT
from dbint import *

from dbint.models.SystemModels import Document
from dbint.serializers import DocumentSerializer
from dbint.signals import _delete_file
from .models import ExcelStudents
from PyPDF2 import PdfFileWriter, PdfFileReader
import io
from reportlab.pdfgen import canvas

from .resources import ExcelStudentsResource


class DownloadFileAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, file_name, format=None):
        document_object = request.user.docs.get(documentName=file_name)

        file_path = DocumentSerializer(document_object).data['document']
        return FileResponse(open(MEDIA_ROOT + file_path[6:], 'rb'), content_type='application/pdf')


class DownloadOthersFilesAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, file_name, id_to_search, format=None):
        if request.user.user_type == DEPC or request.user.user_type == EXCC:
            student = User.objects.get(id=id_to_search)
            document_object = student.docs.get(documentName=file_name)

            file_path = DocumentSerializer(document_object).data['document']
            return FileResponse(open(MEDIA_ROOT + file_path[6:], 'rb'), content_type='application/pdf')

        return Response(status=status.HTTP_200_OK)


class UploadFileAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        if (request.user.has_perm('dbint.add_document')):

            file = request.data['file']
            file_name = request.data['file_name']
            try:
                user_doc = Document.objects.filter(document_owner=request.user).get(documentName=file_name)
                if user_doc:
                    _delete_file(MEDIA_ROOT + '/' + user_doc.document.__str__())
                    user_doc.document = file
                    user_doc.save()
                    if user_doc.document:
                        return Response(status=status.HTTP_200_OK)
                    else:
                        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                else:
                    instance = Document.objects.create(document=file, documentName=file_name,
                                                       extension=".pdf", document_owner=request.user, type='PDF File')
                    instance.save()
                    if instance:
                        return Response(status=status.HTTP_200_OK)
                    else:
                        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except Document.DoesNotExist:
                instance = Document.objects.create(document=file, documentName=file_name,
                                                   extension=".pdf", document_owner=request.user, type='PDF File')
                instance.save()
                if instance:
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'details': 'You do not have permission'}, status=status.HTTP_401_UNAUTHORIZED)


class ReadAndWritePdf(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user.get_manager().get(username=request.user.username)

        packet = io.BytesIO()
        can = canvas.Canvas(packet, pagesize=(800, 800))
        can.setFont('Helvetica', 10)  # Set Font and Size
        can.drawString(80, 501, user.first_name)  # Name
        can.drawString(80, 481, user.last_name)  # Surname
        can.drawString(490, 501, user.username)  # ID
        can.drawString(490, 481, user.department)  # Department
        can.drawString(170, 440, user.applied_university.name)  # Institution
        can.drawString(490, 453, request.data['academic_year'])  # Academic Year
        can.drawString(490, 429, request.data['semester'])  # Semester

        bottomPadding = 336
        bottomPaddingDifference = 23

        for i in range(request.data['size']):
            foreign_code = request.data['courses'][i]['foreign_code']
            foreign_name = request.data['courses'][i]['foreign_name']
            foreign_credit = request.data['courses'][i]['foreign_credit']
            bilkent_code_name = request.data['courses'][i]['code_name']
            bilkent_credit = request.data['courses'][i]['credit']
            exemption = request.data['courses'][i]['exemption']

            bc = Course.objects.get_or_create(name=bilkent_code_name, department=user.department,
                                              credits=bilkent_credit)
            fc = ForeignCourse.objects.get_or_create(name=foreign_name, department=user.department, code=foreign_code,
                                                     credits=foreign_credit, university=user.applied_university)

            CourseRelation.objects.get_or_create(bilkent_course=bc[0], foreign_course=fc[0], approved_status=False)

            can.drawString(50, bottomPadding, foreign_code)  # Course 1 Code
            can.drawString(95, bottomPadding, foreign_name)  # Course 1 Name
            can.drawString(360, bottomPadding, foreign_name)  # Course 1 Credits
            can.drawString(395, bottomPadding, bilkent_code_name)  # Course 1 required
            can.drawString(640, bottomPadding, bilkent_credit)  # Course 1 req credits
            can.drawString(670, bottomPadding, exemption)  # Course 1 req exemptions
            bottomPadding = bottomPadding - bottomPaddingDifference

        # can.drawString(50, 313, "CS421")  # Course 2 Code

        can.save()

        # move to the beginning of the StringIO buffer
        packet.seek(0)

        # create a new PDF with Reportlab
        new_pdf = PdfFileReader(packet)
        # read your existing PDF
        existing_pdf = PdfFileReader(open(MEDIA_ROOT + "/original.pdf", "rb"))
        output = PdfFileWriter()
        # add the "watermark" (which is the new pdf) on the existing page
        page = existing_pdf.getPage(0)
        page.mergePage(new_pdf.getPage(0))
        output.addPage(page)
        # finally, write "output" to a real file
        file_name = "files/pre_approval_" + user.username + ".pdf"

        try:
            instance = Document.objects.get(documentName='pre_approval', document_owner=request.user)
            print(MEDIA_ROOT + '/' + instance.document.__str__())
            _delete_file(MEDIA_ROOT + '/' + instance.document.__str__())
            outputStream = open(MEDIA_ROOT + '/' + file_name, "wb")
            output.write(outputStream)
            outputStream.close()
            instance.document = file_name
            instance.save()

        except Document.DoesNotExist:
            outputStream = open(MEDIA_ROOT + '/' + file_name, "wb")
            output.write(outputStream)
            outputStream.close()
            Document.objects.create(document=file_name, documentName='pre_approval',
                                                  extension=".pdf", document_owner=request.user, type='PDF File')
        return Response({}, status=status.HTTP_200_OK)



