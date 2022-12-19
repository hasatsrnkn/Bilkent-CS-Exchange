from knox.auth import TokenAuthentication
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from dbint.models import University, UniversityDepartment, Review
from dbint.serializers import ReviewSerializer, UniversitySerializer, UniversityDepartmentSerializer
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT, HTTP_200_OK


class UniReviewsAPI(APIView):

    def get(self, request, id_to_search, format=None):
        uni = University.objects.get(id=id_to_search)
        reviews = Review.objects.filter(university=uni)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=HTTP_200_OK)


class PostReviewAPI(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):

        if request.user.has_perm('dbint.add_review'):
            serializer = ReviewSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': "You do not have permission to perform this action."},
                                    status=status.HTTP_401_UNAUTHORIZED)