from knox.auth import TokenAuthentication
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_401_UNAUTHORIZED
from rest_framework.views import APIView
from rest_framework.response import Response
from hitcount.models import HitCount
from hitcount.views import HitCountMixin

from dbint.constants import DEPARTMENTS
from dbint.models.SystemModels import Reply, Thread
from dbint.serializers import ReplySerializer, ThreadSerializer, XMostRecent, NoReplies, AllReplies

THREAD_PER_DEPARTMENT_HOME = 5
NUMBER_OF_THREADS_MOST_VIEWED = 10
REPLY_PER_THREAD_HOME = 3


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
            serializer = ThreadSerializer(queryset, context={'reply_strategy': XMostRecent(3)}, many=True)

            threads.extend(serializer.data)

        return Response(threads)

    def post(self, request, format=None):
        serializer = ThreadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForumAskQuestionAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        if request.user.has_perm('dbint.add_thread'):
            serializer = ThreadSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': "You do not have permission to perform this action."},
                            status=HTTP_401_UNAUTHORIZED)


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
        thread = Thread.objects.get(id=id_to_search)

        # first get the related HitCount object for your model object
        hit_count = HitCount.objects.get_for_object(thread)

        # next, you can attempt to count a hit and get the response
        # you need to pass it the request object as well
        hit_count_response = HitCountMixin.hit_count(request, hit_count)

        if hit_count_response:
            thread.view_count += 1
            thread.save()

        if thread is not None:
            serializer = ThreadSerializer(thread, context={'reply_strategy': AllReplies()})
            return Response(serializer.data, status=status.HTTP_302_FOUND)

        return Response(ThreadSerializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnswerQuestionAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        if request.user.has_perm('dbint.add_reply'):
            serializer = ReplySerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': "You do not have permission to perform this action."},
                            status=HTTP_401_UNAUTHORIZED)

   # TODO: create perm 'mark as solved'
    def put(self, request, format=None):
        if request.user.has_perm('dbint.change_thread'):
            thread_id = request.data['thread_id']
            thread = Thread.objects.get(id=thread_id)
            thread.solved = request.data['solved']
            thread.save()
            return Response(status.HTTP_200_OK)


