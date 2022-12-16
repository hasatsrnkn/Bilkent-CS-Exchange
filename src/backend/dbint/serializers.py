from abc import abstractmethod, ABC
from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import NotAuthenticated, PermissionDenied

import dbint
from dbint.constants import *
from dbint.models.SystemModels import *
from dbint.models.ActorModels import User, Instructor, DepartmentCoordinator, ApplyingStudent, \
    ExchangeCoordinator, ExchangeOffice

from rest_framework.fields import empty
# commented out codes are copy-paste codes for testing purposes


def get_serializer(user):
    ut = user.user_type

    if ut == DEPC:
        return DEPCSerializer
    elif ut == INST:
        return INSTSerializer
    elif ut == ASTU:
        return ASTUSerializer
    elif ut == EXCC:
        return EXCCSerializer
    elif ut == EXCO:
        return EXCOSerializer
    return UserSerializer  # return the current serializer if the model is not a student or management


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class INSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ['first_name', 'last_name', 'email', 'department', 'user_type']


class DEPCSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepartmentCoordinator
        fields = ['first_name', 'last_name', 'email', 'user_type', 'department']


class EXCCSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExchangeCoordinator
        fields = ['first_name', 'last_name', 'email', 'user_type']


class EXCOSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExchangeOffice
        fields = ['first_name', 'last_name', 'email', 'user_type']


class ASTUSerializer(serializers.ModelSerializer):
    stu_depc = DEPCSerializer(read_only=True)
    stu_excc = EXCCSerializer(read_only=True)

    class Meta:
        model = ApplyingStudent
        fields = ['username', 'first_name', 'last_name', 'email', 'department', 'user_type', 'stu_depc', 'points', 'stu_excc']


class ReplySerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField('get_user')

    def get_user(self, reply):
        custom_user = reply.user.get_manager().get(id=reply.user.id)
        user_serializer_class = get_serializer(reply.user)
        serializer = user_serializer_class(custom_user)
        return serializer.data

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


# TODO: may need a look
class ThreadSerializer(serializers.ModelSerializer):

    replies = serializers.SerializerMethodField('reply_strategy')
    user = serializers.SerializerMethodField('get_user')

    def get_user(self, thread):
        custom_user = thread.user.get_manager().get(id=thread.user.id)
        user_serializer_class = get_serializer(thread.user)
        serializer = user_serializer_class(custom_user)
        return serializer.data

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

    announcer = serializers.SerializerMethodField('get_user')

    def get_user(self, announcement):
        custom_user = announcement.announcer.get_manager().get(id=announcement.announcer.id)
        user_serializer_class = get_serializer(announcement.announcer)
        serializer = user_serializer_class(custom_user)
        return serializer.data

    class Meta:
        model = Announcement
        fields = ['announcer', 'text', 'context', 'date']


class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = '__all__'


class UniversityDepartmentSerializer(serializers.ModelSerializer):
    university = UniversitySerializer(read_only=True)
    coordinator = DEPCSerializer(read_only=True)

    class Meta:
        model = UniversityDepartment
        fields = ['university', 'department', 'taught_in_english_info', 'quota', 'language_requirements', 'coordinator',
                  'threshold']

