from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from dbint.constants import DEPARTMENTS
from dbint.models.SystemModels import Reply, Thread
from dbint.serializers import ReplySerializer, ThreadSerializer, TwoMostRecent, NoReplies, AllReplies

THREAD_PER_DEPARTMENT_HOME = 5
NUMBER_OF_THREADS_MOST_VIEWED = 10


# TODO: get method should give 5 threads from each department, each containing 2 most recent replies of their own,
#  rn it is giving 5 threads in total and all the replies
class ForumHomeMainAPI(APIView):
    """
    Get 5 most recent threads and 2 replies each belonging to them
    """

    def get(self, request, format=None):
        threads = []

        for dep in DEPARTMENTS:
            queryset = Thread.objects.filter(department=dep)[:THREAD_PER_DEPARTMENT_HOME]. \
                prefetch_related('replies')
            serializer = ThreadSerializer(queryset, context={'reply_strategy': TwoMostRecent()}, many=True)

            threads.extend(serializer.data)

        return Response(threads)

    def post(self, request, format=None):
        serializer = ThreadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForumMostViewedAPI(APIView):

    def get(self, request, format=None):
        threads = Thread.objects.order_by('-reply_count')[:NUMBER_OF_THREADS_MOST_VIEWED]
        serializer = ThreadSerializer(threads, context={'reply_strategy': NoReplies()}, many=True)
        return Response(serializer.data)


# TODO: Looks fine but may change
class ForumThreadAPI(APIView):
    """
    Get a thread and its replies
    """

    def get(self, request, id_to_search, format=None):
        threads = Thread.objects.get(id=id_to_search)

        if threads is not None:
            serializer = ThreadSerializer(threads, context={'reply_strategy': AllReplies()})
            return Response(serializer.data, status=status.HTTP_302_FOUND)

        return Response(ThreadSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        pass
