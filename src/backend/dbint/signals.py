from django.contrib.auth.models import Group
from django.db.models.signals import post_save
from django.db.models.signals import post_delete
from dbint.constants import *
from dbint.models.ActorModels import Student
from dbint.models.SystemModels import Notification
from dbint.models.SystemModels import ToDoList
from dbint.models.SystemModels import ListItem
from django.dispatch import receiver


@receiver(post_save, sender='dbint.User')
def add_user_to_default_group(sender, instance, created=False, **kwargs):
    if created:
        my_group = Group.objects.get(name='Users')
        my_group.user_set.add(instance)
        print(my_group.user_set)
        my_group.save()
    my_group = Group.objects.get(name='a')
    my_group.user_set.add(instance)
    print(my_group.user_set)
    my_group.save()
    print(instance.groups)

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
def decrease_thread_reply_count(sender,instance, *args, **kwargs):
    # Decrement the reply_count field of the associated thread
    instance.thread.reply_count -= 1
    instance.thread.save()

@receiver(post_save, sender='dbint.Review')
def increase_uni_review_count(sender, instance, created=False, **kwargs):
    if created:
        instance.university.review_count += 1
        if not instance.reviewer.entered_review:
            instance.university.calculate_rating()
    instance.university.save()

@receiver(post_delete, sender='dbint.Review')
def decrease_uni_review_count(sender,instance, *args, **kwargs):
    instance.university.review_count -= 1
    if not instance.reviewer.fstu_reviews.all():
        instance.reviewer.entered_review = False
        instance.university.calculate_rating()
        instance.reviewer.save()
    instance.university.save()

@receiver(post_save, sender='dbint.Announcement')
def create_notf_for_announcement(sender, instance, created=False, **kwargs):
    if created:
        students = Student.objects.all()
        for tempStudent in students:
            notificationCreated = Notification.objects.create(text='There is an announcement!', user=tempStudent,
                                                              seen=False, type='Announcement')
            notificationCreated.save()


@receiver(post_save, sender='dbint.Message')
def create_notf_for_message(sender, instance, created=False, **kwargs):
    if created:
        notificationText = "You have a message from " + instance.sender.first_name + instance.sender.last_name
        notificationCreated = Notification.objects.create(text=notificationText, user=instance.receiver,
                                                          seen=False, type='Message')
        notificationCreated.save()


@receiver(post_save, sender='dbint.Document')
def create_notf_for_document(sender, instance, created=False, **kwargs):
    if created:
        student_type = instance.documentOwner.user_type
        if student_type == ASTU:
            notificationText = instance.documentOwner.first_name + instance.documentOwner.last_name + " uploaded a file!"
            notificationCreatedDEPC = Notification.objects.create(text=notificationText, user=instance.documentOwner.get_manager()
                                                                  .get(id=instance.documentOwner.id).stu_depc,
                                                              seen=False, type='File Upload')
            notificationCreatedEXCC = Notification.objects.create(text=notificationText,
                                                                  user=instance.documentOwner.get_manager()
                                                                  .get(id=instance.documentOwner.id).stu_excc,
                                                                  seen=False, type='File Upload')
            notificationCreatedDEPC.save()
            notificationCreatedEXCC.save()

@receiver(post_save, sender='dbint.ApplyingStudent') #bir de management
def create_todo_list(sender, instance, created=False, **kwargs):
    if created:
        todolist = ToDoList.objects.create()
        sender.check_list = todolist
        sender.save()
        firstListItem = ListItem.objects.create(list=todolist, text='Upload Learning Agreement', completed=False,
                                 deadline=2023-1-7, type='Learning Agreement')
        secondListItem = ListItem.objects.create(list=todolist, text='Upload Approval Form', completed=False,
                                 deadline=2023-1-12, type='Approval Form')
        firstListItem.save()
        secondListItem.save()

@receiver(post_save, sender='dbint.Management') #bir de management
def create_todo_list_for_management(sender, instance, created=False, **kwargs):
    if created:
        todolist = ToDoList.objects.create()
        sender.check_list = todolist
        sender.save()

@receiver(post_save, sender='dbint.DepartmentCoordinator') #bir de management
def create_todo_list_for_department_coordinator(sender, instance, created=False, **kwargs):
    if created:
        todolist = sender.check_list
        firstListItem = ListItem.objects.create(list=todolist, text='Approve Students', completed=False,
                                 deadline=2023-1-7, type='Approve Students')
        firstListItem.save()

@receiver(post_save, sender='dbint.Instructor') #bir de management
def create_todo_list_for_management_instructor(sender, instance, created=False, **kwargs):
    if created:
        todolist = sender.check_list
        firstListItem = ListItem.objects.create(list=todolist, text='Approve Courses', completed=False,
                                 deadline=2023-1-7, type='Approve Course')
        firstListItem.save()