from abc import abstractmethod, ABC
from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import NotAuthenticated, PermissionDenied

import dbint
from dbint.constants import *
from dbint.models.SystemModels import *
from dbint.models.ActorModels import User, Instructor, DepartmentCoordinator, ApplyingStudent, \
    ExchangeCoordinator, ExchangeOffice, FormerStudent
from rest_framework.fields import empty

# TODO: CHANGE USER SERIALIZER IMPLEMENTATION, DYNAMIC FIELDS !!!!!!!, maybe create a private fields, zıpzıp fields
#  dictionary-list
# commented out codes are copy-paste codes for testing purposes


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'user_type']


# TODO: add courses field, checklist
class INSTSerializerPriv(serializers.ModelSerializer):
    # courses = course
    # check_list =

    class Meta:
        model = Instructor
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'department', 'image', 'check_list', 'courses',
                  'user_type']


# TODO: add courses field
class INSTSerializer(serializers.ModelSerializer):
    # courses = course
    # check_list =

    class Meta:
        model = Instructor
        fields = ['id', 'first_name', 'last_name', 'email', 'department', 'image', 'user_type']


# TODO: add checklist
class DEPCSerializerPriv(serializers.ModelSerializer):
    image = serializers.ImageField()

    # check_list =

    class Meta:
        model = DepartmentCoordinator
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'department', 'image', 'check_list',
                  'user_type']


class DEPCSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()

    class Meta:
        model = DepartmentCoordinator
        fields = ['id', 'first_name', 'last_name', 'email', 'department', 'image', 'user_type']


class EXCCSerializerPriv(serializers.ModelSerializer):
    class Meta:
        model = ExchangeCoordinator
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'image', 'check_list', 'user_type']


class EXCCSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExchangeCoordinator
        fields = ['id', 'first_name', 'last_name', 'email', 'image', 'user_type']


# TODO: add more fields from user class?
class EXCOSerializerPriv(serializers.ModelSerializer):
    class Meta:
        model = ExchangeOffice
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'user_type']


class EXCOSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExchangeOffice
        fields = ['id', 'first_name', 'last_name', 'email', 'user_type']


# TODO: add checklist, caution: university description is popped from serializer, may need a look
class ASTUSerializerPriv(serializers.ModelSerializer):
    stu_depc = DEPCSerializer(read_only=True)
    stu_excc = EXCCSerializer(read_only=True)
    applied_university = serializers.SerializerMethodField('get_uni_dep')

    def get_uni_dep(self, applyingstudent):
        data = UniversitySerializer(applyingstudent.applied_university).data
        data.pop('description')
        return data

    class Meta:
        model = ApplyingStudent
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'department', 'image', 'points', 'check_list',
                  'stu_depc', 'stu_excc', 'applied_university', 'user_type']


class ASTUSerializer(serializers.ModelSerializer):

    class Meta:
        model = ApplyingStudent
        fields = ['id', 'first_name', 'last_name', 'email', 'department', 'image', 'user_type']


class FSTUSerializerPriv(serializers.ModelSerializer):
    uni_visited = serializers.SerializerMethodField('get_uni_dep')
    image = serializers.ImageField()

    def get_uni_dep(self, formerstudent):
        return UniversityDepartmentSerializer(formerstudent.uni_visited).data

    class Meta:
        model = FormerStudent
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'department', 'points', 'begin_date', 'end_date',
                  'image', 'uni_visited', 'user_type']


class FSTUSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()

    class Meta:
        model = FormerStudent
        fields = ['id', 'first_name', 'last_name', 'email', 'department', 'image', 'user_type']


user_serializer_dict = {'public': {ASTU: ASTUSerializer, FSTU: FSTUSerializer, DEPC: DEPCSerializer,
                                   INST: INSTSerializer, EXCC: EXCCSerializer, EXCO: EXCOSerializer},
                        'private': {ASTU: ASTUSerializerPriv, FSTU: FSTUSerializerPriv, DEPC: DEPCSerializerPriv,
                                    INST: INSTSerializerPriv, EXCC: EXCCSerializerPriv, EXCO: EXCOSerializerPriv}}


class ReplySerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField('get_user')

    def get_user(self, reply):
        custom_user = reply.user.get_manager().get(id=reply.user.id)
        user_serializer_class = user_serializer_dict['public'][reply.user.user_type]
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
        user_serializer_class = user_serializer_dict['public'][thread.user.user_type]
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
        user_serializer_class = user_serializer_dict['public'][announcement.announcer.user_type]
        serializer = user_serializer_class(custom_user)
        return serializer.data

    def create(self, validated_data):
        request = self.context['request']
        creator = request.user
        if not creator.is_authenticated:
            raise NotAuthenticated('Authentication required.')
        announcer = request.user.get_manager().get(username=request.user.username)
        return Announcement.objects.create(announcer=announcer, text=validated_data['text'], context=validated_data['context'])

    class Meta:
        model = Announcement
        fields = ['announcer', 'text', 'context', 'date']


class UniversitySerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField('get_reviews')

    class Meta:
        model = University
        fields = '__all__'

    def get_reviews(self, university):
        reviews = university.reviews.order_by('date')[:2]
        if reviews:
            return ReviewSerializer(reviews, many=True).data
        else:
            None


class UniversityDepartmentSerializer(serializers.ModelSerializer):
    university = UniversitySerializer(read_only=True)
    coordinator = DEPCSerializer(read_only=True)

    class Meta:
        model = UniversityDepartment
        fields = ['university', 'department', 'taught_in_english_info', 'quota', 'language_requirements', 'coordinator',
                  'threshold']


class ReviewSerializer(serializers.ModelSerializer):
    reviewer = serializers.SerializerMethodField('get_user')

    def get_user(self, review):
        custom_user = review.reviewer.get_manager().get(id=review.reviewer.id)
        user_serializer_class = user_serializer_dict['public'][review.reviewer.user_type]
        serializer = user_serializer_class(custom_user)
        return serializer.data

    class Meta:
        model = Review
        fields = ['id', 'reviewer', 'text', 'rating']