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


