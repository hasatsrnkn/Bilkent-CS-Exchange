from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import NotAuthenticated, PermissionDenied
from MigrationApp.models.SystemModels import *
from MigrationApp.models.ActorModels import User as Us

# commented out codes are copy-paste codes for testing purposes


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Us
        fields = ['name', 'surname']


class ReplySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

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

# TODO: rn it is a generic thread serializer and gives all replies along with the thread, that may change
class ThreadSerializer(serializers.ModelSerializer):

    replies = ReplySerializer(many=True, read_only=True)
    user = UserSerializer()

    class Meta:
        model = Thread
        fields = ['id', 'user', 'header', 'question', 'department', 'reply_count', 'solved', 'context',
                  'start_date', 'view_count', 'replies']

"""
    def __init__(self, queryset, **kwargs):
        super().__init__(queryset, **kwargs)
        self.user = UserSerializer()
        self.replies = ReplySerializer(Reply.objects.
                                       filter(thread=self).
                                       order_by('date')[:2], many=True)
"""





