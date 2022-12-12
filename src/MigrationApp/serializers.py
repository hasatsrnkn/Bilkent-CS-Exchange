from abc import abstractmethod, ABC

from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import NotAuthenticated, PermissionDenied
from MigrationApp.models.SystemModels import *
from MigrationApp.models.ActorModels import User as Us

from rest_framework.fields import empty
# commented out codes are copy-paste codes for testing purposes


class ReplySerializer(serializers.ModelSerializer):
    user_serializer_class = Us.get_serializer()
    user = user_serializer_class(read_only=True)

    class Meta:
        model = Reply
        fields = ['user', 'text', 'date']

    '''
    def create(self, validated_data):
        request = self.context['request']
        creator = request.user
        if not creator.is_authenticated:
            raise NotAuthenticated('Authentication required.')
        thread = Thread.objects.get(pk=request.data['thread_id'])
        user = Us.objects.get(pk=request.data['user_id'])
        return Reply.objects.create(text=validated_data['text'], user=user, thread=thread)

    # copy-pasted code from another program for reference, does not work
    def update(self, instance, validated_data):
        request = self.context['request']
        creator = request.user
        if not creator.is_authenticated or instance.creator_id != creator.pk:
            raise PermissionDenied('Permission denied, you are not the creator of this reply')
        instance.text = validated_data['text']
        instance.rating = validated_data['rating']
        instance.date_edited = timezone.now()
        instance.save()
        return instance'''


class ReplyStrategy(ABC):

    @abstractmethod
    def get_replies(self, thread):
        pass


class TwoMostRecent(ReplyStrategy):

    def get_replies(self, thread):
        replies = thread.replies.all()[:2]
        if replies:
            return ReplySerializer(replies, many=True).data
        else:
            None


class AllReplies(ReplyStrategy):

    def get_replies(self, thread):
        replies = thread.replies.all()
        if replies:
            return ReplySerializer(replies, many=True).data
        else:
            None


class NoReplies(ReplyStrategy):

    def get_replies(self, thread):
        replies = thread.replies.none()
        if replies:
            return ReplySerializer(replies, many=True).data
        else:
            None


class aaa():

    def get_replies(self, user):
        user_serializer = user.get_serializer()
        if user_serializer:
            return user_serializer().data
        else:
            None


# TODO: may need a look
class ThreadSerializer(serializers.ModelSerializer):

    replies = serializers.SerializerMethodField('reply_strategy')
    user_serializer_class = Us.get_serializer()
    user = user_serializer_class(read_only=True)

    def reply_strategy(self, thread):
        return self.context.get('reply_strategy').get_replies(thread)

    '''def to_representation(self, instance):
        data = super().to_representation(instance)
        data['replies'] = data['replies'][:2]
        return data'''

    class Meta:
        model = Thread
        fields = ['id', 'user', 'header', 'question', 'department', 'reply_count', 'solved', 'context',
                  'start_date', 'view_count', 'replies']


class AnnouncementSerializer(serializers.ModelSerializer):
    user_serializer_class = Us.get_serializer()
    announcer = user_serializer_class(read_only=True)

    class Meta:
        model = Announcement
        fields = ['announcer', 'text', 'context', 'date']


class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = '__all__'


class UniversityDepartmentSerializer(serializers.ModelSerializer):
    university = UniversitySerializer(read_only=True)

    #user_serializer_class = Us.get_serializer()
    #former_students = user_serializer_class(read_only=True)

    user_serializer_class = Us.get_serializer()
    coordinator = user_serializer_class(read_only=True)

    class Meta:
        model = UniversityDepartment
        fields = ['university', 'department', 'taught_in_english_info', 'quota', 'language_requirements', 'coordinator',
                  'threshold']

