from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from MigrationApp.models.SystemModels import Reply, Thread
from .serializers import ReplySerializer, ThreadSerializer


# TODO: get method should give 5 threads from each department, each containing 2 most recent replies of their own,
#  rn it is giving 5 threads in total and all the replies
class ForumHomeMain(APIView):
    """
    Get 5 most recent threads and 2 replies each belonging to them
    """

    def get(self, request, format=None):
        threads = Thread.objects.order_by('start_date')[:5]
        serializer = ThreadSerializer(threads, many=True)

        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ThreadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# TODO: Looks fine but may change
class ForumQuestion(APIView):
    """
    Get a thread and its replies
    """
    def get(self, request, id_to_search, format=None):
        print("hey")
        print(id_to_search)

        threads = Thread.objects.get(id=id_to_search)

        if threads is not None:
            serializer = ThreadSerializer(threads)
            return Response(serializer.data, status=status.HTTP_302_FOUND)

        return Response(ThreadSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        pass
