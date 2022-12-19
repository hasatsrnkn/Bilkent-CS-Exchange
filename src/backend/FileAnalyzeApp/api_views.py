from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from dbint.serializers import UploadFileSerializer
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from rest_framework import status
from dbint.models.SystemModels import Document
from dbint.models.SystemModels import ListItem
from dbint.models.SystemModels import ToDoList
from FileAnalyzeApp.forms import UploadFileForm
from dbint.models.ActorModels import User
from dbint.models.ActorModels import ApplyingStudent

# curl -X POST -S -F "file=@deneme.pdf;type=application/pdf" 127.0.0.1:8000/api/files/
# file ın olduğu yere girip curl çalıştırmak lazım
class UploadViewSet(APIView):
    def post(self,request):
        #TODO: ID DEĞİŞTİR tokendan alacaktın ve type'ı al. Type ı nasıl alacağını merak ediyorsan: signalslerde var
        type = 'xxx'
        user = User.get_manager().get(id=16)

        try:
            if request.method == 'POST':
                form = UploadFileForm(request.POST, request.FILES)
                instance = Document.objects.create(document=request.FILES['file'], documentName = request.FILES['file'].name,
                                                   extension="pdf", documentOwner=user, type='PDF File')
                instance.save()
                return Response({'response': "completed"})
        except:
            return Response({'response': "may be failed"})

class ReadExcel(APIView):
    def post(self,request):
        if request.method == 'POST' and request.FILES['myfile']:
            myfile = request.FILES['myfile']
            fs = FileSystemStorage(location='media/')
            filename = fs.save(myfile.name, myfile)
            uploaded_file_url = fs.url("media/" + filename)
            empexceldata = pd.read_excel("media/" + filename)
            dbframe = empexceldata
            for dbframe in dbframe.itertuples():
                if (pd.isnull(dbframe[5])):
                    break
                obj = ExcelStudents.objects.create(firstName=dbframe[1], lastname=dbframe[2],
                                                   studentID=dbframe[3],
                                                   faculty=dbframe[5], department=dbframe[6],
                                                   transcriptPoints=dbframe[19],
                                                   totalPoints=dbframe[20],
                                                   duration=dbframe[21], firstPrefUni=dbframe[22],
                                                   secondPrefUni=dbframe[23],
                                                   thirdPrefUni=dbframe[24], fourthPrefUni=dbframe[25],
                                                   fifthPrefUni=dbframe[26])
                obj.save()
            return Response({'response': "completed"})
        return Response({'response': "completed"})

class CreatePDF(APIView):
    def post(self,request):
        user = request.user
        applyingStudent = user.get_manager()
        packet = io.BytesIO()
        can = canvas.Canvas(packet, pagesize=(800, 800))
        can.setFont('Helvetica', 10)  # Set Font and Size
        can.drawString(80, 501,user.first_name )  # Name
        can.drawString(80, 481, user.last_name)  # Surname
        #can.drawString(490, 501, applyingStudent.)  # ID
        can.drawString(490, 481, applyingStudent.department)  # Department
        can.drawString(170, 440, applyingStudent.applied_university)  # Institution
        can.drawString(490, 453, "2023-2024")  # Academic Year
        can.drawString(490, 429, applyingStudent.period)  # Semester

        # can.drawString(50, 313, "CS421")  # Course 2 Code

        can.save()

        # move to the beginning of the StringIO buffer
        packet.seek(0)

        # create a new PDF with Reportlab
        new_pdf = PdfFileReader(packet)
        # read your existing PDF
        existing_pdf = PdfFileReader(open("original.pdf", "rb"))
        output = PdfFileWriter()
        # add the "watermark" (which is the new pdf) on the existing page
        page = existing_pdf.getPage(0)
        page.mergePage(new_pdf.getPage(0))
        output.addPage(page)
        # finally, write "output" to a real file
        outputStream = open("created.pdf", "wb")
        output.write(outputStream)
        outputStream.close()

        return Response({'response': "completed"})

