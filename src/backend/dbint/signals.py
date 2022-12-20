import datetime

from django.contrib.auth.models import Group
from django.db.models.signals import post_save
from django.db.models.signals import post_delete

from backend.settings import MEDIA_ROOT
from dbint.constants import *
from dbint.models.ActorModels import Student
from dbint.models.SystemModels import Notification
from dbint.models.SystemModels import ToDoList
from dbint.models.SystemModels import ListItem
from django.dispatch import receiver
import os
from django.db import models


def _delete_file(path):
    """ Deletes file from filesystem. """
    if os.path.isfile(path):
        os.remove(path)
        print('-File removed from file system-')


@receiver(post_delete, sender='dbint.Document')
def delete_file(sender, instance, *args, **kwargs):
    """ Deletes image files on `post_delete` """
    print(instance.document)
    if instance.document:
        _delete_file(MEDIA_ROOT + '/' + instance.document.__str__())


@receiver(post_save, sender='dbint.User')
def add_user_to_default_group(sender, instance, created=False, **kwargs):
    if created:
        my_group = Group.objects.get(name='Users')
        my_group.user_set.add(instance)
        my_group.save()
    my_group = Group.objects.get(name='a')
    my_group.user_set.add(instance)
    my_group.save()


@receiver(post_save, sender='dbint.Reply')
def increase_thread_reply_count(sender, instance, created=False, **kwargs):
    if created:
        # Increment the reply_count field of the associated thread
        instance.thread.reply_count += 1

        notificationText = instance.user.first_name + instance.user.last_name + " replied your thread!"
        notificationCreated = Notification.objects.create(text=notificationText, user=instance.thread.user,
                                                          seen=False, type='Reply')
        notificationCreated.save()

    instance.thread.save()


@receiver(post_delete, sender='dbint.Reply')
def decrease_thread_reply_count(sender, instance, *args, **kwargs):
    # Decrement the reply_count field of the associated thread
    instance.thread.reply_count -= 1
    instance.thread.save()


@receiver(post_save, sender='dbint.Review')
def increase_uni_review_count(sender, instance, created=False, **kwargs):
    if created:
        if not instance.reviewer.entered_review:
            instance.university.review_count += 1
            instance.university.calculate_rating()
    instance.university.save()


@receiver(post_delete, sender='dbint.Review')
def decrease_uni_review_count(sender, instance, *args, **kwargs):
    instance.university.review_count -= 1
    if not instance.reviewer.fstu_reviews.all():
        instance.reviewer.entered_review = False
        instance.university.calculate_rating()
        instance.reviewer.save()
    instance.university.save()


@receiver(post_delete, sender='dbint.Review')
def decrement_uni_review_count(sender, instance, created=False, **kwargs):
    instance.university.review_count -= 1
    if not instance.reviewer.fstu_reviews.all():
        instance.reviewer.entered_review = False
        instance.university.calculate_rating()
        instance.reviewer.save()


@receiver(post_save, sender='dbint.Announcement')
def create_notf_for_announcement(sender, instance, created=False, **kwargs):
    if created:
        students = Student.objects.all()
        for tempStudent in students:
            notificationCreated = Notification.objects.create(text='There is an announcement: ' + instance.text[:20] + "...",
                                                              user=tempStudent,
                                                              seen=False, type='Announcement')


@receiver(post_save, sender='dbint.Message')
def create_notf_for_message(sender, instance, created=False, **kwargs):
    if created:
        notificationText = "You have a message from " + instance.sender.first_name + instance.sender.last_name
        notificationCreated = Notification.objects.create(text=notificationText, user=instance.receiver,
                                                          seen=False, type='Message')
        notificationCreated.save()


@receiver(post_save, sender='dbint.Document')
def create_notf_for_document(sender, instance, created=False, **kwargs):
    user_type = instance.document_owner.user_type
    if user_type == ASTU:
        notificationText = instance.document_owner.first_name + " " + instance.document_owner.last_name + " uploaded a file!"
        notificationCreatedDEPC = Notification.objects.create(text=notificationText,
                                                              user=instance.document_owner.get_manager()
                                                              .get(id=instance.document_owner.id).stu_depc,
                                                              seen=False, type='file_upload',
                                                              included_user=instance.document_owner)
        notificationCreatedEXCC = Notification.objects.create(text=notificationText,
                                                              user=instance.document_owner.get_manager()
                                                              .get(id=instance.document_owner.id).stu_excc,
                                                              seen=False, type='file_upload',
                                                              included_user=instance.document_owner)
        print('notification created')
        notificationCreatedDEPC.save()
        notificationCreatedEXCC.save()
        if created:
            user = instance.document_owner.get_manager().get(id=instance.document_owner.id)
            if instance.documentName == 'pre_approval':
                listItem = ListItem.objects.get(list=user.check_list,
                                                type='pre_approval')
                listItem.completed = True
                listItem.save()
            elif instance.documentName == 'learning_agreement':
                listItem = ListItem.objects.get(list=user.check_list,
                                                type='learning_agreement')
                listItem.completed = True
                listItem.save()
            elif instance.documentName == 'health_and_travel':
                listItem = ListItem.objects.get(list=user.check_list,
                                                type='health_and_travel')
                listItem.completed = True
                listItem.save()



@receiver(post_save, sender='dbint.ApplyingStudent')  # bir de management
def create_todo_list(sender, instance, created=False, **kwargs):
    if created:
        todolist = ToDoList.objects.create()
        instance.check_list = todolist
        instance.save()
        ListItem.objects.create(list=todolist, text='Upload Learning Agreement', completed=False,
                                deadline=datetime.datetime(2023, 3, 15, 23, 59), type='learning_agreement')
        ListItem.objects.create(list=todolist, text='Upload Health and Travel Insurance Form', completed=False,
                                deadline=datetime.datetime(2023, 3, 15, 23, 59), type='health_and_travel')
        ListItem.objects.create(list=todolist, text='Generate Pre-Approval Form', completed=False,
                                deadline=datetime.datetime(2023, 3, 15, 23, 59),
                                type='pre_approval')


@receiver(post_save, sender='dbint.Management')  # bir de management
def create_todo_list_for_management(sender, instance, created=False, **kwargs):
    if created:
        todolist = ToDoList.objects.create()
        instance.check_list = todolist
        instance.save()


@receiver(post_save, sender='dbint.DepartmentCoordinator')  # bir de management
def create_todo_list_for_department_coordinator(sender, instance, created=False, **kwargs):
    if created:
        todolist = instance.check_list
        ListItem.objects.create(list=todolist, text='Approve Students', completed=False,
                                                deadline=datetime.datetime(2023, 3, 15, 23, 59),
                                                type='approve_students')


@receiver(post_save, sender='dbint.Instructor')  # bir de management
def create_todo_list_for_management_instructor(sender, instance, created=False, **kwargs):
    if created:
        todolist = instance.check_list
        firstListItem = ListItem.objects.create(list=todolist, text='Approve Courses', completed=False,
                                                deadline=datetime.datetime(2023, 3, 15, 23, 59), type='approve_courses')
        firstListItem.save()
