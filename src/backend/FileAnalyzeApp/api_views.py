from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from dbint.serializers import UploadFileSerializer
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from rest_framework import status
from dbint.models.SystemModels import Document
from FileAnalyzeApp.forms import UploadFileForm
from dbint.models.ActorModels import User

# curl -X POST -S -F "file=@deneme.pdf;type=application/pdf" 127.0.0.1:8000/api/files/
# file ın olduğu yere girip curl çalıştırmak lazım
class UploadViewSet(APIView):
    def post(self,request):
        #TODO: ID DEĞİŞTİR
        user = User.objects.get(id=16)
        try:
            if request.method == 'POST':
                form = UploadFileForm(request.POST, request.FILES)
                instance = Document.objects.create(document=request.FILES['file'], documentName = request.FILES['file'].name,
                                                   extension="pdf", documentOwner=user, type='PDF File')
                instance.save()
                return Response({'response': "completed"})
        except:
            return Response({'response': "may be failed"})


