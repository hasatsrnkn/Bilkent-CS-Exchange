
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import University
from .serializers import UniversitySerializer


@api_view(['GET', 'POST'])
def all_unis(request):
    if request.METHOD == 'GET':
        unis = University.objects.all()
        uni_serializer = UniversitySerializer(unis, many=True)
        return Response(uni_serializer.data)
    elif request.method == 'POST':
        serializer = UniversitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

