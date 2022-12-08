from django.db import models
from django.utils import timezone

# if you change something, you should use makemigrations and migrate
# if you add a model, import it in __init__.py
# to see a model in admin interface, register it in admin.py

# delete options should be reviewed
# relations - nullable problem ?


class Chat(models.Model):
    sender = models.ForeignKey('MigrationApp.User', on_delete=models.CASCADE,
                               related_name='sender', default=None)
    receiver = models.ForeignKey('MigrationApp.User', on_delete=models.CASCADE,
                                 related_name='receiver', default=None)
    #TODO: Use user1 and user2 because sender and receiver is not constant on chat (Just change names).


class Message(models.Model):
    text = models.CharField(max_length=500, default='')
    send_date = models.DateTimeField(max_length=40, auto_now_add=True)
    chat = models.ForeignKey('MigrationApp.Chat', on_delete=models.CASCADE)
    #TODO: add sender and receiver because it is important to show who is who on chat.
    #TODO: Is 500 length okay for message context? If so, leave it.


class Notification(models.Model):
    text = models.CharField(max_length=100, default='', blank=True)
    user = models.ForeignKey('MigrationApp.User', on_delete=models.CASCADE)
    receive_date = models.DateTimeField(max_length=40, auto_now_add=True)
    seen = models.BooleanField(default=False)
    banner = models.ImageField(verbose_name='a small image about the notification', blank=True,
                               default=None, upload_to='noti_banners')
    # TODO: Is 100 length okay for notification context? If so, leave it.
    # TODO: If user is blank or user id = 0, the notification can be sended to all students or all users. (Something like that)
    # TODO: Maybe specify the notification (Message notification or todo list notification etc.) (area = models.IntegerField())
    #       For example the area of the notification is 0, it means the notification is a message notification.
    #       For example the area of the notification is 6, it means the notification is a todolist notification...


class Announcement(models.Model):
    date = models.DateTimeField(max_length=40, auto_now_add=True)
    context = models.CharField(max_length=30, default='', blank=True)
    text = models.TextField(max_length=1000, default='')
    announcer = models.ForeignKey('MigrationApp.Management', on_delete=models.CASCADE)


class Thread(models.Model):
    header = models.CharField(max_length=50, default='')
    question = models.TextField(max_length=1500, default='')
    department = models.CharField(max_length=10, default='')
    user = models.ForeignKey('MigrationApp.User', on_delete=models.CASCADE)
    reply_count = models.IntegerField(default=0, blank=True)
    solved = models.BooleanField(default=False)
    context = models.CharField(max_length=30, default='', blank=True)
    start_date = models.DateTimeField(max_length=40, auto_now_add=True)
    view_count = models.IntegerField(default=0)

    def __str__(self):
        return self.id.__str__() + " - Thread: " + self.header

    class Meta:
        ordering = ['start_date']


class Reply(models.Model):
    thread = models.ForeignKey('MigrationApp.Thread', related_name='replies', on_delete=models.CASCADE, default='')
    user = models.ForeignKey('MigrationApp.User', on_delete=models.CASCADE)
    text = models.TextField(max_length=500, default='')
    date = models.DateTimeField(max_length=40, auto_now_add=True)
    #TODO: Is 500 length okay for text? If so, leave it.

    def __str__(self):
        return self.id.__str__() + " - Reply: " + self.text[:10] + "..."

    class Meta:
        ordering = ['date']


# not finished
class ToDoList(models.Model):
    class Meta:
        verbose_name = 'TODO List'


# not finished
class University(models.Model):
    name = models.CharField(max_length=100, default='')
    deadline = models.DateTimeField(max_length=40, default=timezone.now)
    location = models.CharField(max_length=100, default='city, country')
    contact = models.EmailField(max_length=100, default='')
    rating = models.FloatField(default=0.0)
    reviewCount = models.IntegerField(default=0)
    #TODO: Check deadline line. This line cannot be added automatically.

    class Meta:
        verbose_name_plural = 'Universities'


# Department Specialized University ( NEW ) not finished
class UniversityDepartment(models.Model):
    university = models.OneToOneField('MigrationApp.University', blank=False, null=False,
                                      default=None,
                                      on_delete=models.CASCADE)
    taughtInEnglishInfo = models.CharField(max_length=150, blank=True)
    quota = models.IntegerField(default=0)


# University review ( NEW )
class Review(models.Model):
    university = models.ForeignKey('MigrationApp.University', on_delete=models.CASCADE, blank=False)
    reviewer = models.ForeignKey('MigrationApp.User', on_delete=models.CASCADE)
    text = models.TextField(max_length=500, default='')
    rating = models.FloatField(default=0)


# not finished
class Course(models.Model):
    name = models.CharField(max_length=100, default='')
    code = models.CharField(max_length=10, default='', blank=True)
    credits = models.FloatField(default=0)
